import React from 'react'
import './Label.css';

const Label = ({labelName, labelFor}) => {


    return (
        <label className='labelField' htmlFor={labelFor}>{labelName}</label>
    )
}

export default Label