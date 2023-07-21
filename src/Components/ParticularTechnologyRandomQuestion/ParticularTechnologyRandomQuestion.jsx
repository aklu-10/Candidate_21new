import React, { useContext } from "react";
import Field from "../Field/Field";
import FormContext from "../../context/FormContext";

const ParticularTechnologyRandomQuestion = ({options, formSectionKey, handleAddNewTechField, setSelectedTech, name}) => {

    const {masterData, setMasterData} = useContext(FormContext);

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


                                setMasterData((prev)=>({...prev, forms: { ...prev.forms, [formSectionKey] : {...prev.forms[formSectionKey], randomQuestions: {...prev.forms[formSectionKey].randomQuestions, technology: { ...prev.forms[formSectionKey].randomQuestions.technology ,[name]:{ ...prev.forms[formSectionKey].randomQuestions.technology[name], mcq:e.target.value } } } } }}))

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
                onClick={(e)=>{ 


                    setSelectedTech(e.target.value);

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

export default ParticularTechnologyRandomQuestion;
