#!/bin/bash

set -e

echo "Starting chatbot setup and run script..."

echo "Setting up Django backend..."

cd backend || exit

if [ ! -d "venv" ]; then
  echo "Creating virtual environment..."
  python3 -m venv venv
fi

source venv/bin/activate

echo "Installing backend dependencies..."
pip install -r requirements.txt

echo "Running migrations..."
python manage.py migrate

if [ -f ".env" ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo "Starting Django backend..."
python manage.py runserver 0.0.0.0:8000 &
BACKEND_PID=$!

cd ..

echo "Setting up React frontend..."

cd frontend || exit

echo "Installing frontend dependencies..."
npm install

echo "Starting React frontend..."
npm start &
FRONTEND_PID=$!

cd ..


echo "Both servers are running!"
echo "Django: http://localhost:8000"
echo "React:  http://localhost:5173"
echo "Press Ctrl+C to stop both."

wait $BACKEND_PID $FRONTEND_PID
