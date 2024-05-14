import React from 'react'
import './Spinner.css';


const Spinner = ({Color, Class}) => {
  return <div className={`${Color ? Color : "text-white"} ${Class ? Class : ""} loader`}></div>
}

export default Spinner
