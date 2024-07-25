import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Error() {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => navigate('/'), 2000)
  })
  return <div>Error, Navigating back home...</div>
}

export default Error
