import TechnologyFieldRandomQuestion from '../RandomQuestions/TechnologyFieldRandomQuestion/TechnologyFieldRandomQuestion'
import Field from '../../Form/Field';
import FormContext from '../../../context/FormContext';
import React, { useContext } from 'react'
import { memo } from 'react'

const RandomQuestions = ({formSectionKey}) => {

    const {masterData} = useContext(FormContext);

    return (

        <div>
            <Field
                control="input"
                fieldName={`${formSectionKey}.randomQuestions.totalQuestions`}
                fieldValue={masterData.forms[formSectionKey].randomQuestions.totalQuestions}
                fieldType="number"
                fieldLabel="Random Questions"
                fieldErrorMsg="Value must be an positive number"
                fieldPattern="^[0-9]\d*"
                fieldClass="w-[500px]"
                fieldPlaceHolder="Random Questions"
                // allowDebounce={true}
            />

            {
                masterData.forms[formSectionKey].randomQuestions.totalQuestions!=0 &&

                Number(masterData.forms[formSectionKey].randomQuestions.totalQuestions) > 0 && 

                (Number(masterData.forms[formSectionKey].randomQuestions.totalQuestions)) <= Number(masterData.forms[formSectionKey].totalQuestions) &&

                <TechnologyFieldRandomQuestion formSectionKey={formSectionKey}/>
            }


        </div>

    )
}

export default memo(RandomQuestions)