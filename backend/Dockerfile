# Build stage
FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# Migration stage
FROM build AS migration
RUN npm run build:migration
ENTRYPOINT ["npm"]
CMD ["run", "migration:run", "--ignore-scripts"]

# Production stage
FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/main"]
