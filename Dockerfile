FROM node:iron-bookworm

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

ENV PYTHONPATH=${PYTHONPATH}:${PWD}

ENV PORT 3000


RUN npm install -g serve
RUN npm run build


CMD ["serve", "-s", "-l", "3000", "./build"]