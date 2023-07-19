import React, {memo, useContext} from 'react'
import Label from '../Label/Label'
import FormContext from '../../context/FormContext'

const Select = ({fieldName, fieldLabel, fieldOptions, fieldClass, onClick}) => {


    const {setMasterData} = useContext(FormContext);

    function handleSelectChange(e)
    {
        let keys = fieldName.split(".");

        if(keys.includes("managedBy"))
            setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev.forms[keys[0]], [keys[1]]: { ...prev.forms[keys[0]][keys[1]], [keys[2]]: e.target.value }}}}))
        else
            setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev.forms[keys[0]], [keys[1]]: e.target.value }}}));
    }

    return (
    

        <div className={fieldClass}>
        {
        (fieldLabel) && 
        <Label labelName={fieldLabel} labelFor={fieldName}/>
        }
        
        <select className='w-[100%] p-2 border bg-white rounded' onClick={onClick ?? handleSelectChange}>
            {
                fieldOptions.map((option, index)=>(
                    <option key={index} value={option}>{option}</option>
                ))
            }
        </select>

        



    </div>

    )


}

export default memo(Select)