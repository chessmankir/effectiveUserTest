# Регистрация пользователей 

Тестовое задание, выполненное для демонстрации backend-разработки на Node.js.

## Документация API

Swagger-документация доступна по ссылке:

http://155.212.216.200:4010/api/docs/

## Запуск проекта

### Через npm

```bash
npm install
npm run dev
```

### Через docker

```bash
docker compose up --build
```

## Настройка .env

Создайте файл `.env` в корне проекта.

Пример:

```env
PORT=4010
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_ACCESS_SECRET=your_access_secret
```

### Технологии
Node.js
Express
Docker
Swagger
Prisma

