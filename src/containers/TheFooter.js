import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">Manuel:</a>
        <span className="ml-1"><i>The Future of Organizing MUN Well</i></span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
