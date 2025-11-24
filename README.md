# AI Interview Practice Partner

An interactive AI-powered chatbot application that helps users prepare for job interviews through natural conversation. Practice mock interviews for various roles, receive real-time feedback, and improve your interview skills.

## 🎯 Features

- **Multiple Role Support**: Practice interviews for Software Engineer, Sales, Retail Associate, Product Manager, Data Scientist, and Marketing roles
- **Natural Conversation**: AI interviewer asks follow-up questions like a real interviewer
- **Comprehensive Feedback**: Receive detailed feedback on communication, technical knowledge, strengths, and areas for improvement
- **Interactive UI**: Beautiful, warm color palette with responsive design
- **Real-time Chat**: Smooth chat interface with typing indicators
- **Optimized Performance**: Efficient React components with proper state management

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS3** with custom warm color palette
- **Axios** for API communication

### Backend
- **Python 3.8+**
- **Flask** for REST API
- **OpenAI GPT-4.1-mini** for AI-powered interview questions and feedback
- **Flask-CORS** for cross-origin requests

## 📁 Project Structure 

```
AI Agent/
├── src/
│   ├── components/
│   │   ├── ChatInput/          # Reusable chat input component
│   │   ├── ChatMessage/        # Message display component
│   │   ├── FeedbackView/       # Post-interview feedback display
│   │   ├── InterviewChat/      # Main interview chat interface
│   │   ├── RoleSelection/      # Role selection screen
│   │   └── UI/                 # Reusable UI components (Button, Card)
│   ├── contexts/
│   │   └── InterviewContext.tsx # Global state management
│   ├── services/
│   │   └── api.ts              # API service layer
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── App.tsx                 # Main application component
│   ├── App.css                 # App-specific styles
│   ├── index.css               # Global styles and color variables
│   └── main.tsx                # Application entry point
├── app.py                      # Flask backend server
├── requirements.txt            # Python dependencies
├── package.json                # Node.js dependencies
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts             # Vite configuration
├── .env.example                # Environment variables template
└── README.md                   # This file
```
## 🚀 Getting Started

### Prerequisites

Before starting, ensure you have:
- **Node.js** 14+ and npm (check with: `node --version` and `npm --version`)
- **Python** 3.8+ (check with: `python3 --version` or `python --version`)
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))
- **Git** (to clone the repository)

### Step-by-Step Installation & Setup

Follow these commands **one by one** in your terminal:

#### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
```

**Replace `your-username` and `your-repo-name` with your actual GitHub username and repository name.**

#### Step 2: Navigate to Project Directory
```bash
cd "AI Agent"
```

#### Step 3: Set Up Python Backend

**For macOS/Linux:**
```bash
python3 -m venv venv
```

```bash
source venv/bin/activate
```

```bash
pip install -r requirements.txt
```

**For Windows:**
```bash
python -m venv venv
```

```bash
venv\Scripts\activate
```

```bash
pip install -r requirements.txt
```

#### Step 4: Set Up Node.js Frontend
```bash
npm install
```

#### Step 5: Configure Environment Variables
```bash
cp .env.example .env
```

**Edit the `.env` file** and add your OpenAI API key:
```bash
# On macOS/Linux, use:
nano .env

# On Windows, use:
notepad .env
```

Inside the `.env` file, replace `your_openai_api_key_here` with your actual API key:
```
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=8000
VITE_API_URL=http://localhost:8000/api
```

Save and close the file (Ctrl+X then Y then Enter for nano, or Ctrl+S then close for notepad).

### Running the Application

You need **TWO terminal windows** - one for the backend and one for the frontend.

#### Terminal 1: Start the Backend Server

**For macOS/Linux:**
```bash
cd "AI Agent"
```

```bash
source venv/bin/activate
```

```bash
python app.py
```

**For Windows:**
```bash
cd "AI Agent"
```

```bash
venv\Scripts\activate
```

```bash
python app.py
```

You should see:
```
* Running on http://127.0.0.1:8000
* Running on http://localhost:8000
```

**Keep this terminal open!** The backend is now running on `http://localhost:8000`

#### Terminal 2: Start the Frontend Server

Open a **NEW terminal window** and run:

```bash
cd "AI Agent"
```

```bash
npm run dev
```

You should see:
```
VITE v4.5.14  ready in X ms
➜  Local:   http://localhost:3002/
```

**Keep this terminal open too!** The frontend is now running on `http://localhost:3002`

#### Step 6: Open the Application

Open your web browser and navigate to:
```
http://localhost:3002
```

You should see the **AI Interview Practice Partner** interface!

### Quick Command Reference

**Backend (Terminal 1):**
```bash
cd "AI Agent"
source venv/bin/activate    # macOS/Linux
# OR
venv\Scripts\activate       # Windows
python app.py
```

**Frontend (Terminal 2):**
```bash
cd "AI Agent"
npm run dev
```

### Troubleshooting

**If backend won't start:**
- Make sure Python virtual environment is activated (you should see `(venv)` in your terminal prompt)
- Check if port 8000 is available: `lsof -ti:8000` (macOS/Linux) or `netstat -ano | findstr :8000` (Windows)
- Verify `.env` file exists and has `OPENAI_API_KEY` set

**If frontend won't start:**
- Check if port 3002 is available
- Verify Node.js version: `node --version` (should be 14+)
- Try deleting `node_modules` and reinstalling: `rm -rf node_modules && npm install`

**If you see API errors:**
- Verify your OpenAI API key is correct in `.env` file
- Check that backend is running before starting frontend
- Ensure backend is accessible at `http://localhost:8000/api/health`

## 🧪 Testing Scenarios

The application is designed to handle various user personas:

1. **The Confused User**: Clear role selection and guidance
2. **The Efficient User**: Quick start, streamlined flow
3. **The Chatty User**: AI handles off-topic responses gracefully
4. **Edge Cases**: Invalid inputs, network errors, API failures


