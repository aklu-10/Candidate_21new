import React, { useRef, useState } from 'react'
import Field from '../../../Form/Field';
import Label from '../../../Form/Label/Label'
import Button from '../../../Button/Button';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddNewQuestion = ({setShowAddNewForm, testTypeOptions}) => {

    const [addNewQuestionData, setAddNewQuestionState] = useState({
        technology:'',
        questionType:'',
        questionTitle:'',
        options:{ option1:{ value:'', isCorrect:false }, }
    });

    const [loader, setLoader] = useState(false);

    function handleAddNewInput(fieldName, e)
    {

        if(fieldName.includes("option"))
        {
            setAddNewQuestionState({...addNewQuestionData, options: {...addNewQuestionData.options, [fieldName]: { ...addNewQuestionData.options[fieldName], value : e.target.value } }})
        }
        else
        {
            setAddNewQuestionState({...addNewQuestionData, [fieldName]: e.target.value })
        }

    }

    function addNewQuestionOnBoard()
    {   
        
        if(!addNewQuestionData.technology || !addNewQuestionData.questionType || !addNewQuestionData.questionTitle)
        {
            toast.error("Please provide the required fields")
            return;
        }
        // else if(!Object.keys(addNewQuestionData.options).filter(option=>addNewQuestionData.options[option].isCorrect).length)
        // {
        //     toast.error("Please provide the required fields")
        //     return;
        // }

        toast.success("Question successfully created");
        setShowAddNewForm(false)

        let tech = addNewQuestionData.technology;

        let correctAns = Object.keys(addNewQuestionData.options).filter(option=>(
            addNewQuestionData.options[option]._isCorrect=true
        ))

        let base = {
            question: addNewQuestionData.questionTitle,
            option: addNewQuestionData.options,
            correct_answer: correctAns[0]
            }

        axios.post("http://localhost:8080/"+tech, base)
        .then(console.log)
        .catch(console.log)
            
    }

    function saveAndNewQuestionOnBoard()
    {

        
        if(!addNewQuestionData.technology || !addNewQuestionData.questionType || !addNewQuestionData.questionTitle)
        {
            toast.error("Please provide the required fields")
            return;
        }
        else if(!Object.keys(addNewQuestionData.options).filter(option=>addNewQuestionData.options[option].isCorrect).length)
        {
            toast.error("Please provide the required fields")
            return;
        }

        setShowAddNewForm(false)
        setTimeout(()=>
        {
            setShowAddNewForm(true)
        },10)

    }

    function handleAddNewOption()
    {
        let optionLen = Object.keys(addNewQuestionData.options).length
        if( optionLen )
        {   
            if(optionLen===4)
            {
                toast.info("Cannot add more options.");
                return;
            }
            let lastOptionIndex = Number(Object.keys(addNewQuestionData.options).slice(-1)[0].slice(-1))
            setAddNewQuestionState({...addNewQuestionData, options:{...addNewQuestionData.options, ['option'+(lastOptionIndex+1)]: { value:'', isCorrect:false }}})
        }
        else
        {

            setAddNewQuestionState({...addNewQuestionData, options:{'option1': { value:'', isCorrect:false }}})
        }
        
    }

    function handleDeleteOption(key)
    {
        if(key)
        {
            let copyObj = {...addNewQuestionData.options}
            delete copyObj[key];
            setAddNewQuestionState({...addNewQuestionData, options: {...copyObj}})
            setLoader(true);
            setTimeout(()=>
            {
                setLoader(false)
            },5)
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

        <>
            <div className='absolute top-[180px] right-[10px] my-4 bg-[#0e102c] shadow-[1px_1px_2px_rgba(255,255,255,.57)] z-10 p-4 py-4 rounded' >

                <h1 className='text-white'>Add New Question</h1>

                <Field
                    control="select"
                    fieldName="technology"
                    fieldLabel="Technology"
                    fieldOptions={testTypeOptions}
                    fieldClass="w-[500px]"
                    onClick={(e)=>handleAddNewInput("technology", e)}
                />

                <Field
                    control="select"
                    fieldName="questionType"
                    fieldLabel="Question Type"
                    fieldOptions={["Mcq", "Programming", "Descriptive"]}
                    fieldClass="w-[500px]"
                    onClick={(e)=>handleAddNewInput("questionType", e)}
                />

                <Field
                    control="input"
                    fieldName="questionTitle"
                    fieldType="text"
                    fieldLabel="Question Title"
                    fieldPlaceHolder="Question Title"
                    fieldClass="w-[500px]"
                    allowDebounce={true}
                    onChange={(e)=>handleAddNewInput("questionTitle", e)}
                />


                {/* options */}
                {
                    addNewQuestionData.questionType === "Mcq" &&
                    <div>
                    <div className='flex items-center'>
                        <Label labelName={"Answer Options"}/>
                        <button type='button' className='ml-5 bg-green-400 h-[25px] rounded-xl text-white px-2' onClick={handleAddNewOption}>+</button>
                    </div>

                    <div>

                        {
                            loader ? <p>Loading...</p> :
                            Object.keys(addNewQuestionData.options).map((option, index)=>(
                                
                                <div key={index} className='flex items-center justify-between'>
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
                    
                        }

                    </div>

                   


                </div>
                }
                    
                    <Button
                        btnClass={'rounded bg-blue-600 text-white p-2 mr-[20px]'}
                        onClick={addNewQuestionOnBoard}
                        >
                        Create
                    </Button>
                    <Button
                        btnClass={'rounded bg-blue-600 text-white p-2 mr-[20px]'}
                        onClick={saveAndNewQuestionOnBoard}
                        >
                        Save & Create New 
                    </Button>
                    <Button
                        btnClass={'rounded bg-red-600 text-white p-2 mr-[20px]'}
                        onClick={()=>setShowAddNewForm(false)}
                        >
                        Cancel
                    </Button>
            </div>
        </>

    )
}

export default AddNewQuestion