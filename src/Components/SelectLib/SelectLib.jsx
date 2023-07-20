import React, { useContext } from 'react'
import CreatableSelect from 'react-select/creatable';
import Label from '../Label/Label';
import FormContext from '../../context/FormContext';

const SelectLib = ({multiSelect="true", fieldLabel, fieldPlaceHolder, fieldOptions, fieldName, fieldClass, innerRef=null}) => {

    const {setMasterData} = useContext(FormContext);

    function handleSelectChange(option)
    {

        let keys = fieldName.split(".");
        if(option)
        {
            if(keys.length===2)
                setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev.forms[keys[0]], [keys[1]]: option.value }}}));
            else if(keys.length===3)
                setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev.forms[keys[0]], [keys[1]]: { ...prev.forms[keys[0]][keys[1]], [keys[2]]: option.value }}}}))
        }
        else
        {
            if(keys.length===2)
                setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev.forms[keys[0]], [keys[1]]: '' }}}));
            else if(keys.length===3)
                setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev.forms[keys[0]], [keys[1]]: { ...prev.forms[keys[0]][keys[1]], [keys[2]]: '' }}}}))
        }
    }

    function handleMultiSelectChange(option)
    {

        let keys = fieldName.split(".");
        setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev.forms[keys[0]], [keys[1]]: { ...prev.forms[keys[0]][keys[1]], [keys[2]]: [ ...option ]}}}}))
    }

    return (
        <div className={fieldClass}>
        {
            (fieldLabel) && 
            <Label labelName={fieldLabel} labelFor={fieldName}/>
        }
        {
            (multiSelect === "true")
            
            ?
                <CreatableSelect ref={innerRef}
                isMulti options={fieldOptions} placeholder={fieldPlaceHolder} onChange={handleMultiSelectChange}/>
            
            :

            <CreatableSelect isClearable options={fieldOptions} placeholder={fieldPlaceHolder} onChange={handleSelectChange}/>
        }
        </div>
    )
}

export default SelectLib