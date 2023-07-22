import React, { useContext } from 'react'
import Field from '../Field/Field'
import { memo } from 'react'
import FormContext from '../../context/FormContext'
import TechnologyFieldRandomQuestion from '../TechnologyFieldRandomQuestion/TechnologyFieldRandomQuestion'
import { toast } from 'react-toastify'

const RandomQuestions = ({formSectionKey}) => {

    const {masterData, setMasterData} = useContext(FormContext);

    // console.log(masterData.forms[formSectionKey].randomQuestions.totalQuestions)

    return (

        <div>
            <Field
                control="input"
                fieldName={`${formSectionKey}.randomQuestions.totalQuestions`}
                fieldValue={masterData.forms[formSectionKey].randomQuestions.totalQuestions}
                fieldType="text"
                fieldLabel="Random Questions"
                fieldErrorMsg="Value must be an positive number"
                fieldPattern="^[0-9]\d*"
                fieldClass="w-[500px]"
                fieldPlaceHolder="Random Questions"
                // allowDebounce={true}
            />

            {
                masterData.forms[formSectionKey].randomQuestions.totalQuestions &&

                Number(masterData.forms[formSectionKey].randomQuestions.totalQuestions) > 0 && 

                (Number(masterData.forms[formSectionKey].randomQuestions.totalQuestions)) <= Number(masterData.forms[formSectionKey].totalQuestions) &&

                <TechnologyFieldRandomQuestion formSectionKey={formSectionKey}/>
            }


        </div>

    )
}

export default memo(RandomQuestions)