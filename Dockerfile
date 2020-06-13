FROM nginx:stable-alpine
WORKDIR /app
COPY . .
COPY /dist /usr/share/nginx/html
COPY /f.html /usr/share/nginx/html
COPY /vue.conf /etc/nginx/conf.d
EXPOSE 8080

