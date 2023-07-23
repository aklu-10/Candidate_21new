import Label from './Label/Label';
import FormContext from '../../context/FormContext';
import React, { memo, useContext, useState } from 'react'
import { toast } from 'react-toastify';


const Input = ({fieldLabel, fieldType, fieldPlaceHolder, fieldPattern, fieldErrorMsg, fieldName, fieldValue, fieldClass, onChange, stateSetter=null, allowDebounce=false}) => {

    console.log("Input")

    console.log("Here are value - ", fieldValue)

    const [value, setValue] = useState(fieldValue);
    const {masterData, setMasterData, setIsFormValid } = useContext(FormContext);

    // handle input change function
    function handleInputChange(e)
    {
        // if(fieldName.includes("random"))
        let keys = fieldName.split(".");

        if(fieldName.includes("randomQuestions.totalQuestions") || fieldName.includes("predefinedQuestions.totalQuestions"))
        {   
            if(Number(e.target.value) > Number(masterData.forms[keys[0]].totalQuestions))
                toast.error("value exceeds")


            if(Number(e.target.value)===Number(masterData.forms[keys[0]].totalQuestions))          
            {
                setMasterData((prev)=>({...prev, forms:{ ...prev.forms, [keys[0]]:{ ...prev.forms[keys[0]], [keys[1] !== "randomQuestions" ? "randomQuestions" : "predefinedQuestions" ]: { ...prev.forms[keys[0]][keys[1] !== "randomQuestions" ? "randomQuestions" : "predefinedQuestions"], totalQuestions: 0 }}}}))
                setIsFormValid(true);
            }
            else{
                setIsFormValid(false);
            }
     
            if(Number(e.target.value) > 0 && (Number(e.target.value) < Number(masterData.forms[keys[0]].totalQuestions)))
            {
                setMasterData((prev)=>({...prev, forms:{ ...prev.forms, [keys[0]]:{ ...prev.forms[keys[0]], [keys[1] === "randomQuestions" ? "predefinedQuestions" : "randomQuestions" ]: { ...prev.forms[keys[0]][keys[1] === "randomQuestions" ? "predefinedQuestions" : "randomQuestions"], totalQuestions: Number(masterData.forms[keys[0]].totalQuestions) - Number(e.target.value) }}}}))
                setIsFormValid(true);
            }

        }

        setValue(e.target.value)

        if(stateSetter)
        {
            stateSetter((prev)=>({...prev, options:{ ...prev.options, [fieldName]: {...prev.options[fieldName], value:e.target.value}}}))
        }
        else
        {

            if(keys.length===2)
                setMasterData((prev)=>({...prev, forms: { ...prev.forms, [keys[0]] : { ...prev.forms[keys[0]], [keys[1]]: e.target.value }}}));
            else if(keys.length===3)
                setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev.forms[keys[0]], [keys[1]]: { ...prev.forms[keys[0]][keys[1]], [keys[2]]: e.target.value }}}}))
        }

        if(fieldPattern)
        {
            let pattern = new RegExp(fieldPattern);
            if(!pattern.test(e.target.value))
                if(e.target.value!='')
                    toast.error(fieldErrorMsg);
        }

        
        
    }

    // debouncing on handleInputchange
    function debounceInput(handleInputChange, delay)
    {
        let timer;
        return function(...args)
        {
            clearTimeout(timer);
            timer = setTimeout(function()
            {
                handleInputChange(...args);
            },delay)
        }
    }

    // function changeWithSetter(e)
    // {
    //     // console.log(fieldValue)
    //     // console.log(fieldName, e.target.value)
    //     stateSetter((prev)=>({...prev, options:{...prev.options, [fieldName] : { ...prev.options[fieldName], value: e.target.value }}}))
    // }

    let debouncedInputData = debounceInput( onChange ?? handleInputChange , 500)

    return (
        <div className={fieldClass}>
        {
            (fieldLabel) && 
            <Label labelName={fieldLabel} labelFor={fieldName}/>
        }
        
        {

            <input className='w-[100%] border p-2 rounded mb-2 text-[rgba(255,255,255,.9)] border-none bg-[#0e102c] shadow-[-1px_-1px_5px_black,1px_1px_1px_rgba(255,255,255,.2)] focus:outline-none hover:shadow-[1px_1px_5px_black]' id={fieldName} type={fieldType} placeholder={fieldPlaceHolder} value={allowDebounce ? undefined : value} onChange={ onChange ?? allowDebounce ? debouncedInputData : handleInputChange } />

        }


        </div>
    )
}

export default memo(Input);