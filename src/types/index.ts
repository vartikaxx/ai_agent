export interface InterviewRole {
  id: string
  title: string
  description: string
  icon: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface Feedback {
  overallScore: number
  strengths: string[]
  improvements: string[]
  communicationScore: number
  technicalScore: number
  detailedFeedback: string
}

export interface InterviewData {
  role: InterviewRole
  messages: Message[]
  feedback: Feedback
  duration: number
}

