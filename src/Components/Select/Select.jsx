import React, {memo, useContext} from 'react'
import Label from '../Label/Label'
import FormContext from '../../context/FormContext'

const Select = ({fieldName, fieldLabel, fieldOptions, fieldClass, onClick, onChange}) => {


    const {setMasterData} = useContext(FormContext);

    function handleSelectChange(e)
    {
        let keys = fieldName.split(".");

        if(keys.length===2)
            setMasterData((prev)=>({...prev, forms: { ...prev.forms, [keys[0]] : { ...prev.forms[keys[0]], [keys[1]]: e.target.value }}}));
        else if(keys.length===3)
            setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev.forms[keys[0]], [keys[1]]: { ...prev.forms[keys[0]][keys[1]], [keys[2]]: e.target.value }}}}))
        
    }

    return (
    

        <div className={fieldClass}>
        {
        (fieldLabel) && 
        <Label labelName={fieldLabel} labelFor={fieldName}/>
        }
        
       {
        onChange ? 
        <select className='w-[100%] p-2 border bg-white rounded' onChange={onChange ?? handleSelectChange} >

        {
            (fieldName.split(".").length==1) && <option selected disabled>Please Select {fieldName} </option>
        }

        {
            fieldOptions.map((option, index)=>(

                (typeof option === 'object')
                ? <option key={index} value={option.value}>{option.label}</option>
                : <option key={index} value={option}>{option}</option>

            ))
        }
    </select>
    :
    <select className='w-[100%] p-2 border bg-white rounded' onClick={onClick ?? handleSelectChange} >

    {
        (fieldName.split(".").length==1) && <option selected disabled>Please Select {fieldName} </option>
    }

    {
        fieldOptions.map((option, index)=>(

            (typeof option === 'object')
            ? <option key={index} value={option.value}>{option.label}</option>
            : <option key={index} value={option}>{option}</option>

        ))
    }
</select>
       }

        



    </div>

    )


}

export default memo(Select)