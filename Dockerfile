FROM node:6
MAINTAINER Timo Järventausta <timo.jaerv@gmail.com>
ENV IP=0.0.0.0 PORT=3000
EXPOSE 3000
WORKDIR /srv
COPY . ./
CMD ["node", "index"]