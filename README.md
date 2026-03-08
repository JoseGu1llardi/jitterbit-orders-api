# Jitterbit Orders API

A RESTful API built with Node.js and Express to manage orders, developed as part of the Jitterbit technical challenge.

## Tech Stack

- **Node.js** + **Express** — HTTP server and routing
- **Prisma ORM** — database access and migrations
- **PostgreSQL** — relational database
- **Docker** — containerized database environment

## Architecture

The project follows a layered architecture:

```
src/
├── controllers/   → receives HTTP requests, returns responses
├── services/      → business logic and data mapping
├── repositories/  → database access via Prisma
└── routes/        → endpoint definitions
```

## Data Mapping

The API accepts requests with Portuguese field names and maps them to English before persisting:

| Input (PT)     | Database (EN) |
| -------------- | ------------- |
| numeroPedido   | orderId       |
| valorTotal     | value         |
| dataCriacao    | creationDate  |
| idItem         | productId     |
| quantidadeItem | quantity      |
| valorItem      | price         |

## Requirements

- Node.js v18+
- Docker and Docker Compose

## Setup

1. Clone the repository:

```bash
git clone https://github.com/JoseGu1llardi/jitterbit-orders-api.git
cd jitterbit-orders-api
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env
```

4. Start the database:

```bash
docker-compose up -d
```

5. Run database migrations:

```bash
npx prisma migrate dev
```

6. Start the server:

```bash
npm run dev
```

## Authentication

All `/order` endpoints require a valid JWT token.

**1. Get a token:**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}'
```

**2. Use the token in requests:**

```bash
curl http://localhost:3000/order/list \
  -H "Authorization: Bearer <your_token_here>"
```

| Endpoint    | Method | Auth Required |
| ----------- | ------ | ------------- |
| /auth/login | POST   | No            |
| /order      | POST   | Yes           |
| /order/:id  | GET    | Yes           |
| /order/list | GET    | Yes           |
| /order/:id  | PUT    | Yes           |
| /order/:id  | DELETE | Yes           |

## Endpoints

| Method | URL         | Description        |
| ------ | ----------- | ------------------ |
| POST   | /auth/login | Authenticate user  |
| POST   | /order      | Create a new order |
| GET    | /order/:id  | Get order by ID    |
| GET    | /order/list | List all orders    |
| PUT    | /order/:id  | Update an order    |
| DELETE | /order/:id  | Delete an order    |

## Example Request

**1. Login to get a token:**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}'
```

**2. Create an order using the token:**

```bash
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token_here>" \
  -d '{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
    "items": [
      {
        "idItem": "2434",
        "quantidadeItem": 1,
        "valorItem": 1000
      }
    ]
  }'
```

## API Documentation

Swagger UI available at: http://localhost:3000/api-docs
