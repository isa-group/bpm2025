# We use a multi-stage approach to keep our final image as small as possible
# without complicating a lot the build process on the trimming phases.
FROM node:lts AS build

WORKDIR /tmp/install
COPY . .
RUN git clean -fxd

WORKDIR /tmp/install/packages/backend
RUN npm ci --prefix . --no-audit --omit=dev --no-shamefully-hoist

FROM node:lts-slim

WORKDIR /app
COPY --from=build /tmp/install/packages/backend .
RUN rm -rf *.config* tsconfig.json seeds sample.env Dockerfile $(find . -type f -name "*.md" -name ".*")

EXPOSE 3000
ENTRYPOINT [ "npm", "run", "prod" ]
