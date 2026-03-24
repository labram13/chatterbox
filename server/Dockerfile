FROM node:24

WORKDIR /server

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=3001
EXPOSE 3001

CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "src/app.ts"]