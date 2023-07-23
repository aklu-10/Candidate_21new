import CandidateTestSection from './CandidateTestSection';
import FormContext from '../../context/FormContext';
import Button from '../Button/Button';
import React, { useState, memo, useRef } from 'react'
import {candidateTestSectionBaseData} from '../../data/candidateTestSectionBaseData';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CandidateScreeningTestCreation = () => {

    console.log("Candidate Parent")

    const formIndex = useRef(1);
    const [loader, setLoader] = useState(false);


    // base structure - { form1: { form1_Data }, form2: { form2_Data }, ... }
    const [masterData, setMasterData] = useState({ 

            forms:{
                ["form"+formIndex.current]:{...candidateTestSectionBaseData},
            },
    });
    const [isFormValid, setIsFormValid] = useState(false);

    // loader var=false, bool, setTimeout, loader component


    function handleSubmit(e)
    {
        e.preventDefault();

        console.log(masterData)

        if(isFormValid)
        {
            let result = Object.keys(masterData.forms).map(form=>{
                
                return {
                            test_type_key: masterData.forms[form].testType,
                            test_name: masterData.forms[form].testName,
                            is_screening_test: masterData.forms[form].screeningType,
                            is_for_agent_panel: masterData.forms[form].managedBy.name==="Agent"?true:false,
                            is_mcq: masterData.forms[form].managedBy._isMcq,
                            no_of_predefined_questions: masterData.forms[form].predefinedQuestions.totalQuestions,
                            total_no_question: masterData.forms[form].totalQuestions,
                            predefined_questions: {
                            no_of_predefined_questions: "",
                            already_selected_question: [...masterData.forms[form].predefinedQuestions.selectedQuestion],
                            newly_created_questions: []
                            },
                            random_questions: {
                            no_of_random_question: masterData.forms[form].randomQuestions.totalQuestions,
                            technologies:
                                Object.keys(masterData.forms[form].randomQuestions.technology).map((tech)=>{
                                        console.log(tech)
                                        return {
                                            technology_key: masterData.forms[form].randomQuestions.technology[tech].name,
                                            question_type_details:{
                                                mcq:masterData.forms[form].randomQuestions.technology[tech].mcq ?? 0,
                                                programming: masterData.forms[form].randomQuestions.technology[tech].programming ?? 0,
                                                descriptive: masterData.forms[form].randomQuestions.technology[tech].descriptive ?? 0
                                            }
                                        }
                                })
                            }}

                })

            console.log(result);
        }
    }

    function handleDeleteForm(formName)
    {
        let copyMaster = {...masterData};
        delete masterData.forms[formName]
        setMasterData(copyMaster);
        setLoader(true);
        setTimeout(()=>{
            setLoader(false)
        },5)
    }

    return (

        <>

            <ToastContainer
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <FormContext.Provider value={{masterData, setMasterData, formIndex, setIsFormValid}}>
                <div>
                    
                    {
                        Object.keys(masterData.forms).map((formSectionKey, index)=>(

                            loader ? <p>Loading...</p> :
                            <CandidateTestSection key={index} formSectionKey={formSectionKey} handleDeleteForm={handleDeleteForm}/>
                        ))
                    }

                    <div>
                        <Button
                            btnClass={
                                isFormValid
                                ? "rounded bg-blue-600 text-white p-2 mr-[20px]"
                                : "rounded bg-gray-600 text-white p-2 mr-[20px]"
                            }
                            isBtnDisabled={isFormValid}
                            onClick={(e)=>{handleSubmit(e), alert("date is logged")}}
                        >
                        Submit Candidate Test
                        </Button>

                        <Button
                            btnClass={"rounded bg-gray-600 text-white p-2"}
                            btnType="button"
                            onClick={()=>alert("Final Submission")}
                        >
                            Final Submit
                        </Button>
                    </div>

                </div>
            </FormContext.Provider>
        </>

    )
}

export default memo(CandidateScreeningTestCreation);