# MarketHub Backend (Django + DRF)

This backend provides a minimal Django + DRF API for the MarketHub frontend.

Features implemented:
- Django 5 + Django REST Framework
- JWT auth via Simple JWT (`/api/auth/token/`, `/api/auth/refresh/`)
- Viewsets for `Product`, `CartItem`, and `Order`
- CORS headers support
- PostgreSQL-ready configuration
- Admin panel for managing products and orders
- OpenAPI/Swagger + Redoc via drf-spectacular (`/api/schema/`, `/api/docs/`, `/api/redoc/`)

## Quick start (local)

1) Create a Python virtualenv and install dependencies:
```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

2) Configure environment variables (create `.env` based on the values in `settings.py` or docker-compose):
```
DJANGO_SECRET_KEY=change-me
DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
POSTGRES_DB=markethub_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

3) Run migrations and create a superuser:
```bash
python manage.py migrate
python manage.py createsuperuser
```

4) Start the dev server:
```bash
python manage.py runserver
```

5) Access:
- API: `http://localhost:8000/api/`
- Swagger UI: `http://localhost:8000/api/docs/`
- Redoc: `http://localhost:8000/api/redoc/`
- Admin: `http://localhost:8000/admin/`

## Docker (optional)

From the repo root:
```bash
docker-compose up --build
```
This starts Postgres and the Django API on `http://localhost:8000`.

## Frontend integration

- Set the frontend API base URL to `http://localhost:8000/api/` (or the deployed backend URL).
- The JWT token endpoints are:
  - `POST /api/auth/token/` (body: `username`, `password`) → returns `access` and `refresh` tokens
  - `POST /api/auth/refresh/` (body: `refresh`) → returns new `access` token

Example axios config on the frontend:

```js
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/',
  withCredentials: false,
});

export default api;
```

## Troubleshooting Postgres (common issues)

- "password authentication failed for user \"postgres\"": your local Postgres server's `postgres` user password does not match `POSTGRES_PASSWORD` in your environment. Fix by either:
  - Updating `.env` to match your Postgres user's password, or
  - Creating a new DB user/database matching the values in `.env` (example below).

Example SQL to create a DB and user (run in `psql` or pgAdmin):

```sql
CREATE DATABASE markethub_db;
CREATE USER markethub_user WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE markethub_db TO markethub_user;
```

Then update `.env`:

```
POSTGRES_DB=markethub_db
POSTGRES_USER=markethub_user
POSTGRES_PASSWORD=yourpassword
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

Ensure your `.env` values match your local Postgres instance. After updating `.env`, run:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```


## Next steps (suggested)
- Add payment integration for `Order.pay`
- Add background tasks for inventory/notifications (Celery)
- Seed command to populate products for testing
- Harden CORS/ALLOWED_HOSTS for production
