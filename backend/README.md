# MarketHub Backend (Django + DRF)

This backend provides a minimal Django + DRF API for the MarketHub frontend.

Features implemented in this scaffold:
- Django 4.2+
- Django REST Framework viewsets for `Product`, `CartItem`, and `Order`
- Simple JWT authentication endpoints
- CORS headers support
- PostgreSQL-ready configuration
- Admin panel for managing products and orders

## Quick start (local, without Docker)

1. Create a Python virtualenv and install dependencies:

```bash
python -m venv .venv
.venv\Scripts\activate  
source venv/Scripts/activate
 # Windows
# or
source .venv/bin/activate # macOS / Linux

pip install -r requirements.txt
```

2. Configure environment variables (copy `.env.example` to `.env` and edit if needed).

3. Run migrations and create a superuser:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

4. Start the development server:

```bash

```

5. Access the API at `http://localhost:8000/api/` and admin at `http://localhost:8000/admin/`.

> Note: Docker/Docker Compose instructions have been removed from this repository per project preferences.
> Use the local development instructions above to run the backend. If you later want a Docker setup I can re-add a multi-service compose file.

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

- Add fuller permissions (admin-only product writes)
- Add real payment integration for `Order.pay`
- Add background tasks for inventory updates (Celery)
- Add API docs (drf-yasg / drf-spectacular)

***

If you want, I can:
- Create express scripts or GitHub Actions for CI/CD
- Add `drf-spectacular` for OpenAPI/Swagger
- Add seed management command to populate products for frontend testing
