# ---------------- Frontend Stage ----------------
FROM node:18 AS frontend

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# ---------------- Backend Stage ----------------
FROM python:3.11-slim

WORKDIR /app/backend
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy backend dependencies
COPY backend/requirements.txt ./
RUN pip install --use-deprecated=legacy-resolver -r requirements.txt

# Copy only backend code
COPY backend/ ./

# Copy built frontend from previous stage to static folder
COPY --from=frontend /app/frontend/dist /app/static/

# Collect Django static files
RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE 8000

# Run Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
