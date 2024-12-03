import { defineEventHandler, readBody } from 'h3';
import { db } from '../util/db.ts';
import { validateOrderBody } from '@bpm2025-website/shared/validation/data';
import { logger } from '../util/logger.ts';
import { processors, router } from '../app.ts';
import { generateOrderId, getBaseMerchantParameters, getTPVOperationData } from '../redsys.ts';
import type { TPVOperation } from '@bpm2025-website/shared';
import { generateOrderInvoice } from '../util/invoicing';

/**
 * Gets a form data object from the event body for creating an
 * order
 */
router.post(
  '/order',
  defineEventHandler(async (event): Promise<Response | TPVOperation> => {
    const body = await readBody(event);

    if (validateOrderBody(body)) {
      body.email = body.email.toLowerCase();

      const [user, product] = await db.$transaction([
        db.user.findUnique({
          where: {
            email: body.email
          }, select: {
            id: true,
            name: true
          }
        }),
        db.product.findUnique({
          where: {
            id: body.product_id
          },
          select: {
            id: true
          }
        })
      ]);

      if (!user || !product) {
        return new Response(null, { status: 404 });
      }

      const order_paid = await db.order.findFirst({
        where: {
          user_id: user.id,
          paid: true,
          product_id: body.product_id
        },
        select: {
          id: true
        }
      });

      if (order_paid) {
        return new Response(null, { status: 409 });
      }

      const transaction_promises = [];
      const order_id = generateOrderId();

      transaction_promises.push(db.order.create({
        data: {
          id: order_id,
          user_id: user.id,
          product_id: body.product_id,
          notes: body.notes
        }
      }));

      /**
       * Applies discount processors to the order
       */
      for (const [discount_id, func] of processors) {
        if (await func(body)) {
          transaction_promises.push(
            db.discount_order.create({
              data: {
                order_id: order_id,
                discount_id
              }
            })
          );
        }
      }

      await db.$transaction(transaction_promises);
      logger.info(`Order created: ${order_id}`);

      const final_order = await db.full_order_details.findUniqueOrThrow({
        where: { order_ID: order_id },
        select: {
          price_paid_with_discounts: true,
          applied_discounts: true,
          product_name: true
        }
      });
      const merchant_params = getBaseMerchantParameters({
        amount: final_order.price_paid_with_discounts,
        name: user.name,
        productName: `${final_order.product_name} (${final_order.applied_discounts})`,
        orderId: order_id
      });

      // TODO: Move this to payment route handler
      const full_order = await db.order.findUniqueOrThrow({
        where: {
          id: order_id
        },
        include: {
          user: true,
          product: true,
          discount_order: {
            include: {
              discount: true
            }
          }
        }
      });

      await generateOrderInvoice({ order: full_order, vat_rate: 0.21 });

      return {
        ...getTPVOperationData(merchant_params),
        price: final_order.price_paid_with_discounts
      };
    } else {
      return new Response(null, { status: 400 });
    }
  })
);
