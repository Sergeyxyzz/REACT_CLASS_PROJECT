import React from 'react'
import './appinfo.css'

const AppInfo = ({increased, employees}) => {
  return (
    <div className="app-info">
      <h1>Учет сотрудников компании N</h1>
      <h2>Общее число сотрудников: {employees}</h2>
      <h2>Премию получат: {increased}</h2> 
    </div>
  )
}

export default AppInfo