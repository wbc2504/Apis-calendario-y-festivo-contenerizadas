FROM node:20-alpine
WORKDIR /app

ENV PORT=3000
ENV MONGODB_URI=mongodb://mongo-db:27017/calendario_laboral
ENV JWT_SECRET=5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437
ENV JWT_EXPIRES_IN=30m

COPY package*.json ./
RUN npm ci --omit=dev

COPY src src
COPY mongodb mongodb
COPY scripts scripts

EXPOSE 3000

CMD ["npm", "start"]
