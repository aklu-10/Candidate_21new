import React, { memo, useState } from 'react'
import Field from '../Field/Field'
import FormContext from '../../context/FormContext';
import Button from '../Button/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Label from '../Label/Label';
import AddNewQuestion from '../AddNewQuestion/AddNewQuestion';
// import { DataGrid } from '@mui/x-data-grid';


const columns = [
    { field: 'id', headerName: 'Question Title', width: 350 },
    { field: 'firstName', headerName: 'Question Level', width: 200 },
    { field: 'lastName', headerName: 'Technology', width: 200 },
    {
    field: 'age',
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

    let testTypeOptions = [
        { label: 'coding', value: 'coding' },
        { label: 'screening', value: 'screening' }
    ]

    // function handleInputChange(e)
    // {
    //     let totalPredefined = Number(e.target.value);
    //     let totalRandom = Number(formData.randomQuestions.totalQuestions);

    //     if(totalPredefined+totalRandom > formData.totalQuestions)
    //         toast.error("Value exceeded from the provided value.") 
    // }

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
                fieldLabel="Total No. of Predefined Question"
                fieldPlaceHolder="Predefined Question"
                fieldErrorMsg="Error Message"
                fieldClass="w-[500px]"
            />


            <div className='flex justify-between items-center '>

                <Field
                    control="selectlib"
                    fieldName={`${formSectionKey}.predefinedQuestions.technology`}
                    fieldLabel="Technology"
                    fieldPlaceHolder="Technology"
                    fieldOptions={testTypeOptions}
                    fieldClass="w-[400px]"
                />



                <Field
                    control="selectlib"
                    fieldName={`${formSectionKey}.predefinedQuestions.questionType`}
                    fieldLabel="Question Type"
                    fieldPlaceHolder="Question Type"
                    fieldOptions={testTypeOptions}
                    fieldClass="w-[400px]"
                />
                
                <Button
                    btnClass='rounded bg-blue-600 w-[80px] text-white p-2 mr-[2px] mt-[35px]'
                >
                    Search
                </Button>
                <Button
                    btnClass='rounded bg-blue-600 w-[80px] text-white p-2 mr-[2px] mt-[35px]'
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

                <AddNewQuestion setShowAddNewForm={setShowAddNewForm}/>
                
            }

        </div>
    )
}

export default memo(PredefinedQuestions)