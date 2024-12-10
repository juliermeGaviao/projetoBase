#Realiza o Build do frontend
FROM node:20 AS builder

RUN mkdir /build && chown node:node /build

WORKDIR /build

COPY ./frontend .

RUN rm -rf package-lock.json

RUN npm install && npm run build --prod

#Cria Imagem do frontend
FROM httpd:2.4-alpine

RUN chown -R www-data:www-data /usr/local/apache2
RUN chmod 777 -R /usr/local/apache2/logs

#Copia os fontes
COPY --from=builder ./build/dist ./build/devops/.htaccess ./htdocs/
COPY --from=builder ./build/devops/httpd.conf ./conf/httpd.conf
