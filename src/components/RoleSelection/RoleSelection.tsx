import { useState } from 'react'
import { useInterview } from '../../contexts/InterviewContext'
import { INTERVIEW_ROLES } from '../../utils/constants'
import { interviewAPI } from '../../services/api'
import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'
import './RoleSelection.css'

interface RoleSelectionProps {
  onRoleSelected: () => void
}

const RoleSelection = ({ onRoleSelected }: RoleSelectionProps) => {
  const { setSelectedRole, addMessage, setIsInterviewActive } = useInterview()
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null)

  const handleRoleClick = (role: typeof INTERVIEW_ROLES[0]) => {
    setSelectedRoleId(role.id)
  }

  const handleStartInterview = async () => {
    if (!selectedRoleId) return

    const role = INTERVIEW_ROLES.find((r) => r.id === selectedRoleId)
    if (!role) return

    try {
      // Store locally
      setSelectedRole(role)

      // Call backend (FIXED)
      const response = await interviewAPI.startInterview({
        role: role.id,
        roleDescription: role.description,
      })

      // Save assistant's first message
      addMessage({
        role: 'assistant',
        content: response.message,
      })

      // Enable chat mode
      setIsInterviewActive(true)

      // Move to next screen
      onRoleSelected()

    } catch (err) {
      console.error("Start interview failed", err)
    }
  }

  return (
    <div className="role-selection">
      <div className="role-selection-header">
        <h2>Choose Your Interview Role</h2>
        <p>Select a role to practice your interview skills</p>
      </div>

      <div className="role-grid">
        {INTERVIEW_ROLES.map((role) => (
          <Card
            key={role.id}
            className={`role-card ${selectedRoleId === role.id ? 'selected' : ''}`}
            onClick={() => handleRoleClick(role)}
          >
            <div className="role-icon">{role.icon}</div>
            <h3 className="role-title">{role.title}</h3>
            <p className="role-description">{role.description}</p>
          </Card>
        ))}
      </div>

      <div className="role-selection-actions">
        <Button
          onClick={handleStartInterview}
          disabled={!selectedRoleId}
          variant="primary"
          size="large"
        >
          Start Interview
        </Button>
      </div>
    </div>
  )
}

export default RoleSelection
