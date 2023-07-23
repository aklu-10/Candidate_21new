import React from 'react'
import './Label.css';

const Label = ({labelName, labelFor, fieldClass}) => {


    return (
        <label className={`labelField text-sm text-white mt-[15px] ${fieldClass}`} htmlFor={labelFor}>{labelName}</label>
    )
}

export default Label