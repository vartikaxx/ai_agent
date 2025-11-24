import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface StartInterviewRequest {
  role: string
  roleDescription: string
}

export interface SendMessageRequest {
  message: string
  conversationHistory: Array<{ role: string; content: string }>
  role: string
}

export interface InterviewResponse {
  message: string
  isComplete?: boolean
}

export const interviewAPI = {
  startInterview: async (data: StartInterviewRequest): Promise<InterviewResponse> => {
    const response = await api.post('/interview/start', data)
    return response.data
  },

  sendMessage: async (data: SendMessageRequest): Promise<InterviewResponse> => {
    const response = await api.post('/interview/message', data)
    return response.data
  },

  getFeedback: async (conversationHistory: Array<{ role: string; content: string }>, role: string): Promise<any> => {
    const response = await api.post('/interview/feedback', {
      conversationHistory,
      role,
    })
    return response.data
  },
}

export default api

