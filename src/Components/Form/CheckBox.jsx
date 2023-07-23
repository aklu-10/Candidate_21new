import React from 'react'
import Label from './Label/Label'

const CheckBox = ({fieldName, fieldOptions, fieldLabel}) => {

    return (
        <div>
            {
                (fieldLabel) && 
                <Label labelName={fieldLabel} labelFor={fieldName}/>
            }
        
            {
                fieldOptions.map((option, index)=>(
                    <input key={index} type='checkbox' name={fieldName} value={option}/>
                ))    
            }
        </div>
    )
}

export default CheckBox