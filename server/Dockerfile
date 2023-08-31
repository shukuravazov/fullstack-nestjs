FROM node:14-alpine AS builder
WORKDIR /app
COPY /*.json ./
# RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE '8000'
CMD ["npm", "run", "start:prod"]