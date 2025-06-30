#!/bin/bash

echo "🚀 Starting deployment process..."

# Check if required files exist
if [ ! -f "backend/.env" ]; then
    echo "❌ Error: backend/.env file not found!"
    echo "Please create backend/.env with your OpenAI API key"
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Build frontend for production
echo "��️ Building frontend..."
cd frontend
npm run build
cd ..

# Copy frontend build to backend public folder
echo "📁 Copying frontend build to backend..."
rm -rf backend/public/*
cp -r frontend/build/* backend/public/

echo "✅ Deployment complete!"
echo ""
echo "🌐 To start the application:"
echo "   cd backend && npm start"
echo ""
echo "🔧 For development:"
echo "   Backend: cd backend && npm run dev"
echo "   Frontend: cd frontend && npm start"
