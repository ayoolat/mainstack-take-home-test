FROM node:21

WORKDIR /usr/src/app

COPY package*.json .
COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm && \
    pnpm install

COPY tsconfig.json .
COPY . .
RUN npm run build

COPY dist/. ./dist/

EXPOSE 8082

CMD ["node", "dist/index.js"]
