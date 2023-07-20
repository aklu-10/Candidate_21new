import React from 'react'

const Button = ({btnClass, btnType="button", onClick, children, isBtnDisabled=false}) => {

  return (

    <button className={btnClass} type={btnType} disabled={isBtnDisabled} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button