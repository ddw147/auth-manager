FROM node:22-alpine
USER root

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm i
COPY . .

EXPOSE 3000
USER node
ENTRYPOINT ["npm","start"]