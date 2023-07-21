import FormContext from '../../context/FormContext';
import CandidateTestSection from '../CandidateTestSection/CandidateTestSection';
import Button from '../Button/Button';
import { ToastContainer } from 'react-toastify';
import {candidateTestSectionBaseData} from '../../data/candidateTestSectionBaseData';
import React, { useState, memo, useRef } from 'react'

const CandidateScreeningTestCreation = () => {

    console.log("Candidate Parent")

    const formIndex = useRef(1);

    // base structure - { form1: { form1_Data }, form2: { form2_Data } }
    const [masterData, setMasterData] = useState({ 

            forms:{
                ["form"+formIndex.current]:{...candidateTestSectionBaseData},
            },
            _isValid:true
    });
    // loader var=false, bool, setTimeout, loader component
    

    function handleSubmit(e)
    {
        e.preventDefault();

        if(masterData._isValid)
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
                                Object.keys(masterData.forms[form].randomQuestions.technology).map(({name, mcq, programming, descriptive})=>{
                                        return {
                                            technology_key: name,
                                            question_type_details:{
                                                mcq,
                                                programming,
                                                descriptive
                                            }
                                        }
                                })
                            }}

                })

            console.log(result);
        }
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

            <FormContext.Provider value={{masterData, setMasterData, formIndex}}>
                <div>
                    
                    {
                        Object.keys(masterData.forms).map((formSectionKey, index)=>(

                            <CandidateTestSection key={index} formSectionKey={formSectionKey}/>
                        ))
                    }

                    <div>
                        <Button
                            btnClass={
                                masterData._isValid
                                ? "rounded bg-blue-600 text-white p-2 mr-[20px]"
                                : "rounded bg-gray-600 text-white p-2 mr-[20px]"
                            }
                            isBtnDisabled={masterData._isValid}
                            onClick={handleSubmit}
                        >
                        Submit Candidate Test
                        </Button>

                        <Button
                            btnClass={"rounded bg-gray-600 text-white p-2"}
                            btnType="button"
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