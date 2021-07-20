import React from 'react'
import { CSVLink } from "react-csv";

const Export = props => {
  const {
    data,
    filename
  } = props

  return (
    <div className="card-header-actions">
      <CSVLink
        data={data}
        filename={filename}
        target="_blank"
      >
        <small className="text-muted">export</small>
      </CSVLink>
    </div>
  )
}

export default React.memo(Export)