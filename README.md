## Docker

Imagen disponible en Docker Hub:

➡️ [https://hub.docker.com/r/andreamarzetti/adoptme](https://hub.docker.com/r/andreamarzetti/adoptme)


```bash
# Instalar dependencias
npm install

# Correr los tests
npm test

# Descargar la imagen desde Docker Hub
docker pull andreamarzetti/adoptme:1.0

# Ejecutar el contenedor en el puerto 8080
docker run -p 8080:8080 andreamarzetti/adoptme:1.0

# Construir la imagen local con tag adoptme:dev
docker build -t adoptme:dev .

# Ejecutar el contenedor local
docker run -p 8080:8080 adoptme:dev

# La API estará disponible en: 
http://localhost:8080

#Documentación Swagger:
http://localhost:8080/api-docs

