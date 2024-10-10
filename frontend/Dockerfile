# Dockerfile for React frontend
# Taken from Docker Primer
FROM node:14

WORKDIR /app/frontend
RUN mkdir frontend
COPY ./frontend/package*.json ./frontend
RUN npm install --prefix ./frontend
COPY . .

EXPOSE 3000
CMD ["npm", "start", "--prefix", "./frontend"]