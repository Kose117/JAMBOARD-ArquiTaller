FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock .env ./
RUN bun install

COPY . .

EXPOSE 3000

# 4) Arrancamos el servidor
CMD ["bun", "run", "dev"]
