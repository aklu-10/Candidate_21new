import React, { memo, useContext, useEffect } from "react";
import Field from "../../../Form/Field";
import FormContext from "../../../../context/FormContext";
import { toast } from "react-toastify";

const ParticularTechnologyRandomQuestion = ({options, formSectionKey, handleAddNewTechField, name, allTechnologyObj, initialData, setAllTechnologyObj, index, handleDeleteSpecificField}) => {

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

            return  (<>

                        <Field
                            control="input"
                            fieldName={`${formSectionKey}.randomQuestions.totalDescriptive`}
                            fieldType="number"
                            fieldLabel="No. of descreptive Questions"
                            fieldErrorMsg="No. Of Descreptive Questions"
                            fieldPattern="^[0-9]\d*"
                            fieldClass="w-[350px]"
                            fieldPlaceHolder="Descreptive Questions"
                            onChange={(e)=>{

                                setMasterData((prev)=>({...prev, forms: { ...prev.forms, [formSectionKey] : {...prev.forms[formSectionKey], randomQuestions: {...prev.forms[formSectionKey].randomQuestions, technology: { ...prev.forms[formSectionKey].randomQuestions.technology ,[name]:{ ...prev.forms[formSectionKey].randomQuestions.technology[name], descriptive:e.target.value } } } } }}))

                                }}
                        />
                        <Field
                            control="input"
                            fieldName={`${formSectionKey}.randomQuestions.totalProgramming`}
                            fieldType="number"
                            fieldLabel="No. Of Programming Questions"
                            fieldErrorMsg="No. Of Programming Questions"
                            fieldPattern="^[0-9]\d*"
                            fieldClass="w-[350px]"
                            fieldPlaceHolder="Programming Questions"
                            onChange={(e)=>{

                                setMasterData((prev)=>({...prev, forms: { ...prev.forms, [formSectionKey] : {...prev.forms[formSectionKey], randomQuestions: {...prev.forms[formSectionKey].randomQuestions, technology: { ...prev.forms[formSectionKey].randomQuestions.technology ,[name]:{ ...prev.forms[formSectionKey].randomQuestions.technology[name], programming:e.target.value } } } } }}))

                                }}

                        />

                        <Field
                            control="input"
                            fieldName={`${formSectionKey}.randomQuestions.totalMcq`}
                            fieldType="number"
                            fieldLabel="No. Of MCQ Questions"
                            fieldErrorMsg="No. Of MCQ Questions"
                            fieldPattern="^[0-9]\d*"
                            fieldClass="w-[350px]"
                            fieldPlaceHolder="Random Questions"
                            onChange={(e)=>{


                                setMasterData((prev)=>({...prev, forms: { ...prev.forms, [formSectionKey] : {...prev.forms[formSectionKey], randomQuestions: {...prev.forms[formSectionKey].randomQuestions, technology: { ...prev.forms[formSectionKey].randomQuestions.technology , [name] : { ...prev.forms[formSectionKey].randomQuestions.technology[name], mcq:e.target.value } } } } }}))   

                                }}

                        />
                    </>)


        }
        else
        {
            return ( <Field
                control="input"
                fieldName={`${formSectionKey}.randomQuestions.totalMcq`}
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

                    console.log(res)

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

                <span className="text-green-600/100 text-xl mt-[40px] ml-[20px] cursor-pointer"
                onClick={handleAddNewTechField}
                >
                &#8853;
                </span>
                {
                    index!=0 &&
                    <span className="text-green-600/100 text-xl mt-[40px] ml-[20px] cursor-pointer"
                    onClick={()=>handleDeleteSpecificField(allTechnologyObj, name)}
                    >
                    &#8722;
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
