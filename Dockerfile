FROM node:18.15.0-slim AS builder
WORKDIR /app
COPY . .
RUN apt-get update
RUN apt install chromium -y
RUN yarn install

ENTRYPOINT [ "yarn run setup" ]
