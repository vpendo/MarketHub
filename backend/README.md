Absolutely! Here’s a **professional, polished README** for your MarketHub backend. It’s structured clearly, suitable for both developers and deployment environments, and emphasizes best practices:

---

# MarketHub Backend (Django + DRF)

**MarketHub** is a modern e-commerce backend built with Django 5 and Django REST Framework (DRF). It provides a robust API to manage products, carts, orders, and authentication, ready for local development and deployment.

---

## Features

* **Django 5 + DRF** for a modern backend API
* **JWT Authentication** with Simple JWT (`/api/auth/token/`, `/api/auth/refresh/`)
* **CRUD operations** for `Product`, `CartItem`, and `Order` via DRF ViewSets
* **CORS support** for frontend integration
* **PostgreSQL-ready** configuration
* **Admin panel** for managing products, orders, and users
* **API documentation** using drf-spectacular (`/api/docs/`, `/api/redoc/`)
* **Deployment-ready** with Render and static file support via WhiteNoise

---

## Table of Contents

1. [Quick Start (Local Development)](#quick-start-local-development)
2. [Environment Variables](#environment-variables)
3. [Database Setup](#database-setup)
4. [Run Migrations & Superuser](#run-migrations--superuser)
5. [Start Development Server](#start-development-server)
6. [Frontend Integration](#frontend-integration)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)
9. [Next Steps / Future Enhancements](#next-steps--future-enhancements)

---

## Quick Start (Local Development)

1. **Clone the repository**

```bash
git clone https://github.com/vpendo/MarketHub.git
cd MarketHub/backend
```

2. **Create and activate a Python virtual environment**

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Configure environment variables**
   Create a `.env` file in the backend folder:

```dotenv
DJANGO_SECRET_KEY=replace-with-a-strong-secret-key
DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
POSTGRES_DB=markethub_db_6k01
POSTGRES_USER=markethub_user
POSTGRES_PASSWORD=BLE5ZxeBGz5RCMuMQj5RFJM8g7CtchN6
POSTGRES_HOST=dpg-d51ir6vpm1nc73ai4fk0-a.oregon-postgres.render.com
POSTGRES_PORT=5432
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

---

## Database Setup

Ensure PostgreSQL is running and accessible. For local testing, you can create a database and user:

```sql
CREATE DATABASE markethub_db_6k01;
CREATE USER markethub_user WITH PASSWORD 'BLE5ZxeBGz5RCMuMQj5RFJM8g7CtchN6';
GRANT ALL PRIVILEGES ON DATABASE markethub_db_6k01 TO markethub_user;
```

> For production, use the Render Postgres credentials as shown above.

---

## Run Migrations & Superuser

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

---

## Start Development Server

```bash
python manage.py runserver
```

Access endpoints:

* API: `http://localhost:8000/api/`
* Swagger UI: `http://localhost:8000/api/docs/`
* Redoc: `http://localhost:8000/api/redoc/`
* Admin: `http://localhost:8000/admin/`

---

## Frontend Integration

Set the frontend API base URL:

```ts
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/',
  withCredentials: true,
});

export default api;
```

**JWT Endpoints:**

* `POST /api/auth/token/` → body: `username`, `password` → returns `access` & `refresh` tokens
* `POST /api/auth/refresh/` → body: `refresh` → returns new `access` token

---

## Deployment (Render)

1. Push repository to GitHub.
2. Create a **Render Web Service** for the backend.
3. Add environment variables in Render matching `.env`.
4. Use the **External Database URL** from Render Postgres:

```dotenv
POSTGRES_DB=markethub_db_6k01
POSTGRES_USER=markethub_user
POSTGRES_PASSWORD=BLE5ZxeBGz5RCMuMQj5RFJM8g7CtchN6
POSTGRES_HOST=dpg-d51ir6vpm1nc73ai4fk0-a.oregon-postgres.render.com
POSTGRES_PORT=5432
```

5. Deploy and run migrations via Render Console:

```bash
python manage.py migrate
python manage.py createsuperuser
```

---

## Troubleshooting

**Common Postgres Issues:**

* `password authentication failed for user "postgres"`: Ensure `.env` credentials match your DB.
* Check the host, port, database, and user match your Render or local Postgres instance.

---

## Next Steps / Future Enhancements

* Add **payment integration** for `Order.pay`
* Background tasks (inventory updates, notifications) with Celery
* Seed script for products and testing
* Harden **CORS** and `ALLOWED_HOSTS` for production
* Unit tests for API endpoints

---

## License

This project is licensed under MIT License.

---


