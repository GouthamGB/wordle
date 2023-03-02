import React from 'react'


type WordProps = {

  word: string
}
function Again({word}:WordProps) {
  return (
    <div>
    <div className='msg-container-try'>
        <span>
        <div className="box black">T</div>
        <div className="box yellow">R</div>
        <div className="box green">Y</div>
        </span>
        <span>
        <div className="box black">A</div>
        <div className="box yellow">G</div>
        <div className="box green">A</div>
        <div className="box black">I</div>
        <div className="box black">N</div>
        </span>
    </div>
      <h2>Solution: {word.toUpperCase()}</h2>
    </div>
  )
}

export default Again