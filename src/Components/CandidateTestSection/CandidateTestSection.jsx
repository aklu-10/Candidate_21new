import React from "react";
import Field from '../Field/Field';
import TabSwitch from '../TabSwitch/TabSwitch';
import RandomQuestions from "../RandomQuestions/RandomQuestions";
import PredefinedQuestions from "../PredefinedQuestions/PredefinedQuestions";
import FormContext from "../../context/FormContext";
import { useContext } from "react";
import { candidateTestSectionBaseData } from "../../data/candidateTestSectionBaseData";

const CandidateTestSection = ({formSectionKey}) => {
    
    const {masterData, setMasterData, formIndex} = useContext(FormContext);

    let testTypeOptions = [
            { label: 'coding', value: 'coding' },
            { label: 'screening', value: 'screening' }
        ]

    console.log("Candidate Section")

    function handleAddNewFormSection()
    {

        setMasterData((prev)=>({...prev, forms:{ ...prev.forms, ["form"+(formIndex.current+1)] : {...candidateTestSectionBaseData}}}))

        formIndex.current+=1;
    }

    return (
        <div>
            <div className="flex items-center">
                <Field
                control="input"
                fieldName={`${formSectionKey}.testName`}
                fieldValue={masterData.forms[formSectionKey].testName}
                fieldType="text"
                fieldLabel="Test Name"
                fieldPlaceHolder="Type test name"
                fieldErrorMsg="Error Message"
                fieldClass="w-[500px]"
                />

                <span className="text-green-600/100 text-xl mt-[28px] ml-[20px] cursor-pointer" onClick={handleAddNewFormSection}>&#8853;</span>
            </div>

            <Field
                control="selectlib"
                multiSelect="false"
                fieldName={`${formSectionKey}.testType`}
                fieldLabel="Select Test Type, or add new test type"
                fieldPlaceHolder="Select Test Type, or add new test type"
                fieldOptions={testTypeOptions}
                fieldClass="w-[500px]"
            />

            <div className="flex">
                <Field
                control="select"
                fieldName={`${formSectionKey}.managedBy.name`}
                fieldLabel="Managed By"
                fieldOptions={["Agent", "Candidate"]}
                fieldClass="w-[500px]"
                onClick={(e)=>{

                    let keys = `${formSectionKey}.managedBy.name`.split(".");

                    if(e.target.value==="Agent")
                    {
                        setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev.forms[keys[0]], [keys[1]]: { ...prev.forms[keys[0]][keys[1]], [keys[2]]: e.target.value , _isMcq: true, _isDisabled:true }}}}))
                    }
                    else{

                        setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev.forms[keys[0]], [keys[1]]: { ...prev.forms[keys[0]][keys[1]], [keys[2]]: e.target.value , _isMcq: false, _isDisabled:false }}}}))
                    }
                }}
                />

                {
                    (masterData.forms[formSectionKey].managedBy.name === "Agent")
                    ?

                    <Field
                    control="radio"
                    fieldName={`${formSectionKey}.managedBy._isMcq`}
                    fieldLabel="isMcq"
                    fieldOptions={[{label:"Yes", value:true}, {label:"No", value:false}]}
                    fieldClass="w-[250px] mx-5"
                    fieldChecked={{value:masterData.forms[formSectionKey].managedBy._isMcq}}
                    fieldDisabled={masterData.forms[formSectionKey].managedBy._isDisabled}
                    />
                    
                    :


                    <Field
                    control="radio"
                    fieldName={`${formSectionKey}.managedBy._isMcq`}
                    fieldLabel="isMcq"
                    fieldOptions={[{label:"Yes", value:true}, {label:"No", value:false}]}
                    fieldClass="w-[250px] mx-5"
                    fieldChecked={{value:masterData.forms[formSectionKey].managedBy._isMcq}}
                    />
                    
                    
                }
            </div>

            <Field
                control="select"
                fieldName={`${formSectionKey}.screeningType`}
                fieldLabel="Screening Type"
                fieldOptions={[{label:"Pre Interview", value:0}, {label:"Post Interview", value:1}]}
                fieldClass="w-[500px]"
            />

            <Field
                control="input"
                fieldName={`${formSectionKey}.totalQuestions`}
                fieldType="number"
                fieldLabel="Total Number Of Question"
                fieldErrorMsg="Value must be an positive number"
                fieldPattern="^[0-9]\d*"
                fieldClass="w-[500px]"
                allowDebounce={true}
            />


            <TabSwitch
                formSectionData={masterData.forms[formSectionKey]}
                tabs={[
                { label: "Random Questions", value: <RandomQuestions formSectionKey={formSectionKey}  /> },
                { label: "Predefined Questions", value: <PredefinedQuestions formSectionKey={formSectionKey} /> },
                ]}
            />

        </div>
    );
};

export default CandidateTestSection;
