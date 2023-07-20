import React from 'react'
import Field from '../Field/Field'

const AddNewQuestionOptions = ({addNewQuestionData, setAddNewQuestionState}) => {

    function handleDeleteOption(key)
    {
        if(key)
        {
            let copyObj = {...addNewQuestionData.options}
            delete copyObj[key];
            console.log(copyObj)
            setAddNewQuestionState({...addNewQuestionData, options: {...copyObj}})
        }
    }

    function handleCorrectOption(correctOption)
    {

        let copyOptionData = {...addNewQuestionData.options};

        Object.keys(copyOptionData).map(option=>{
            (option===correctOption) 
            ? copyOptionData[option].isCorrect=true
            : copyOptionData[option].isCorrect=false
        })

        setAddNewQuestionState({...addNewQuestionData, options: {...copyOptionData}})
    }

    return (
        Object.keys(addNewQuestionData.options).map((option, index)=>(
                                
            <div key={index} className='flex items-center justify-between'>
                {console.log("option",addNewQuestionData.options[option])}
                <Field
                    control="input"
                    fieldName={option}
                    fieldType="text"
                    fieldValue={addNewQuestionData.options[option].value}
                    fieldLabel={"Answer Option (" + (index+1) + ")"}
                    fieldPlaceHolder="Answer Option"
                    fieldClass="w-[200px]"
                    stateSetter={setAddNewQuestionState}
                />

                <div className='flex items-center'>

                    <Field  
                        control="radio"
                        fieldName="correctoption"
                        fieldLabel="is Correct"
                        fieldOptions={[option]}
                        fieldClass="w-[200px]"
                        onChange={()=>handleCorrectOption(option)}
                    />

                    <button type='button' className='ml-5 bg-red-400 w-[25px] h-[25px] rounded-xl text-white px-2' onClick={()=>handleDeleteOption(option)}>-</button>

                </div>

            </div>
        ))

    )
}

export default AddNewQuestionOptions