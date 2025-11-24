import { memo } from 'react'
import { Message } from '../../contexts/InterviewContext'
import './ChatMessage.css'

interface ChatMessageProps {
  message: Message
}

const ChatMessage = memo(({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user'

  return (
    <div className={`chat-message ${isUser ? 'user' : 'assistant'}`}>
      <div className="chat-message-content">
        <div className="chat-message-header">
          <span className="chat-message-role">
            {isUser ? 'You' : 'Interviewer'}
          </span>
          <span className="chat-message-time">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="chat-message-text">{message.content}</div>
      </div>
    </div>
  )
})

ChatMessage.displayName = 'ChatMessage'

export default ChatMessage

