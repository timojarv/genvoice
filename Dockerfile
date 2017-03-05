FROM mhart/alpine-node:6
MAINTAINER Timo Järventausta <timo.jaerv@gmail.com>
ENV IP=0.0.0.0 PORT=3000
EXPOSE 3000
WORKDIR /srv
RUN apk add --update freetype fontconfig curl
RUN curl -Ls "https://github.com/dustinblackman/phantomized/releases/download/2.1.1/dockerized-phantomjs.tar.gz" | tar xz -C /
COPY . ./
RUN npm install
CMD ["npm", "start"]
