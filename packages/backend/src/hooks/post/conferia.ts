import { isDev, logger } from '../../util/logger';
import type { OrderWithRelations } from '#/types';

interface Inputs {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  country: string;
}

interface authData {
  accessToken?: string;
  refreshToken?: string;
}

const CONFERIA_URL = process.env.CONFERIA_URL;
const CONFERIA_ADMIN_EMAIL = process.env.CONFERIA_ADMIN_EMAIL;
const CONFERIA_ADMIN_PASSWORD = process.env.CONFERIA_ADMIN_PASSWORD;

const isConferiaEnabled = !!CONFERIA_URL && !!CONFERIA_ADMIN_EMAIL && !!CONFERIA_ADMIN_PASSWORD;

if (!isConferiaEnabled) {
  (isDev ? logger.warn : logger.error)('Missing CONFERIA environment variables');
}

/**
 * Registers a user in the Conferia platform.
 */
async function registerUserWithConferia(data: Inputs) {
  if (!isConferiaEnabled) {
    throw new Error('Missing CONFERIA environment variables');
  }

  // First authenticate as admin
  const authResponse = await fetch(`${CONFERIA_URL}/api/v1/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: CONFERIA_ADMIN_EMAIL,
      password: CONFERIA_ADMIN_PASSWORD
    })
  });

  if (!authResponse.ok) {
    throw new Error(`Failed to authenticate with CONFERIA: ${authResponse.statusText}`);
  }

  const authData = await authResponse.json() as authData;
  const token = authData.accessToken;

  if (!token) {
    throw new Error('Failed to get authentication token from CONFERIA');
  }

  // Now register the user
  const registerResponse = await fetch(`${CONFERIA_URL}/api/v1/account/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      company: data.company,
      country: data.country
    })
  });

  if (!registerResponse.ok) {
    throw new Error(`Failed to register user with CONFERIA: ${registerResponse.statusText}`);
  }
}

export default async (full_order: OrderWithRelations) => {
  if (!isConferiaEnabled) {
    return;
  }

  try {
    const nameParts = full_order.user.name.split(' ');
    const firstName = nameParts[0] ?? '';
    const lastName = nameParts.slice(1).join(' ');
    const company = full_order.user.institution;
    const country = full_order.notes?.match(/COUNTRY: ([^\n]+)/)?.[1];

    await registerUserWithConferia({
      email: full_order.user.email,
      firstname: firstName,
      lastname: lastName,
      company: company ?? 'Unknown',
      country: country ?? 'Unknown'
    });
  } catch (error) {
    logger.error('Failed to register user with CONFERIA:', error);
  }
};
