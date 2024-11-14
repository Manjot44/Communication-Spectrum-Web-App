# Dockerfile for React frontend
# Taken from Docker Primer
FROM node:22

WORKDIR /frontend
COPY ./package*.json .
RUN npm ci
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
