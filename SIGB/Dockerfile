#Node.js
FROM node:18


WORKDIR /SIGB


COPY package*.json ./


RUN npm install


COPY . .

# Expor a porta da API
EXPOSE 5560


CMD ["node", "server.js"]
