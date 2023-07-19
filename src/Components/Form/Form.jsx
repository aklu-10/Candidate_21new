import React, { memo, useContext } from 'react'
import FormContext from '../../context/FormContext';

const Form = ({children, onFormSubmission}) => {

    return (
        <>

            <form onSubmit={onFormSubmission} className='w-[90vw]'>
            {
                children
            }
            </form>

        </>
    )
}

export default memo(Form)