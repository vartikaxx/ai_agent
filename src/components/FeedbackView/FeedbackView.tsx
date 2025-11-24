import { useInterview } from '../../contexts/InterviewContext'
import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'
import './FeedbackView.css'

interface FeedbackViewProps {
  interviewData: any
  onStartOver: () => void
}

const FeedbackView = ({ interviewData, onStartOver }: FeedbackViewProps) => {
  const { selectedRole } = useInterview()
  const { feedback, duration } = interviewData || {}

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'var(--primary-orange)'
    if (score >= 60) return 'var(--accent-amber)'
    return 'var(--warm-gray)'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Needs Improvement'
  }

  return (
    <div className="feedback-view">
      <Card className="feedback-header">
        <h2>Interview Feedback</h2>
        <p className="feedback-role">{selectedRole?.title}</p>
        <p className="feedback-duration">Duration: {formatDuration(duration || 0)}</p>
      </Card>

      <div className="feedback-scores">
        <Card className="score-card">
          <div className="score-circle" style={{ borderColor: getScoreColor(feedback?.overallScore || 0) }}>
            <div className="score-value" style={{ color: getScoreColor(feedback?.overallScore || 0) }}>
              {feedback?.overallScore || 0}%
            </div>
            <div className="score-label">Overall Score</div>
            <div className="score-status" style={{ color: getScoreColor(feedback?.overallScore || 0) }}>
              {getScoreLabel(feedback?.overallScore || 0)}
            </div>
          </div>
        </Card>

        <div className="detailed-scores">
          <Card className="detailed-score-card">
            <h3>Communication</h3>
            <div className="score-bar">
              <div
                className="score-bar-fill"
                style={{
                  width: `${feedback?.communicationScore || 0}%`,
                  background: `linear-gradient(90deg, var(--primary-orange), var(--primary-coral))`,
                }}
              />
            </div>
            <div className="score-bar-value">{feedback?.communicationScore || 0}%</div>
          </Card>

          <Card className="detailed-score-card">
            <h3>Technical Knowledge</h3>
            <div className="score-bar">
              <div
                className="score-bar-fill"
                style={{
                  width: `${feedback?.technicalScore || 0}%`,
                  background: `linear-gradient(90deg, var(--primary-orange), var(--primary-coral))`,
                }}
              />
            </div>
            <div className="score-bar-value">{feedback?.technicalScore || 0}%</div>
          </Card>
        </div>
      </div>

      <div className="feedback-sections">
        <Card className="feedback-section">
          <h3>✨ Strengths</h3>
          <ul className="feedback-list">
            {feedback?.strengths?.map((strength: string, index: number) => (
              <li key={index}>{strength}</li>
            )) || <li>No specific strengths identified.</li>}
          </ul>
        </Card>

        <Card className="feedback-section">
          <h3>📈 Areas for Improvement</h3>
          <ul className="feedback-list">
            {feedback?.improvements?.map((improvement: string, index: number) => (
              <li key={index}>{improvement}</li>
            )) || <li>No specific improvements identified.</li>}
          </ul>
        </Card>
      </div>

      {feedback?.detailedFeedback && (
        <Card className="feedback-section detailed-feedback">
          <h3>📝 Detailed Feedback</h3>
          <p className="detailed-feedback-text">{feedback.detailedFeedback}</p>
        </Card>
      )}

      <div className="feedback-actions">
        <Button onClick={onStartOver} variant="primary" size="large">
          Practice Another Interview
        </Button>
      </div>
    </div>
  )
}

export default FeedbackView

