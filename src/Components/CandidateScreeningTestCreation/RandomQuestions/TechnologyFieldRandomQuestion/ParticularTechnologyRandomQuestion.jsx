import React, { memo, useContext, useEffect, useState } from "react";
import Field from "../../../Form/Field";
import FormContext from "../../../../context/FormContext";
import { toast } from "react-toastify";

const ParticularTechnologyRandomQuestion = ({options, formSectionKey, handleAddNewTechField, name, allTechnologyObj, initialData, setAllTechnologyObj, index, handleDeleteSpecificField, setLoader}) => {

    const {masterData, setMasterData, setIsFormValid} = useContext(FormContext);

    console.log(options)

    useEffect(()=>
    {
        setMasterData((prev)=>({...prev, forms:{...prev.forms, [formSectionKey]: {...prev.forms[formSectionKey], randomQuestions: { ...prev.forms[formSectionKey].randomQuestions, technology: { ...prev.forms[formSectionKey].randomQuestions.technology ,[name]: { ...prev.forms[formSectionKey].randomQuestions.technology[name], name : options[0].value} }}}}}))

    },[])


    function conditionalQuestionTotalRender(Mname, isMcq)
    {
        
        if(Mname === "Candidate")
        {
            return (isMcq === "true") ?

            (       <Field
                    control="input"
                    fieldName={`${formSectionKey}.randomQuestions.totalMcq`}
                    fieldValue={masterData.forms[formSectionKey].randomQuestions.technology[name]?.mcq}
                    fieldType="number"
                    fieldLabel="No. Of MCQ Questions"
                    fieldErrorMsg="No. Of MCQ Questions"
                    fieldPattern="^[0-9]\d*"
                    fieldClass="w-[350px]"
                    fieldPlaceHolder="Random Questions"
                    onChange={(e, setValue)=>{

                        setValue(e.target.value)
                        setMasterData((prev)=>({...prev, forms: { ...prev.forms, [formSectionKey] : {...prev.forms[formSectionKey], randomQuestions: {...prev.forms[formSectionKey].randomQuestions, technology: { ...prev.forms[formSectionKey].randomQuestions.technology , [name] : { ...prev.forms[formSectionKey].randomQuestions.technology[name], mcq:e.target.value } } } } }}))   
                        

                        if(Number(e.target.value) < 0 || e.target.value==='-')
                        {
                            toast.warn("Please provide a valid value");
                            setIsFormValid(false)
                            return;
                        }

                        let flag=0;


                        let allValues = (Object.keys(masterData.forms[formSectionKey].randomQuestions.technology).map(techName=>{
                         
                            return Object.keys(masterData.forms[formSectionKey].randomQuestions.technology[techName]).map(key=>{

                                if(key === "mcq" && techName === name && !flag){
                                    flag=1;
                                    return Number(e.target.value)
                                }
                                else if(key==="programming" || key ==="descriptive" || key==="mcq")
                                    return Number(masterData.forms[formSectionKey].randomQuestions.technology[techName][key])

                            }).filter(value=>value!=undefined)
                            
                        }))

                        let combinedArr=[];
                        allValues.map(value=>(combinedArr = [...combinedArr, ...value]))

                        if(combinedArr.reduce((acc, item)=>Number(acc)+Number(item)) !== Number(masterData.forms[formSectionKey].randomQuestions.totalQuestions))
                        {
                            toast.error("value must be equal to the random questions");
                            setIsFormValid(false);
                            return;
                        }

                        setIsFormValid(true)

                        }}

                />


            )

            :

                   (<>

             
                        <Field
                            control="input"
                            fieldName={`${formSectionKey}.randomQuestions.totalProgramming`}
                            fieldValue={masterData.forms[formSectionKey].randomQuestions.technology[name]?.programming}
                            fieldType="number"
                            fieldLabel="No. Of Programming Questions"
                            fieldErrorMsg="No. Of Programming Questions"
                            fieldPattern="^[0-9]\d*"
                            fieldClass="w-[350px]"
                            fieldPlaceHolder="Programming Questions"
                            onChange={(e, setValue)=>{

                                setValue(e.target.value)

                                setMasterData((prev)=>({...prev, forms: { ...prev.forms, [formSectionKey] : {...prev.forms[formSectionKey], randomQuestions: {...prev.forms[formSectionKey].randomQuestions, technology: { ...prev.forms[formSectionKey].randomQuestions.technology ,[name]:{ ...prev.forms[formSectionKey].randomQuestions.technology[name], programming:e.target.value } } } } }}))
                                

                                if(Number(e.target.value) < 0 || e.target.value==='-')
                                {
                                    toast.warn("Please provide a valid value");
                                    setIsFormValid(false)
                                    return;
                                }

                                let allValues = (Object.keys(masterData.forms[formSectionKey].randomQuestions.technology).map(techName=>{
                                 
                                    return Object.keys(masterData.forms[formSectionKey].randomQuestions.technology[techName]).map(key=>{

                                        console.log(techName, key, name)
                                        if(key === "programming" && techName === name){
                                            return Number(e.target.value)
                                        }
                                        else if(key==="mcq" || key ==="descriptive" || key=="programming")
                                            return Number(masterData.forms[formSectionKey].randomQuestions.technology[techName][key])   
                                    }).filter(value=>value!=undefined)
                                    
                                }))

                                let combinedArr=[];
                                allValues.map(value=>(combinedArr = [...combinedArr, ...value]))

                                console.log(allValues)

                                if(combinedArr.reduce((acc, item)=>Number(acc)+Number(item)) !== Number(masterData.forms[formSectionKey].randomQuestions.totalQuestions))
                                {
                                    toast.error("value must be equal to the random questions");
                                    setIsFormValid(false);
                                    return;
                                }

                                setIsFormValid(true)

                                }}

                        />

                <Field
                control="input"
                fieldName={`${formSectionKey}.randomQuestions.totalDescriptive`}
                fieldValue={masterData.forms[formSectionKey].randomQuestions.technology[name]?.descriptive}
                fieldType="number"
                fieldLabel="No. of descreptive Questions"
                fieldErrorMsg="No. Of Descreptive Questions"
                fieldPattern="^[0-9]\d*"
                fieldClass="w-[350px]"
                fieldPlaceHolder="Descreptive Questions"
                onChange={(e, setValue)=>{

                    setValue(e.target.value)

                    setMasterData((prev)=>({...prev, forms: { ...prev.forms, [formSectionKey] : {...prev.forms[formSectionKey], randomQuestions: {...prev.forms[formSectionKey].randomQuestions, technology: { ...prev.forms[formSectionKey].randomQuestions.technology ,[name]:{ ...prev.forms[formSectionKey].randomQuestions.technology[name], descriptive:e.target.value } } } } }}))


                    if(Number(e.target.value) < 0 || e.target.value==='-' || Number(e.target.value) > masterData.forms[formSectionKey].randomQuestions.totalQuestions)
                    {
                        toast.warn("Please provide a valid value");
                        setIsFormValid(false);
                        return;
                    }
                    let flag=0;
                    let allValues = (Object.keys(masterData.forms[formSectionKey].randomQuestions.technology).map(techName=>{
                        
                        return (Object.keys(masterData.forms[formSectionKey].randomQuestions.technology[techName]).map(key=>{

                            if(key === "descriptive" && techName === name && !flag)
                            {
                                flag=1;
                                return Number(e.target.value)
                            }
                            else if(key==="mcq" || key ==="programming" || key==="descriptive")
                                return Number(masterData.forms[formSectionKey].randomQuestions.technology[techName][key])
                        }).filter(value=>value!==undefined))
                        
                    }))

                    console.log(allValues)

                    let combinedArr=[];
                    allValues.map(value=>(combinedArr = [...combinedArr, ...value]))

                    console.log(combinedArr.reduce((acc, item)=>Number(acc)+Number(item)));

                    if((combinedArr.reduce((acc, item)=>Number(acc)+Number(item))) !== Number(masterData.forms[formSectionKey].randomQuestions.totalQuestions))
                    {
                        toast.error("value must be equal to the random questions");
                        setIsFormValid(false);
                        return;
                    }


                    setIsFormValid(true);

                    }}
                        />
                    </>)


        }
        else
        {
            return ( <Field
                control="input"
                fieldName={`${formSectionKey}.randomQuestions.totalMcq`}
                fieldValue={masterData.forms[formSectionKey].randomQuestions.technology[name]?.mcq}
                fieldType="number"
                fieldLabel="No. Of MCQ Questions"
                fieldErrorMsg="No. Of MCQ Questions"
                fieldPattern="^[0-9]\d*"
                fieldClass="w-[350px]"
                fieldPlaceHolder="Random Questions"
                onChange={(e)=>{

                    setMasterData((prev)=>({...prev, forms: { ...prev.forms, [formSectionKey] : {...prev.forms[formSectionKey], randomQuestions: {...prev.forms[formSectionKey].randomQuestions, technology: { ...prev.forms[formSectionKey].randomQuestions.technology , [name] : { ...prev.forms[formSectionKey].randomQuestions.technology[name], mcq:e.target.value } } } } }}))   
                    
                    let res = Object.keys(masterData.forms[formSectionKey].randomQuestions.technology).map(techName=>{
                    
                        if(techName === name)
                            return Number(e.target.value)
                        return Number(masterData.forms[formSectionKey].randomQuestions.technology[techName]?.mcq ?? 0)
                    })

                    if((res.reduce((acc, item)=>acc+item)) === Number(masterData.forms[formSectionKey].randomQuestions.totalQuestions))
                    {
                        setIsFormValid(true)
                    }
                    else{
                        toast.error("Total must equal to provided random questions")
                        setIsFormValid(false)
                    }
                    // console.log(Number(masterData.forms[formSectionKey].randomQuestions.technology[name]?.mcq))


                    }}
            />
            )
        }
    
    }

    return (
        <div>
            <div className="flex items-center">
                <Field
                control="select"
                fieldName={`${formSectionKey}.randomQuestions.technology`}
                fieldLabel="Technology"
                fieldOptions={options}
                fieldDefaultValue={allTechnologyObj[name].selected}
                fieldClass="w-[500px]"
                onClick={(e)=>{ 

                    // setValue(e.target.value)

                    let selected = { name:name, selected: {label: e.target.value, value: e.target.value} }

                    if(index === Object.keys(allTechnologyObj).length-1)
                    {
                        setAllTechnologyObj((prev)=>({...prev, [name]:{ ...prev[name], selected: { label:e.target.value, value:e.target.value }}}))                        
                    }
                    else
                    {
                        function changeSelectOptions(obj, selected, initial)
                        {   
                            let removeKeys = [];
                            let res = {};
                            for(let i in obj)
                            {
                                if(i===selected.name)
                                    break;
                                removeKeys.push(i)
                                res={...obj[i]}
                            }
                            
                            let operationalKeys = Object.keys(obj).filter(key=>!removeKeys.includes(key))
                            
                            console.log(removeKeys, operationalKeys)
    
                            let first;
                            if(removeKeys.length)
                                first=obj[removeKeys.slice(-1)]
                            
    
                            let selectedTechData = first ?? { technologies:initial, selected:selected.selected};
    
                            operationalKeys.map(key=>
                            {
                                let res = [];
                                if(key==="technology1")
                                    obj[key].technologies=initial
    
                                else{
                                        res = selectedTechData.technologies.filter((tech,index)=>{
                                        return tech.value!=selectedTechData.selected.value
                                    })
                                    obj[key].technologies = res;
                                }
    
                                if(key==selected.name){
                                    obj[key].selected = selected.selected
                                }
                                else{
                                 
                                    if(obj[key].selected.value === selected.selected.value)
                                    {
                                        obj[key].selected = res[0]
                                    }   

                                }
                                
                                selectedTechData = obj[key];
                                
                            })
                            
                            return obj;
                            
                        }
    
                        let res = changeSelectOptions({...allTechnologyObj}, selected, initialData)

                        setAllTechnologyObj(res);
                    }


                    setMasterData((prev)=>({...prev, forms:{...prev.forms, [formSectionKey]: {...prev.forms[formSectionKey], randomQuestions: { ...prev.forms[formSectionKey].randomQuestions, technology: { ...prev.forms[formSectionKey].randomQuestions.technology ,[name]: { ...prev.forms[formSectionKey].randomQuestions.technology[name], name : e.target.value} }}}}}))

                }}
                />

                {
                    name==="technology1" && 
                    
                <span className="text-white bg-[#262c77] flex items-center justify-center text-sm px-4 mt-[40px] rounded-md ml-[20px] h-[30px] cursor-pointer shadow-[1px_1px_2px_black,-1px_-1px_2px_rgba(255,255,255,.2)]"
                onClick={handleAddNewTechField}
                >
                Add technology
                </span>
                }

                {
                    index!=0 &&
                  
                    <span className="text-white bg-[#262c77] flex items-center justify-center text-xl mt-[40px] rounded-md ml-[20px] w-[30px] h-[30px] cursor-pointer shadow-[1px_1px_2px_black,-1px_-1px_2px_rgba(255,255,255,.2)]"
                    onClick={()=>handleDeleteSpecificField(allTechnologyObj, name)}
                    >
                    -
                    </span>
                }
            </div>

            <div className="flex flex-wrap justify-between">
                {conditionalQuestionTotalRender(
                masterData.forms[formSectionKey].managedBy.name,
                masterData.forms[formSectionKey].managedBy._isMcq
                )}
            </div>
        </div>
    );
};

export default memo(ParticularTechnologyRandomQuestion);
