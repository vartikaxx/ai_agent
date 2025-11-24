import { useState } from 'react'
import { InterviewProvider } from './contexts/InterviewContext'
import RoleSelection from './components/RoleSelection/RoleSelection'
import InterviewChat from './components/InterviewChat/InterviewChat'
import FeedbackView from './components/FeedbackView/FeedbackView'
import './App.css'

export type InterviewPhase = 'selection' | 'interview' | 'feedback'

function App() {
  const [phase, setPhase] = useState<InterviewPhase>('selection')
  const [interviewData, setInterviewData] = useState<any>(null)

  const handleRoleSelected = () => {
    setPhase('interview')
  }

  const handleInterviewComplete = (data: any) => {
    setInterviewData(data)
    setPhase('feedback')
  }

  const handleStartOver = () => {
    setPhase('selection')
    setInterviewData(null)
  }

  return (
    <InterviewProvider>
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">AI Interview Practice Partner</h1>
          <p className="app-subtitle">Prepare for your dream job with AI-powered mock interviews</p>
        </header>

        <main className="app-main">
          {phase === 'selection' && (
            <RoleSelection onRoleSelected={handleRoleSelected} />
          )}
          {phase === 'interview' && (
            <InterviewChat onComplete={handleInterviewComplete} />
          )}
          {phase === 'feedback' && (
            <FeedbackView 
              interviewData={interviewData} 
              onStartOver={handleStartOver} 
            />
          )}
        </main>
      </div>
    </InterviewProvider>
  )
}

export default App

