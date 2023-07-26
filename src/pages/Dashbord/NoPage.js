import React from 'react'
import { Link } from 'react-router-dom'

export default function NoPage() {
    return (
        <div className="not-found-container">
        <div className="content">
          <h1>404</h1>
          <p>Oops! The page you're looking for doesn't exist.</p>
          <Link to="/">Go back to the homepage</Link>
        </div>
      </div>
    )
}
