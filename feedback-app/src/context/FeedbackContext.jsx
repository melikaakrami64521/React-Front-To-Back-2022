import { v4 as uuidv4 } from 'uuid'
import { createContext, useState } from 'react'
import FeedbackData from '../data/FeedbackData'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData)
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })
  
  // Add feedback
  const addFeedback = newFeedback => {
    newFeedback.id = uuidv4()
    // newFeedback.id = uuidv4().replaceAll('-', '').toString(16)
    setFeedback([newFeedback, ...feedback])
  }

  // Delete feedback
  const deleteFeedback = id => {
    // if (!window.confirm('Are you sure?')) return
    setFeedback(prev => {
      return prev.filter(i => i.id !== id)
    })
  }

  // Update feedback
  const updateFeedback = (id, newItem) => {
    setFeedback(feedback.map(i => i.id === id ? { ...i, ...newItem } : i))
    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }

  // Edit feedback
  const editFeedback = item => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider 
      value={{
        feedback,
        feedbackEdit,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
      }}
    >{ children }</FeedbackContext.Provider>
  )
}

export default FeedbackContext