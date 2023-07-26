    import React, { memo, useRef, useState } from "react";
    import Field from '../../Form/Field';
    import FormContext from '../../../context/FormContext';
    import Button from '../../Button/Button'
    import { DataGrid } from "@mui/x-data-grid";
    import { useContext } from "react";
    import AddNewQuestion from '../PredefinedQuestions/AddNewQuestion/AddNewQuestion';
    import { toast } from "react-toastify";
    import axios from "axios";

    const columns = [
    { field: "title", headerName: "Question Title", width: 400 },
    { field: "level", headerName: "Question Level", width: 200 },
    { field: "technology", headerName: "Technology", width: 200 },
    {
        field: "questionType",
        headerName: "Question Type",
        width: 350,
    },
    ];

    const PredefinedQuestions = ({ formSectionKey }) => {
    const { masterData, setMasterData, setIsFormValid } = useContext(FormContext);

    const [showAddNewForm, setShowAddNewForm] = useState(false);

    let techSelectRef = useRef(null);
    let quesTypeSelectRef = useRef(null);

    //table rows
    const [rows, setRows] = useState([]);

    const [tableLoader, setTableLoader] = useState(false)

    let testTypeOptions = [
        { label: "Python", value: "Python" },
        { label: "java", value: "java" },
        { label: "php", value: "php" },
    ];

    let testTypeOptions2 = [
        { label: "mcq", value: "mcq" },
        { label: "programming", value: "programming" },
        { label: "descriptive", value: "descriptive" },
    ];

    function fetchTechQueryBaseData(tableFeeder) {

        setIsFormValid(false);

        let techArr = masterData.forms[
        formSectionKey
        ].predefinedQuestions.technology.map((tech) => tech.value);

        let quesArr =
        masterData.forms[formSectionKey].predefinedQuestions.questionType;

        if (!techArr.length || !quesArr.length)
        toast.error("Please provide required technology or question type");
        else {
        let apiArr = [];

        techArr.map((tech) =>
            apiArr.push(axios.get("http://localhost:8080/" + tech))
        );

        Promise.all(apiArr)
            .then((res) => {
                setTableLoader(true)
            let result = [];

            res.map(({ data }) => (result = [...result, ...data]));

            let questionTypeArr = [];
            questionTypeArr = quesArr.map(quesType=>quesType.value)

            if(questionTypeArr.includes("mcq"))
            {
                result = result.filter(question=>(
                    questionTypeArr.includes(question?.questionType?.toLowerCase() ?? "mcq")
                ))
            }
            else
            {
                result = result.filter(question=>(
                    (question.questionType) &&
                    questionTypeArr.includes(question.questionType.toLowerCase())
                ))
            }


            let allData = result.map((question, index) => ({
                id: index,
                title: question.question,
                level: 1,
                questionType:question?.questionType ?? "Mcq",
                technology:question?.technology ?? "Technology"
            }));

            
            setTableLoader(false);
            tableFeeder(allData.reverse());


            })
            .catch(err=>{

                setTableLoader(false);
                throw new Error(err.message);
            });
        }
    }

    function handleClearFields() {
        techSelectRef.current.clearValue();
        quesTypeSelectRef.current.clearValue();
        setRows([]);
    }

    function handleAddNewForm() {
        setShowAddNewForm(true);
    }

    function setSelectedQuestion(val) {
        
        if(Array.isArray(val))
        {
            if(val.length !== Number(masterData.forms[formSectionKey].predefinedQuestions.totalQuestions))
            {
                setIsFormValid(false);
            }
            else{
                setIsFormValid(true);
            }


        }
        else
        {

            let allSelectedVal =
            [...masterData.forms[formSectionKey].predefinedQuestions.selectedQuestion, val.id];

            if(allSelectedVal.length !== Number(masterData.forms[formSectionKey].predefinedQuestions.totalQuestions))
            {
                setIsFormValid(false);
            }
            else{
                setIsFormValid(true);
            }

            if (allSelectedVal.includes(val.id))
            {
            allSelectedVal = [
                ...masterData.forms[formSectionKey].predefinedQuestions
                .selectedQuestion,
            ];
            let ind = allSelectedVal.indexOf(val.id);
            allSelectedVal.splice(ind, 1);
            setMasterData((prev) => ({
                ...prev,
                forms: {
                ...prev.forms,
                [formSectionKey]: {
                    ...prev.forms[formSectionKey],
                    predefinedQuestions: {
                    ...prev.forms[formSectionKey].predefinedQuestions,
                    selectedQuestion: allSelectedVal,
                    },
                },
                },
            }));
            } else {
            setMasterData((prev) => ({
                ...prev,
                forms: {
                ...prev.forms,
                [formSectionKey]: {
                    ...prev.forms[formSectionKey],
                    predefinedQuestions: {
                    ...prev.forms[formSectionKey].predefinedQuestions,
                    selectedQuestion: [
                        ...prev.forms[formSectionKey].predefinedQuestions
                        .selectedQuestion,
                        val.id,
                    ],
                    },
                },
                },
            }));
            }
        }

    }

    function showError(msg)
    {
        toast.info(msg);
    }

    return (
        <div className="relative">
        
        {
            (Number(masterData.forms[formSectionKey].randomQuestions.totalQuestions) < Number(masterData.forms[formSectionKey].totalQuestions)) &&
            <Field
            control="input"
            fieldName={`${formSectionKey}.predefinedQuestions.totalQuestions`}
            fieldType="number"
            fieldValue={`${masterData.forms[formSectionKey].predefinedQuestions.totalQuestions}`}
            fieldLabel="Total No. of Predefined Question"
            fieldPlaceHolder="Predefined Question"
            fieldErrorMsg="Error Message"
            fieldClass="w-[500px]"
        /> 
        }

        {
            
            masterData.forms[formSectionKey].predefinedQuestions.totalQuestions!='' && 
            (Number(masterData.forms[formSectionKey].predefinedQuestions.totalQuestions) > 0) && ( (Number(masterData.forms[formSectionKey].predefinedQuestions.totalQuestions) === Number(masterData.forms[formSectionKey].totalQuestions) && Number(masterData.forms[formSectionKey].randomQuestions.totalQuestions)===0  ) || (Number(masterData.forms[formSectionKey].predefinedQuestions.totalQuestions) + Number(masterData.forms[formSectionKey].randomQuestions.totalQuestions)) === Number(masterData.forms[formSectionKey].totalQuestions)   ) ?
        (
            <>
            <div className="flex justify-between items-center ">
                <Field
                control="selectlib"
                innerRef={techSelectRef}
                fieldName={`${formSectionKey}.predefinedQuestions.technology`}
                fieldLabel="Technology"
                fieldPlaceHolder="Technology"
                fieldOptions={testTypeOptions}
                fieldClass="w-[400px] z-10"
                />

                <Field
                control="selectlib"
                fieldName={`${formSectionKey}.predefinedQuestions.questionType`}
                innerRef={quesTypeSelectRef}
                fieldLabel="Question Type"
                fieldPlaceHolder="Question Type"
                fieldOptions={testTypeOptions2}
                fieldClass="w-[400px] z-[10]"
                />

                <Button
                btnClass="rounded bg-blue-600 w-[80px] text-white p-2 mr-[2px] mt-[35px]"
                onClick={()=>fetchTechQueryBaseData(setRows)}
                >
                Search
                </Button>
                <Button
                btnClass="rounded bg-blue-600 w-[80px] text-white p-2 mr-[2px] mt-[35px]"
                onClick={handleClearFields}
                >
                Clear
                </Button>
                <Button
                btnClass="rounded bg-blue-600 text-white p-2 mr-[2px] mt-[35px]"
                onClick={handleAddNewForm}
                >
                Add New Question
                </Button>
            </div>

            {
                tableLoader 
                
                ?
                
                <p className="h-[400px]">loading...</p> 
                
                :
                
                <div className="h-[400px] my-5">
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    sx={{
                        boxShadow: 4,
                        border: 2,
                        color:'white',
                        borderColor: '#151a4c',
                        '& .MuiDataGrid-cell:hover': {
                        color: 'primary',
                        },
                        '& .MuiToolbar-root': {
                            color: 'white',
                        }, 
                        '& .MuiSvgIcon-root':{
                            color: 'white'
                        },
                        '& .MuiDataGrid-overlay':{
                            background: 'white',
                            color: 'black'
                        }, 
                        '& .css-yrdy0g-MuiDataGrid-columnHeaderRow':{
                            background:'#151a4c'
                        }
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    onCellClick={setSelectedQuestion}
                    onRowSelectionModelChange={setSelectedQuestion}
                    />
                </div>

            }

            {showAddNewForm && (
                <AddNewQuestion
                setShowAddNewForm={setShowAddNewForm}
                testTypeOptions={testTypeOptions}
                setRows={setRows}
                fetchTechQueryBaseData={fetchTechQueryBaseData}
                setTableLoader={setTableLoader}
                />
            )}
            </>
        ) 
        
            : !masterData.forms[formSectionKey].predefinedQuestions.totalQuestions && masterData.forms[formSectionKey].randomQuestions.totalQuestions!==masterData.forms[formSectionKey].totalQuestions && ((masterData.forms[formSectionKey].randomQuestions.totalQuestions) < masterData.forms[formSectionKey].totalQuestions) && showError("Please provide a value.")
        }
        </div>
    );
    };

    export default memo(PredefinedQuestions);
