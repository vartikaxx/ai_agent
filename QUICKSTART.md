# Quick Start Guide

### Prerequisites
- Python 3.8+ installed
- Node.js 18+ installed
- OpenAI API Key ([Get one here](https://platform.openai.com/api-keys))

### Step 1: Clone and Setup
```bash
cd "AI Agent"
./setup.sh
```

Or manually:
```bash
# Backend setup
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend setup
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
```

### Step 2: Configure API Key
Edit `.env` file:
```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### Step 3: Run the Application

**Terminal 1 - Backend:**
```bash
source venv/bin/activate  # If not already activated
python app.py
```
Backend runs on: http://localhost:8000

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend runs on: http://localhost:3000

### Step 4: Open Browser
Navigate to: http://localhost:3000

## 🎯 Usage

1. **Select a Role**: Choose from Software Engineer, Sales, Retail Associate, etc.
2. **Start Interview**: Click "Start Interview" button
3. **Answer Questions**: Respond to the AI interviewer's questions naturally
4. **Complete Interview**: Answer 5-7 questions, or click "End Interview"
5. **View Feedback**: Get comprehensive feedback on your performance

## 🐛 Troubleshooting

### Backend won't start
- Check if port 8000 is available
- Verify Python virtual environment is activated
- Ensure all dependencies are installed: `pip install -r requirements.txt`

### Frontend won't start
- Check if port 3000 is available
- Verify Node.js version: `node --version` (should be 18+)
- Reinstall dependencies: `rm -rf node_modules && npm install`

### API Errors
- Verify OPENAI_API_KEY is set correctly in `.env`
- Check API key has sufficient credits
- Ensure backend is running before starting frontend

### CORS Errors
- Make sure backend is running on port 8000
- Check that Flask-CORS is installed: `pip install Flask-CORS`

## 📝 Notes

- The interview typically lasts 5-7 questions
- You can end the interview early by clicking "End Interview"
- Feedback is generated automatically after interview completion
- All conversation history is used for feedback generation

