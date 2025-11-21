FROM node:20

WORKDIR /app

RUN npm install -g @ionic/cli

COPY package*.json ./
RUN npm install || true

COPY . .

EXPOSE 8100

CMD ["ionic", "serve", "--host=0.0.0.0", "--port=8100"]
