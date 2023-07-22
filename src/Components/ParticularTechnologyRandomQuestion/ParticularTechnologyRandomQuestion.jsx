import React, { memo, useContext, useEffect } from "react";
import Field from "../Field/Field";
import FormContext from "../../context/FormContext";

const ParticularTechnologyRandomQuestion = ({options, formSectionKey, handleAddNewTechField, name, allTechnologyObj, initialData, setAllTechnologyObj, index}) => {

    console.log(options)

    const {masterData, setMasterData} = useContext(FormContext);

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
                fieldClass="w-[500px]"
                onChange={(e)=>{ 

                    let selected = { name:name, selected: {label: e.target.value, value: e.target.value} }

                    if(index === Object.keys(allTechnologyObj).length-1)
                    {
                        setAllTechnologyObj((prev)=>({...prev, [name]:{ ...prev[name], selected: { label:e.target.value, value:e.target.value }}}))                        
                    }
                    else
                    {
                        function changeSelectOptions(obj, selected, initial)
                        {   
                            console.log("initialData", obj, selected)
    
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
