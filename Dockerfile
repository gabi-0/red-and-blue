FROM node:iron-bookworm

WORKDIR /react-randb/
COPY public/ /react-randb/public
COPY src/ /react-randb/src
COPY package.json /react-randb/

RUN npm install
CMD ["npm", "start"]