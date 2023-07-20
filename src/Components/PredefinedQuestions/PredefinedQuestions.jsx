import React, { memo, useRef, useState } from 'react'
import Field from '../Field/Field'
import FormContext from '../../context/FormContext';
import Button from '../Button/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useContext } from 'react';
import AddNewQuestion from '../AddNewQuestion/AddNewQuestion';
import { toast } from 'react-toastify';
import axios from 'axios';


const columns = [
    { field: 'title', headerName: 'Question Title', width: 400 },
    { field: 'level', headerName: 'Question Level', width: 200 },
    { field: 'technology', headerName: 'Technology', width: 200 },
    {
    field: 'questionType',
    headerName: 'Question Type',
    width: 350,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
];

const rows = [
    // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const PredefinedQuestions = ({formSectionKey}) => {

    const {masterData, setMasterData} = useContext(FormContext);

    const [showAddNewForm, setShowAddNewForm] = useState(false);

    let techSelectRef = useRef(null);
    let quesTypeSelectRef = useRef(null);

    //table rows
    const [rows, setRows] = useState([]);

    let testTypeOptions = [
        { label: 'Python', value: 'Python' },
        { label: 'java', value: 'java' },
        { label: 'php', value: 'php' }
    ]

    let testTypeOptions2 = [
        { label: 'mcq', value: 'mcq' },
        { label: 'programming', value: 'programming' },
        { label: 'descriptive', value: 'descriptive' }
    ]

    // function handleInputChange(e)
    // {
    //     let totalPredefined = Number(e.target.value);
    //     let totalRandom = Number(formData.randomQuestions.totalQuestions);

    //     if(totalPredefined+totalRandom > formData.totalQuestions)
    //         toast.error("Value exceeded from the provided value.") 
    // }

    function fetchTechQueryBaseData()
    {
        let techArr = masterData.forms[formSectionKey].predefinedQuestions.technology.map(tech=>tech.value);
        let quesArr = masterData.forms[formSectionKey].predefinedQuestions.questionType;
        if(!techArr.length || !quesArr.length)
            toast.error("Please provide required technology or question type")
        else
        {
            let apiArr = [];

            techArr.map(tech=>(
                apiArr.push(axios.get("http://localhost:3000/"+tech))
            ))

            Promise.all(apiArr)
            .then((res)=>{
                let result = [];
                res.map(({data})=>(
                    result = [...result, ...data]
                ))

                setRows(result.map((question, index)=>(
                        
                        {
                            id:index,
                            title:question.question,
                            level:1,
                            technology:'Technology'
                        }
                    )))
            })
            .catch(console.log)


            // axios.get("http://localhost:3000/allQuestions")
            // .then(({data})=>
            // {
            //     let baseData = [];
            //     Object.keys(data).filter(tech=>(
            //         techArr.includes(tech)
            //     )).map(tech=>(
            //         baseData= [...baseData, ...data[tech]]
            //     ))

            //     setRows([...baseData.map((eachRow, index)=>{
            //         return {
            //             id:index,
            //             title:eachRow.question,
            //             level:1,
            //             technology:'Python'
            //         }
            //     })]);

            // })
            // .catch(console.log)
        }
        
    }

    function handleClearFields()
    {
        techSelectRef.current.clearValue()
        quesTypeSelectRef.current.clearValue()
        setRows([]);
    }

    function handleAddNewForm()
    {
        setShowAddNewForm(true)
    }

    return (
        <div className='relative'>

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


            <div className='flex justify-between items-center '>

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
                    btnClass='rounded bg-blue-600 w-[80px] text-white p-2 mr-[2px] mt-[35px]'
                    onClick={fetchTechQueryBaseData}
                >
                    Search
                </Button>
                <Button
                    btnClass='rounded bg-blue-600 w-[80px] text-white p-2 mr-[2px] mt-[35px]'
                    onClick={handleClearFields}
                >
                    Clear
                </Button>
                <Button
                    btnClass='rounded bg-blue-600 text-white p-2 mr-[2px] mt-[35px]'
                    onClick={handleAddNewForm}
                >
                    Add New Question
                </Button>
                
            </div>


            <div className='h-[400px] my-5'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
                

            {
                (showAddNewForm) && 

                <AddNewQuestion setShowAddNewForm={setShowAddNewForm} testTypeOptions={testTypeOptions}/>
                
            }

        </div>
    )
}

export default memo(PredefinedQuestions)