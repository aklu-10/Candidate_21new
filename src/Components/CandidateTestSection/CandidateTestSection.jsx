import React from "react";
import Field from '../Field/Field';
import TabSwitch from '../TabSwitch/TabSwitch';
import RandomQuestions from "../RandomQuestions/RandomQuestions";
import PredefinedQuestions from "../PredefinedQuestions/PredefinedQuestions";
import FormContext from "../../context/FormContext";
import Button from "../Button/Button";
import { useContext } from "react";

const CandidateTestSection = ({formSectionKey}) => {
    
    const {masterData, setMasterData} = useContext(FormContext);

    let testTypeOptions = [
            { label: 'coding', value: 'coding' },
            { label: 'screening', value: 'screening' }
        ]

    console.log("Candidate Section")

    return (
        <div>
            <div className="flex">
                <Field
                control="input"
                fieldName={`${formSectionKey}.testName`}
                fieldType="text"
                fieldLabel="Test Name"
                fieldPlaceHolder="Type test name"
                fieldErrorMsg="Error Message"
                fieldClass="w-[500px]"
                />

                <span className="text-green-600/100 text-xl">&#8853;</span>
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
                />

                <Field
                control="radio"
                fieldName={`${formSectionKey}.managedBy._isMcq`}
                fieldLabel="isMcq"
                fieldOptions={[{label:"Yes", value:true}, {label:"No", value:false}]}
                fieldClass="w-[250px] mx-5"
                />
            </div>

            <Field
                control="select"
                fieldName={`${formSectionKey}.screeningType`}
                fieldLabel="Screening Type"
                fieldOptions={["Pre Interview", "Post Interview"]}
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
            />

            <TabSwitch
                totalQuestions={masterData.forms[formSectionKey].totalQuestions}
                tabs={[
                { label: "Random Questions", value: <RandomQuestions formSectionKey={formSectionKey} /> },
                { label: "Predefined Questions", value: <PredefinedQuestions formSectionKey={formSectionKey}/> },
                ]}
            />

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
        </div>
    );
};

export default CandidateTestSection;
