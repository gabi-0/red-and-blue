FROM node:iron-bookworm

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

ENV PYTHONPATH=${PYTHONPATH}:${PWD}

# host 0.0.0.0 to try to make it start in GCP
ENV HOST 0.0.0.0
ENV PORT 8080


RUN npm install -g serve
# RUN npm run build
RUN npm i react-scripts


CMD ["serve", "-s", "-l", "8080", "./build"]