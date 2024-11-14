# Dockerfile for node backend
FROM node:21

WORKDIR /backend
COPY ./package*.json .
RUN npm ci
COPY . .

EXPOSE 5005
CMD ["npm", "start"]
