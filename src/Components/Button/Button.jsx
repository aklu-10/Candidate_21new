import React from 'react'

const Button = ({btnClass, onClick, children, isBtnDisabled, btnType="button"}) => {


  return (

    <>
    {
        (isBtnDisabled === false)

        ?

        <button className={btnClass} type={btnType} disabled >
          {children}
        </button>
    
        :

        <button className={btnClass} type={btnType} onClick={onClick} >
          {children}
        </button>

    }
    </>

  )
}

export default Button