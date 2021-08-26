import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <div style={{ height: "10px" }}>
      <CFooter fixed={false}>
        <div>
        <span className="ml-1"><i>The Future of Organizing </i></span><a href="/"><strong>MUNWell</strong></a>
        </div>
      </CFooter>
    </div>
  )
}

export default React.memo(TheFooter)
