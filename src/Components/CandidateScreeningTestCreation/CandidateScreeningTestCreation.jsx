import FormContext from '../../context/FormContext';
import CandidateTestSection from '../CandidateTestSection/CandidateTestSection';
import { ToastContainer } from 'react-toastify';
import {candidateTestSectionBaseData} from '../../data/candidateTestSectionBaseData';
import React, { useState, memo } from 'react'

const CandidateScreeningTestCreation = () => {

    console.log("Candidate Parent")

    // base structure - { form1: { form1_Data }, form2: { form2_Data } }
    const [masterData, setMasterData] = useState({ 

            forms:{
                form1:{...candidateTestSectionBaseData}
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

            <FormContext.Provider value={{masterData, setMasterData}}>
                <form onSubmit={handleSubmit}>
                    
                    {
                        Object.keys(masterData.forms).map((formSectionKey, index)=>(

                            <CandidateTestSection key={index} formSectionKey={formSectionKey}/>
                        ))
                    }

                </form>
            </FormContext.Provider>
        </>

    )
}

export default memo(CandidateScreeningTestCreation);