# Imagen base oficial de Node
FROM node:18-alpine

# Definir directorio de trabajo en el contenedor
WORKDIR /app

# Copiar solo package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto de los archivos (excluyendo lo de .dockerignore)
COPY . .

# Definir variable de entorno para la conexión a MongoDB
ENV MONGODB_URI=mongodb://host.docker.internal:27017/adoptme

# Exponer puerto que usa la app
EXPOSE 8080

# Comando para arrancar la app
CMD ["npm", "start"]
