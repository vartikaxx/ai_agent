export const INTERVIEW_ROLES = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Practice technical interviews for software engineering roles. Covers algorithms, system design, and coding challenges.',
    icon: '💻',
  },
  {
    id: 'sales',
    title: 'Sales Representative',
    description: 'Prepare for sales interviews with questions about customer relationships, negotiation, and closing deals.',
    icon: '📊',
  },
  {
    id: 'retail-associate',
    title: 'Retail Associate',
    description: 'Practice common retail interview questions about customer service, product knowledge, and teamwork.',
    icon: '🛍️',
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Mock interviews covering product strategy, user research, prioritization, and cross-functional collaboration.',
    icon: '📱',
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Technical interviews focusing on statistics, machine learning, data analysis, and problem-solving.',
    icon: '📈',
  },
  {
    id: 'marketing',
    title: 'Marketing Specialist',
    description: 'Practice marketing interviews covering campaigns, analytics, brand management, and digital marketing strategies.',
    icon: '📢',
  },
] as const

export const API_ENDPOINTS = {
  START_INTERVIEW: '/api/interview/start',
  SEND_MESSAGE: '/api/interview/message',
  GET_FEEDBACK: '/api/interview/feedback',
  HEALTH: '/api/health',
} as const

export const INTERVIEW_CONFIG = {
  MIN_QUESTIONS: 5,
  MAX_QUESTIONS: 7,
  TYPING_DELAY: 1000,
} as const

