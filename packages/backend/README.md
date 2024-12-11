This Node.js microservice handles the registration forms
for the BPM 2025 conference. The data model and the behaviour was tailored
for this purpose, however, great detail has been put in abstracting as much as possible
the particularities of our use case so this project can easily
be refactored for other purposes.

This documentation covers most information about the implementation and configuration,
**but not about setting up a development environment or running the Docker image**,
since the scope of this guide is to briefly keep this documented for future reference
and by no means it's intended to be a "thorough tutorial", some knowledge is assumed beforehand.

Make sure to check the readmes from `src/routes` and `src/processors` folders as well:
the modules are imported automatically at runtime, so you can overwrite/extend
the behaviour really easily without much effort!

## Flow in the BPM2025 website

* The user submits the form through the website. An user (through the `/user`) and an order is
(through `/order` is created at the same time).
* For the `/order` endpoint, this backend returns the signed parameters of
the Redsys TPV, so they're applied at the registration page.
* The user is redirected to [pay through Redsys](https://pagosonline.redsys.es/conexion-redireccion.html)
* Redsys sents us a POST to `/payment` (also a `GET` request might be handled in case the user clicks `Continue`). Then:
    - We update the `paid` status in the database.
    - We generate the invoice in PDF (in a worker thread).
    - We sent that PDF to the user's email (in a worker thread).

The emailing and invoicing are optional and you can skip them if your implementation
doesn't need those.

## Folder structure (relative to this README)

* `data`: (created at runtime). This folder has the database and invoices. Needs to be mounted
to your host when running through Docker.

* `prisma`: Contains the data model. Some key details:
    - Orders are session based: if an order doesn't go through (e.g payment error) but the
    user attempts to "place an order" in the same product again, a new order must be created. This is
    because we want to keep a track of failed attempts as well.
    - If a POST to `user` is made, the user data is updated, no errors are thrown about the user already existing.
    - Orders can have just one product, but they can have multiple discounts
    - A view `full_order_details` is provided in a format that have most relevants details
    intended to be queried by humans when reviewing orders. It's also used
    to determine the final price that the user has to pay to keep consistency in a single point
    (and better performance, since SQLite runs at a lower level than JS/TS).
    - The `updatedAt` and `createdAt` columns are updated by SQLite triggers to ensure consistency.

* `seeds`: This folder **MUST** contain only 2 files:
    - `items.json`: The application walks through every product and discount defined here on application start
    to seed the database. Removing a product/discount doesn't remove them from database, only new additions will be picked up.
    This is done to prevent issues when removing something by mistake, forcing you to go to the database to perform the
    deletion queries manually (be aware that all the data is cascade referenced, so removing a product and a discount will
    delete all associated rows!)
    - An `image` file that's going to be used in the headers of the generated invoices.

* `src`: The source code. The codebase is extensively commented and there are some other README files worth your interest
in some of the subfolders.

* `sample.env`: All the application configuration is done through environment variables.
This file must be renamed to `.env` in order to be picked up by the application or 
[be specified in your `docker-compose` file](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/#use-the-env_file-attribute).
Explanation for their meaning is done in that file as well.

* `Dockerfile`: To build the image, the Docker context must be set at the root of this repository given the
monorepo nature of our structure. An shortcut for copy/paste:

    ```bash
    docker build ../.. -f Dockerfile -t your/tag
    ```
    Alternatively, with the shell located at the root of this repository:
    ```bash
    docker build . -t your/tag -f packages/backend/Dockerfile
    ```

The rest of the files are for `npm`, `eslint`, `TypeScript` or other utilities and are not relevant
for the context of this application.

## Implementation details

This microservice uses Prisma as an ORM (with an SQLite backend) and h3 as an small wrapper
over node's native APIs. Is extremely efficient and has been running without issues in an
`e2-micro` instance in Google Cloud, handling all our requirements.

