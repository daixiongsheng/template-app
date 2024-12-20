FROM node:20-alpine
WORKDIR /app

COPY . .

# 安装 pnpm
RUN corepack enable pnpm && pnpm i
RUN corepack enable pnpm && pnpm run build

EXPOSE 6700

CMD ["node", "dist/main.js"]

