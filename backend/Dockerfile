# Dockerfile for React frontend
# Taken from Docker Primer
FROM node:14

WORKDIR /usr/src/server
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5005
CMD ["npm", "start"]