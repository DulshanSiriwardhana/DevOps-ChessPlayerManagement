FROM node:18-alpine

WORKDIR /app
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

WORKDIR /app
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install

WORKDIR /app
COPY package*.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","start"]
