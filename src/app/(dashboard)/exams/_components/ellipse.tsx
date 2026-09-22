import React from 'react'

export default function Ellipse({correct}: { correct: boolean }) {
  return (
<svg width="20" height="20">
  {/* out Circle*/}
  <circle
    cx="10"
    cy="10"
    r="8"
    stroke={correct ? "green" : "red"}
    strokeWidth="1"
    fill="none"
  />
{!correct &&   <circle
    cx="10"
    cy="10"
    r="5"
    fill="red"
  />}

</svg>



  )
}
