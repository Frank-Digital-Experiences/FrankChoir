import { useEffect, useState } from 'react'

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({
    y: 0,
    direction: '',
  })

  const updatePosition = () => {
    setScrollPosition((prev) => {
      return {
        y: window.pageYOffset,
        direction: prev.y > window.pageYOffset ? 'up' : 'down',
      }
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', updatePosition)
    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  return scrollPosition
}
