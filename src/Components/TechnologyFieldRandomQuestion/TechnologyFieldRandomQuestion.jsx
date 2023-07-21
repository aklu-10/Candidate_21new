import React, { useRef, useState } from 'react'
import ParticularTechnologyRandomQuestion from '../ParticularTechnologyRandomQuestion/ParticularTechnologyRandomQuestion';

const TechnologyFieldRandomQuestion = ({formSectionKey}) => {


    let testTypeOptions2 = [
        { label: 'Python', value: 'Python' },
        { label: 'Java', value: 'Java' },
        { label: 'React', value: 'React' },
        { label: 'JavaScript', value: 'JavaScript' }
    ]
    
    const [allTechnologyArr, setAllTechnologyArr] = useState([[...testTypeOptions2]]);
    const [selectedTech, setSelectedTech] = useState({});

    function handleAddNewTechField()
    {
        if(allTechnologyArr.length < testTypeOptions2.length)
        {
            let prevTechArr = [...allTechnologyArr.slice(-1)[0]];

            if(Object.keys(selectedTech).length ===0 )
            {
                prevTechArr = prevTechArr.filter(tech=>tech.value!=testTypeOptions2[0].value);
            }
            else{

            }
            prevTechArr = prevTechArr.filter(tech=>tech.value!=selectedTech.value);

            setAllTechnologyArr([...allTechnologyArr, prevTechArr]);
            setSelectedTech(prevTechArr[0]);
        }

    }

    function handleDeleteSpecificField()
    {

    }


    return (
        
        <div>

            {
                allTechnologyArr.map((technologies, index)=>(
                    <ParticularTechnologyRandomQuestion key={index} options={technologies} formSectionKey={formSectionKey} handleAddNewTechField={handleAddNewTechField} setSelectedTech={setSelectedTech} name={"technology"+(index+1)}/>
                ))
            }

        </div>
        
    )
}

export default TechnologyFieldRandomQuestion