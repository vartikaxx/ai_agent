import { useState, useEffect, useRef } from 'react'
import { useInterview } from '../../contexts/InterviewContext'
import { interviewAPI } from '../../services/api'
import ChatMessage from '../ChatMessage/ChatMessage'
import ChatInput from '../ChatInput/ChatInput'
import Button from '../UI/Button/Button'
import Card from '../UI/Card/Card'
import './InterviewChat.css'

interface InterviewChatProps {
  onComplete: (data: any) => void
}

const InterviewChat = ({ onComplete }: InterviewChatProps) => {
  const { selectedRole, messages, addMessage, setIsInterviewActive, clearMessages } = useInterview()
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [startTime] = useState(Date.now())
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedRole && messages.length === 0) {
      startInterview()
    }
  }, [selectedRole])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const startInterview = async () => {
    if (!selectedRole) return

    setIsLoading(true)
    setIsInterviewActive(true)

    try {
      const response = await interviewAPI.startInterview({
        role: selectedRole.id,
        roleDescription: selectedRole.description,
      })

      addMessage({
        role: 'assistant',
        content: response.message,
      })
    } catch (error) {
      console.error('Error starting interview:', error)
      addMessage({
        role: 'assistant',
        content: "I apologize, but I'm having trouble starting the interview. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!selectedRole || isLoading || isComplete) return

    addMessage({
      role: 'user',
      content,
    })

    setIsLoading(true)

    try {
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      const response = await interviewAPI.sendMessage({
        message: content,
        conversationHistory,
        role: selectedRole.id,
      })

      addMessage({
        role: 'assistant',
        content: response.message,
      })

      if (response.isComplete) {
        setIsComplete(true)
        handleCompleteInterview()
      }
    } catch (error) {
      console.error('Error sending message:', error)
      addMessage({
        role: 'assistant',
        content: "I apologize, but I'm having trouble processing your response. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCompleteInterview = async () => {
    if (!selectedRole) return

    try {
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      const feedback = await interviewAPI.getFeedback(conversationHistory, selectedRole.id)
      const duration = Math.floor((Date.now() - startTime) / 1000)

      onComplete({
        role: selectedRole,
        messages,
        feedback,
        duration,
      })
    } catch (error) {
      console.error('Error getting feedback:', error)
      onComplete({
        role: selectedRole,
        messages,
        feedback: {
          overallScore: 0,
          strengths: [],
          improvements: [],
          communicationScore: 0,
          technicalScore: 0,
          detailedFeedback: 'Unable to generate feedback at this time.',
        },
        duration: Math.floor((Date.now() - startTime) / 1000),
      })
    }
  }

  const handleEndInterview = () => {
    if (isComplete) {
      handleCompleteInterview()
    } else {
      setIsComplete(true)
      handleCompleteInterview()
    }
  }

  return (
    <div className="interview-chat">
      <Card className="interview-header">
        <div className="interview-header-content">
          <div>
            <h2>{selectedRole?.title} Interview</h2>
            <p className="interview-role-description">{selectedRole?.description}</p>
          </div>
          <Button onClick={handleEndInterview} variant="outline" size="small">
            End Interview
          </Button>
        </div>
      </Card>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.length === 0 && !isLoading && (
            <div className="chat-empty">
              <p>Starting your interview...</p>
            </div>
          )}
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="chat-loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput
          onSend={handleSendMessage}
          disabled={isLoading || isComplete}
          placeholder={isComplete ? 'Interview completed' : 'Type your answer...'}
        />
      </div>
    </div>
  )
}

export default InterviewChat

