import React, { useRef, useState } from 'react'
import ParticularTechnologyRandomQuestion from '../ParticularTechnologyRandomQuestion/ParticularTechnologyRandomQuestion';

const TechnologyFieldRandomQuestion = ({formSectionKey}) => {

    let testTypeOptions2 = [
        { label: 'Python', value: 'Python' },
        { label: 'Java', value: 'Java' },
        { label: 'React', value: 'React' },
        { label: 'JavaScript', value: 'JavaScript' }
    ]
    
    const [allTechnologyObj, setAllTechnologyObj] = useState({ technology1 : { technologies:[...testTypeOptions2], selected:testTypeOptions2[0] }});

    function handleAddNewTechField()
    {
        // if(allTechnologyArr.length < testTypeOptions2.length)
        // {
        //     let prevTechArr = [...allTechnologyArr.slice(-1)[0]];

        //     if(Object.keys(selectedTech).length ===0 )
        //     {
        //         prevTechArr = prevTechArr.filter(tech=>tech.value!=testTypeOptions2[0].value);
        //     }
        //     else{
        //         prevTechArr = prevTechArr.filter(tech=>tech.value!=selectedTech.value);

        //     }

        //     setAllTechnologyArr([...allTechnologyArr, prevTechArr]);
        //     setSelectedTech(prevTechArr[0]);
        // }

        if(Object.keys(allTechnologyObj).length != testTypeOptions2.length){

            let index = Object.keys(allTechnologyObj).length
            let nextFilteredArr = allTechnologyObj["technology"+index].technologies.filter(tech=>tech.value!==allTechnologyObj["technology"+index].selected.value);
            let baseData = {
                ["technology"+(index+1)]:{
                    technologies:nextFilteredArr,
                    selected:nextFilteredArr[0]
                }            
            }
    
            console.log(baseData)

            setAllTechnologyObj((prev)=>({...prev,  ...baseData }))
        }


    }

    function handleDeleteSpecificField()
    {

    }


    console.log(allTechnologyObj)

    return (
        
        <div>

            {
                Object.keys(allTechnologyObj).map((technology, index)=>(
                    <ParticularTechnologyRandomQuestion key={index} index={index} options={allTechnologyObj[technology].technologies} formSectionKey={formSectionKey} handleAddNewTechField={handleAddNewTechField} name={technology} allTechnologyObj={allTechnologyObj} initialData={testTypeOptions2} setAllTechnologyObj={setAllTechnologyObj}/>
                ))
            }

        </div>
        
    )
}

export default TechnologyFieldRandomQuestion