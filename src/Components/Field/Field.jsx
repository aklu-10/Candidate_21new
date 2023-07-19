import React, {memo} from 'react'
import Input from '../Input/Input';
import SelectLib from '../SelectLib/SelectLib';
import Select from '../Select/Select';
import Radio from '../Radio/Radio';
import CheckBox from '../Checkbox/CheckBox';

const Field = ({control, ...props}) => {

    switch(control)
    {
        case 'input':
            return <Input {...props}/>;
        
        case 'selectlib':
            return <SelectLib {...props}/>
        
        case 'select':
            return <Select {...props}/>
        
        case 'radio':
            return <Radio {...props}/>

        case 'checkbox':
            return <CheckBox {...props}/>

        default:
            return;
    }

}

export default memo(Field)