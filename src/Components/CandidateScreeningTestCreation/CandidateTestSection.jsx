import Field from '../Form/Field';
import TabSwitch from '../TabSwitch/TabSwitch';
import RandomQuestions from '../CandidateScreeningTestCreation/RandomQuestions/RandomQuestions';
import PredefinedQuestions from '../CandidateScreeningTestCreation/PredefinedQuestions/PredefinedQuestions';
import FormContext from "../../context/FormContext";
import { createContext, memo, useContext, useState } from "react";
import { candidateTestSectionBaseData } from "../../data/candidateTestSectionBaseData";

export let TabContext = createContext({})

let testTypeOptions2 = [
    { label: 'Python', value: 'Python' },
    { label: 'Java', value: 'Java' },
    { label: 'React', value: 'React' },
    { label: 'JavaScript', value: 'JavaScript' }
]

const CandidateTestSection = ({formSectionKey, handleDeleteForm}) => {
    
    const {masterData, setMasterData, formIndex} = useContext(FormContext);

    const [allTechnologyObj, setAllTechnologyObj] = useState({ technology1 : { technologies:[...testTypeOptions2], selected:testTypeOptions2[0] }});


    let testTypeOptions = [
            { label: 'coding', value: 'coding' },
            { label: 'screening', value: 'screening' }
        ]

    console.log("Candidate Section")

    function handleAddNewFormSection()
    {
        setMasterData((prev)=>({...prev, forms:{ ...prev.forms, ["form"+(formIndex.current+1)] : {...candidateTestSectionBaseData}}}))
        formIndex.current++;
    }

    return (
        <div className='mb-[20px] border-gray-500 border-b-[1px] pb-[25px]'>
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

                <span className="text-white bg-[#262c77] flex items-center justify-center text-xl mt-[40px] rounded-md ml-[20px] w-[35px] h-[35px] cursor-pointer shadow-[1px_1px_2px_black,-1px_-1px_2px_rgba(255,255,255,.2)] " onClick={handleAddNewFormSection}>+</span>

                {
                    formSectionKey!=='form1' &&
                <span className="text-white bg-[#262c77] flex items-center justify-center text-xl mt-[40px] rounded-md ml-[20px] w-[35px] h-[35px] cursor-pointer shadow-[1px_1px_2px_black,-1px_-1px_2px_rgba(255,255,255,.2)] " onClick={()=>handleDeleteForm(formSectionKey)}>-</span>
                }


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
                    onClick={"true"}
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
                fieldValue={masterData.forms[formSectionKey].totalQuestions}
                // allowDebounce={true}
            />

            <TabContext.Provider value={{allTechnologyObj, setAllTechnologyObj}}>
            {
                masterData.forms[formSectionKey].testName &&   
                <TabSwitch
                    formSectionData={masterData.forms[formSectionKey]}
                    tabs={[
                    { label: "Random Questions", value: <RandomQuestions formSectionKey={formSectionKey}  /> },
                    { label: "Predefined Questions", value: <PredefinedQuestions formSectionKey={formSectionKey} /> },
                    ]}
                />
            }
            </TabContext.Provider>



        </div>
    );
};

export default memo(CandidateTestSection);
