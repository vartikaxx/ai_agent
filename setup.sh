#!/bin/bash

echo "🚀 Setting up AI Interview Practice Partner..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Setup Python backend
echo "📦 Setting up Python backend..."
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Setup Node.js frontend
echo "📦 Setting up Node.js frontend..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env and add your OPENAI_API_KEY"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env and add your OPENAI_API_KEY"
echo "2. Run 'source venv/bin/activate' to activate Python virtual environment"
echo "3. Run 'python app.py' to start the backend (in one terminal)"
echo "4. Run 'npm run dev' to start the frontend (in another terminal)"
echo "5. Open http://localhost:3000 in your browser"

