"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface LoadingProps {
  size?: number
}

const Loading: React.FC<LoadingProps> = ({ size = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let rotation = 0

    const draw = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()

      // Center the drawing
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(rotation)

      // Draw neural network loading animation
      ctx.beginPath()
      ctx.strokeStyle = "#4a90e2"
      ctx.lineWidth = 4
      ctx.arc(0, 0, size / 3, 0, Math.PI * 2)
      ctx.stroke()

      // Update rotation
      rotation += 0.05
      ctx.restore()

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [size])

  return <canvas ref={canvasRef} width={size} height={size} className="loading-canvas" />
}

export default Loading

