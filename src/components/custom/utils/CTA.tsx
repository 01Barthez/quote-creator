// CTA Button of the application 

import React from 'react'
import { Button } from '@/components/ui/button';
import { useNavigate } from "react-router";
import type { ICTA } from '@/interface/interface';

const CTA: React.FC<ICTA> = ({name="Create Projet", url}) => {
    let navigate = useNavigate();

    return (
        <Button
            variant={'outline'}
                className='w-fit border-primary/80 py-5 px-4 md:px-6 backdrop-blur-md bg-primary hover:bg-primary/85 text-primary-foreground hover:text-primary-foreground font-semibold'
            onClick={() => { navigate(`${url}`) }}
        >
            {name}
        </Button>
    )
}


export default CTA
