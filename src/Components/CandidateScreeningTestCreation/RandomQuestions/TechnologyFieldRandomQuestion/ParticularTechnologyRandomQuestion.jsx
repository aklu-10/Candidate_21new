import React, { memo, useContext, useEffect, useState } from "react";
import Field from "../../../Form/Field";
import FormContext from "../../../../context/FormContext";
import { toast } from "react-toastify";

const ParticularTechnologyRandomQuestion = ({options, formSectionKey, handleAddNewTechField, name, allTechnologyObj, initialData, setAllTechnologyObj, index, handleDeleteSpecificField, loader}) => {

    const {masterData, setMasterData, setIsFormValid} = useContext(FormContext);

    useEffect(()=>
    {
        
        setMasterData((prev)=>({...prev, forms:{...prev.forms, [formSectionKey]: {...prev.forms[formSectionKey], randomQuestions: { ...prev.forms[formSectionKey].randomQuestions, technology: { ...prev.forms[formSectionKey].randomQuestions.technology ,[name]: { ...prev.forms[formSectionKey].randomQuestions.technology[name], name : options[0].value} }}}}}))

        if(masterData.forms[formSectionKey].managedBy._isMcq === "true")
            setMasterData((prev)=>({...prev, forms: { ...prev.forms, [formSectionKey] : {...prev.forms[formSectionKey], randomQuestions: {...prev.forms[formSectionKey].randomQuestions, technology: { ...prev.forms[formSectionKey].randomQuestions.technology , [name] : { ...prev.forms[formSectionKey].randomQuestions.technology[name], programming:0, descriptive:0 } } } } }}))  
        
        else
            setMasterData((prev)=>({...prev, forms: { ...prev.forms, [formSectionKey] : {...prev.forms[formSectionKey], randomQuestions: {...prev.forms[formSectionKey].randomQuestions, technology: { ...prev.forms[formSectionKey].randomQuestions.technology , [name] : { ...prev.forms[formSectionKey].randomQuestions.technology[name], mcq:0 } } } } }}))  

    },[masterData.forms[formSectionKey].managedBy._isMcq])


    const handleDeleteTechnology = (obj , techName) => 
    {
        handleDeleteSpecificField(obj, techName)
    }

    function conditionalQuestionTotalRender(Mname, isMcq)
    {     
        if(Mname === "Candidate")
        {
            

            return !loader && (isMcq === "true") ?

            (       <Field
                    control="input"
                    fieldName={`${formSectionKey}.randomQuestions.totalMcq`}
                    fieldValue={Number(masterData.forms[formSectionKey].randomQuestions.technology[name]?.mcq) ?? 0}
                    fieldType="number"
                    fieldLabel="No. Of MCQ Questions"
                    fieldErrorMsg="No. Of MCQ Questions"
                    fieldPattern="^[0-9]\d*"
                    fieldClass="w-[350px]"
                    fieldPlaceHolder="Random Questions"
                    onChange={(e, setValue)=>{

                        setMasterData((prev)=>({...prev, forms: { ...prev.forms, [formSectionKey] : {...prev.forms[formSectionKey], randomQuestions: {...prev.forms[formSectionKey].randomQuestions, technology: { ...prev.forms[formSectionKey].randomQuestions.technology , [name] : { ...prev.forms[formSectionKey].randomQuestions.technology[name], mcq:e.target.value } } } } }}))  

                        if(Number(e.target.value) < 0 || e.target.value==='-')
                        {
                            toast.warn("Please provide a valid value");
                            setIsFormValid(false)
                            return;
                        }


                        let allValues = (Object.keys(masterData.forms[formSectionKey].randomQuestions.technology).map(techName=>{

                            return Object.keys(masterData.forms[formSectionKey].randomQuestions.technology[techName]).map(key=>{

                                if(key === "mcq" && techName === name){
                                    return Number(e.target.value)
                                }
                                else if(key==="programming" || key ==="descriptive" || (key==="mcq" && techName !== name) )
                                    return Number(masterData.forms[formSectionKey].randomQuestions.technology[techName][key])

                            }).filter(value=>value!=undefined)
                            
                        }))


                        let combinedArr=[];
                        allValues.map(value=>(combinedArr = [...combinedArr, ...value]))

                        if(combinedArr.length && combinedArr.reduce((acc, item)=>Number(acc)+Number(item)) !== Number(masterData.forms[formSectionKey].randomQuestions.totalQuestions))
                        {
                            toast.error("value must be equal to the random questions");
                            setIsFormValid(false);
                            return;
                        }

                        setValue(e.target.value)
                        setIsFormValid(true)
 
                        

                        }}

                />


            )

            :

            (!loader && <>

                <Field
                    control="input"
                    fieldName={`${formSectionKey}.randomQuestions.totalProgramming`}
                    fieldValue={Number(masterData.forms[formSectionKey].randomQuestions.technology[name]?.programming) ?? 0}
                    fieldType="number"
                    fieldLabel="No. Of Programming Questions"
                    fieldErrorMsg="No. Of Programming Questions"
                    fieldPattern="^[0-9]\d*"
                    fieldClass="w-[350px]"
                    fieldPlaceHolder="Programming Questions"
                    onChange={(e, setValue)=>{


                        setMasterData((prev)=>({...prev, forms: { ...prev.forms, [formSectionKey] : {...prev.forms[formSectionKey], randomQuestions: {...prev.forms[formSectionKey].randomQuestions, technology: { ...prev.forms[formSectionKey].randomQuestions.technology ,[name]:{ ...prev.forms[formSectionKey].randomQuestions.technology[name], programming:e.target.value } } } } }}))
                        
                        if(Number(e.target.value) < 0 || e.target.value==='-')
                        {
                            toast.warn("Please provide a valid value");
                            setIsFormValid(false)
                            return;
                        }

                        let allValues = (Object.keys(masterData.forms[formSectionKey].randomQuestions.technology).map(techName=>{
                            
                            return Object.keys(masterData.forms[formSectionKey].randomQuestions.technology[techName]).map(key=>{

                                if(key === "programming" && techName === name){
                                    return Number(e.target.value)
                                }
                                else if(key==="mcq" || key ==="descriptive" || (key=="programming" && techName !== name) )
                                    return Number(masterData.forms[formSectionKey].randomQuestions.technology[techName][key])   
                            }).filter(value=>value!=undefined)
                            
                        }))

                        let combinedArr=[];
                        allValues.map(value=>(combinedArr = [...combinedArr, ...value]))


                        if(combinedArr.length && combinedArr.reduce((acc, item)=>Number(acc)+Number(item)) !== Number(masterData.forms[formSectionKey].randomQuestions.totalQuestions))
                        {
                            toast.error("value must be equal to the random questions");
                            setIsFormValid(false);
                            return;
                        }
                        setValue(e.target.value)
                        setIsFormValid(true)

                        setValue(e.target.value)


                        }}

                />

                <Field
                control="input"
                fieldName={`${formSectionKey}.randomQuestions.totalDescriptive`}
                fieldValue={Number(masterData.forms[formSectionKey].randomQuestions.technology[name]?.descriptive) ?? 0}
                fieldType="number"
                fieldLabel="No. of descreptive Questions"
                fieldErrorMsg="No. Of Descreptive Questions"
                fieldPattern="^[0-9]\d*"
                fieldClass="w-[350px]"
                fieldPlaceHolder="Descreptive Questions"
                onChange={(e, setValue)=>{


                    setMasterData((prev)=>({...prev, forms: { ...prev.forms, [formSectionKey] : {...prev.forms[formSectionKey], randomQuestions: {...prev.forms[formSectionKey].randomQuestions, technology: { ...prev.forms[formSectionKey].randomQuestions.technology ,[name]:{ ...prev.forms[formSectionKey].randomQuestions.technology[name], descriptive:e.target.value } } } } }}))


                    if(Number(e.target.value) < 0 || e.target.value==='-' || Number(e.target.value) > masterData.forms[formSectionKey].randomQuestions.totalQuestions)
                    {
                        toast.warn("Please provide a valid value");
                        setIsFormValid(false);
                        return;
                    }
                    let allValues = (Object.keys(masterData.forms[formSectionKey].randomQuestions.technology).map(techName=>{
                        
                        return (Object.keys(masterData.forms[formSectionKey].randomQuestions.technology[techName]).map(key=>{

                            if(key === "descriptive" && techName === name)
                            {
                                return Number(e.target.value)
                            }
                            else if(key==="mcq" || key ==="programming" || (key==="descriptive" && techName !== name) )
                                return Number(masterData.forms[formSectionKey].randomQuestions.technology[techName][key])
                        }).filter(value=>value!==undefined))
                        
                    }))


                    let combinedArr=[];

                    allValues.map(value=>(combinedArr = [...combinedArr, ...value]))

                    if((combinedArr.length && combinedArr.reduce((acc, item)=>Number(acc)+Number(item))) !== Number(masterData.forms[formSectionKey].randomQuestions.totalQuestions))
                    {
                        toast.error("value must be equal to the random questions");
                        setIsFormValid(false);
                        return;
                    }

                    setIsFormValid(true);
                    setValue(e.target.value)

                    }}
                        />
                    </>)


        }
        else
        {
            return ( <Field
                control="input"
                fieldName={`${formSectionKey}.randomQuestions.totalMcq`}
                fieldValue={Number(masterData.forms[formSectionKey].randomQuestions.technology[name]?.mcq) ?? 0}
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
                    }}
            />
            )
        }
    
    }

    function handleSelectTechnology(e)
    {
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
                    for(let i in obj)
                    {
                        if(i===selected.name)
                            break;
                        removeKeys.push(i)
                    }
                    
                    let operationalKeys = Object.keys(obj).filter(key=>!removeKeys.includes(key))
                    

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
            

        } 
    


    return (
        <div>

            {
                <div className="flex items-center">
                
                <div className="flex items-center">

                {
                    
                    loader === true ? <p>loading...</p> :

                    <select className="w-[500px] p-2 mt-[25px] border bg-white rounded" defaultValue={allTechnologyObj[name].selected.value} onChange={ !loader && handleSelectTechnology}>
                        {
                            options.map((option, index)=>(
                                <option key={index} value={option.value}>{option.label}</option>
                            ))
                        }
                    </select>
                }

                {
                    name==="technology1" && 
                    
                <span className="text-white bg-[#262c77] flex items-center justify-center text-sm px-4 rounded-md mt-[25px] ml-[20px] h-[30px] cursor-pointer shadow-[1px_1px_2px_black,-1px_-1px_2px_rgba(255,255,255,.2)]"
                onClick={handleAddNewTechField}
                >
                Add technology
                </span>
                }

                {
                    index!=0 &&
                    <span className="text-white bg-[#262c77] flex items-center justify-center text-xl  rounded-md mt-[25px] ml-[20px] w-[30px] h-[30px] cursor-pointer shadow-[1px_1px_2px_black,-1px_-1px_2px_rgba(255,255,255,.2)]"
                    onClick={()=>handleDeleteTechnology(allTechnologyObj, name)}
                    >
                    -
                    </span>
                }
                </div>
            </div>

            }
        
            <div className="flex flex-wrap justify-start gap-10">
                {conditionalQuestionTotalRender(
                masterData.forms[formSectionKey].managedBy.name,
                masterData.forms[formSectionKey].managedBy._isMcq
                )}
            </div>
        </div>
    );
};

export default memo(ParticularTechnologyRandomQuestion);
