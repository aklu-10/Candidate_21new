import React from 'react'

const Button = ({btnClass, btnType="button", isBtnDisabled=false, onClick, children}) => {

  return (
    <button className={btnClass} type={btnType} disabled={isBtnDisabled} onClick={onClick}>{children}</button>
  )
}

export default Button