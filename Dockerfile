# Etapa 1: build de dependencias
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --production

# Etapa 2: copiar código + ejecución
FROM node:18-alpine
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV MONGODB_URI=mongodb://host.docker.internal:27017/adoptme

LABEL maintainer="Andrea Marzetti" \
      description="API para gestión de adopciones de mascotas" \
      version="1.0"

EXPOSE 8080
CMD ["npm", "start"]
