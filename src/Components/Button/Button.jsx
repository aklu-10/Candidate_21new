import React from 'react'

const Button = ({btnClass, onClick, children, isBtnDisabled, btnType="button"}) => {


  return (

    <>
    {
        <button className={btnClass} type={btnType} onClick={onClick}>
          {children}
        </button>

    }
    </>

  )
}

export default Button