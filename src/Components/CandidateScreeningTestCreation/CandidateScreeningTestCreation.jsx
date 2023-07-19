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
            _isValid:false
    });

    

    function handleSubmit(e)
    {
        e.preventDefault();
        console.log(masterData)
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
                <form onSubmit={handleSubmit}>
                    
                    {
                        Object.keys(masterData.forms).map((formSectionKey, index)=>(

                            <CandidateTestSection key={index} formSectionKey={formSectionKey}/>
                        ))
                    }

                    <div>
                        <Button
                            btnClass={
                                !masterData._isValid
                                ? "rounded bg-blue-600 text-white p-2 mr-[20px]"
                                : "rounded bg-gray-600 text-white p-2 mr-[20px]"
                            }
                            isBtnDisabled={masterData._isValid}
                            btnType="submit"
                        >
                        Submit Candidate Test
                        </Button>

                        <Button
                            btnClass={"rounded bg-gray-600 text-white p-2"}
                            isBtnDisabled={masterData._isValid}
                            btnType="button"
                        >
                            Final Submit
                        </Button>
                    </div>

                </form>
            </FormContext.Provider>
        </>

    )
}

export default memo(CandidateScreeningTestCreation);