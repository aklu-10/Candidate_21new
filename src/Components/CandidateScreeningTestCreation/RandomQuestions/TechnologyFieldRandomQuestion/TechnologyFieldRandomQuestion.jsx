import React, { useContext, useEffect, useState } from 'react'
import ParticularTechnologyRandomQuestion from '../TechnologyFieldRandomQuestion/ParticularTechnologyRandomQuestion';
import FormContext from '../../../../context/FormContext';
import { TabContext } from '../../CandidateTestSection';
import { toast } from 'react-toastify';

const TechnologyFieldRandomQuestion = ({formSectionKey}) => {

    const {masterData, setMasterData, setIsFormValid} = useContext(FormContext);

    let testTypeOptions2 = [
        { label: 'Python', value: 'Python' },
        { label: 'Java', value: 'Java' },
        { label: 'React', value: 'React' },
        { label: 'JavaScript', value: 'JavaScript' }
    ]
    
    const {allTechnologyObj, setAllTechnologyObj} = useContext(TabContext)

    const [loader, setLoader] = useState(false);

    function handleAddNewTechField()
    {
        if(Object.keys(allTechnologyObj).length != testTypeOptions2.length)
        {

            let index = Number(Object.keys(allTechnologyObj).slice(-1)[0].slice(-1))
            let nextFilteredArr = allTechnologyObj["technology"+index].technologies.filter(tech=>tech.value!==allTechnologyObj["technology"+index].selected.value);
            let baseData = {
                ["technology"+(index+1)]:{
                    technologies:nextFilteredArr,
                    selected:nextFilteredArr[0]
                }            
            }

            setAllTechnologyObj((prev)=>({...prev,  ...baseData }))
        }
    }

    function handleDeleteSpecificField(obj,fieldName)
    {   
        setLoader(true);

        let deleteSelect = obj[fieldName];
        let upperKeys=[];
        let res = {};
        for(let i in obj)
        {
            if(i === fieldName)
                    break;
                upperKeys.push(i)
                res={...res,[i]:{...obj[i]}}
        }

        let lowerKeys = Object.keys(obj).filter(key=>!upperKeys.includes(key)).slice(1,)
        
        let replaceArr = deleteSelect.technologies;
        
        lowerKeys.map(key=>{
                let temp = obj[key].technologies;
                obj[key].technologies = replaceArr;
                replaceArr = temp;
                res={...res, [key]:{...obj[key]}}
            })
        
        setAllTechnologyObj(res)
        
        let copyData= {...masterData}

        Object.keys(copyData.forms[formSectionKey].randomQuestions.technology).map(techName=>
            {
            if(fieldName === techName){
                delete copyData.forms[formSectionKey].randomQuestions.technology[techName]
            }
            else{
                copyData.forms[formSectionKey].randomQuestions.technology[techName].name = res[techName].selected.value
            }
        })

        setMasterData(copyData)

        let total = Object.keys(masterData.forms[formSectionKey].randomQuestions.technology).map(techName=>{
                    
            if(techName === name)
                return Number(e.target.value)
            return Number(masterData.forms[formSectionKey].randomQuestions.technology[techName]?.mcq ?? 0)
        })

        if((total.reduce((acc, item)=>acc+item)) === Number(masterData.forms[formSectionKey].randomQuestions.totalQuestions))
        {
            setIsFormValid(true)
        }
        else{
            toast.error("Total must equal to provided random questions")
            setIsFormValid(false)
        }

        setTimeout(()=>setLoader(false),10);

    }



    return (
        
        <div>

            {
                Object.keys(allTechnologyObj).map((technology, index)=>(
                    <ParticularTechnologyRandomQuestion key={index} index={index} options={allTechnologyObj[technology].technologies} formSectionKey={formSectionKey} handleAddNewTechField={handleAddNewTechField} name={technology} allTechnologyObj={allTechnologyObj} initialData={testTypeOptions2} setAllTechnologyObj={setAllTechnologyObj} handleDeleteSpecificField={handleDeleteSpecificField} loader={loader}/>
                ))
            }

        </div>
        
    )
}

export default TechnologyFieldRandomQuestion