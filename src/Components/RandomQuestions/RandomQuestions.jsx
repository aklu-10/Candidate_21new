import React, { useContext } from 'react'
import Field from '../Field/Field'
import { memo } from 'react'
import FormContext from '../../context/FormContext'

const RandomQuestions = ({formSectionKey}) => {

    const {masterData, setMasterData} = useContext(FormContext);

    // console.log(masterData.forms[formSectionKey].randomQuestions.totalQuestions)

    let testTypeOptions2 = [
        { label: 'Python', value: 'Python' },
        { label: 'java', value: 'java' }
    ]

    return (

        <div>
            <Field
                control="input"
                fieldName={`${formSectionKey}.randomQuestions.totalQuestions`}
                fieldValue={`${masterData.forms[formSectionKey].randomQuestions.totalQuestions}`}
                fieldType="text"
                fieldLabel="Random Questions"
                fieldErrorMsg="Value must be an positive number"
                fieldPattern="^[0-9]\d*"
                fieldClass="w-[500px]"
                fieldPlaceHolder="Random Questions"
                // allowDebounce={true}
            />

            <div className='flex items-center'>

                <Field
                    control="select"
                    fieldName={`${formSectionKey}.randomQuestions.technology`}
                    fieldLabel="Technology"
                    fieldOptions={testTypeOptions2}
                    fieldClass="w-[500px]"
                />

                <span className="text-green-600/100 text-xl mt-[40px] ml-[20px] cursor-pointer">&#8853;</span>

            </div>

            
            <div className="flex flex-wrap justify-between">
                <Field
                    control="input"
                    fieldName={`${formSectionKey}.randomQuestions.totalDescriptive`}
                    fieldType="number"
                    fieldLabel="No. of descreptive Questions"
                    fieldErrorMsg="No. Of Descreptive Questions"
                    fieldPattern="^[0-9]\d*"
                    fieldClass="w-[350px]"
                    fieldPlaceHolder="Descreptive Questions"
                />
                <Field
                    control="input"
                    fieldName={`${formSectionKey}.randomQuestions.totalProgramming`}
                    fieldType="number"
                    fieldLabel="No. Of Programming Questions"
                    fieldErrorMsg="No. Of Programming Questions"
                    fieldPattern="^[0-9]\d*"
                    fieldClass="w-[350px]"
                    fieldPlaceHolder="Proframming Questions"
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
                />
            </div>
        </div>

    )
}

export default memo(RandomQuestions)