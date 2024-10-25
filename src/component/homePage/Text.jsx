import React from 'react'
import '/src/page/style1.css'

const Text = (props) => {
  return (
    <span className='gradient1 inline-flex'>
       {props.children}
    </span>
  )
}

export default Text
