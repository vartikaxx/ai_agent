import { createContext, useContext, useState, ReactNode } from 'react'

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

export interface InterviewContextType {
  selectedRole: InterviewRole | null
  setSelectedRole: (role: InterviewRole | null) => void
  messages: Message[]
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  clearMessages: () => void
  isInterviewActive: boolean
  setIsInterviewActive: (active: boolean) => void
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined)

export const useInterview = () => {
  const context = useContext(InterviewContext)
  if (!context) {
    throw new Error('useInterview must be used within InterviewProvider')
  }
  return context
}

interface InterviewProviderProps {
  children: ReactNode
}

export const InterviewProvider = ({ children }: InterviewProviderProps) => {
  const [selectedRole, setSelectedRole] = useState<InterviewRole | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isInterviewActive, setIsInterviewActive] = useState(false)

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const clearMessages = () => {
    setMessages([])
  }

  return (
    <InterviewContext.Provider
      value={{
        selectedRole,
        setSelectedRole,
        messages,
        addMessage,
        clearMessages,
        isInterviewActive,
        setIsInterviewActive,
      }}
    >
      {children}
    </InterviewContext.Provider>
  )
}

