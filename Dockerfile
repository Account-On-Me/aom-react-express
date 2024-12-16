FROM node:22-alpine AS base

FROM base AS client_build
WORKDIR /app
COPY ./client/ /app/
COPY ./.env /app/
RUN npm ci && npm run build

FROM base AS server_build
# copy all to /app/ except client
WORKDIR /app
COPY *.js /app/
COPY package*.json /app/
COPY ./controllers/ /app/controllers/
COPY ./models/ /app/models/
COPY ./utils/ /app/utils/

# copy client build to /app/dist
COPY --from=client_build /app/dist /app/dist

RUN npm ci --omit=dev

CMD ["node", "server.js"]


