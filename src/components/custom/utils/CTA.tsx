// CTA Button of the application 

import React from 'react'
import { Button } from '@/components/ui/button';
import { useNavigate } from "react-router";
import type { ICTA } from '@/interface/interface';

const CTA: React.FC<ICTA> = ({name="Shop Now", url}) => {
    let navigate = useNavigate();

    return (
        <Button
            variant={'outline'}
            className='w-fit border-foreground bg-transparent py-5 px-6 md:px-10 backdrop-blur-md'
            onClick={() => { navigate(`${url}`) }}
        >
            {name}
        </Button>
    )
}


export default CTA
