import { AiOutlineArrowRight } from "react-icons/ai"; 
import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreateProjet: React.FC = () => {
    const Navigate = useNavigate();

    const backHome = () => {
        Navigate('/');
    }

    const nextStep = () => {
        console.log("submit");
    }

    return (
        <section className="container">
            <div className="flex flex-col gap-4">
                <h1 className='text-xl md:text-2xl lg:text-4xl font-bold'>
                    <span className="text-primary">C</span>reate a <span className="text-primary">N</span>ew projet
                </h1>

                <p className='text-foreground/80'>
                    You want to create new projet ? <br />
                    Provides required information to achieve it !
                </p>
            </div>

            <div className="pt-24 flex items-center gap-10">
                <Button
                    variant={'outline'}
                    className=''
                    onClick={backHome}
                >
                    <span>Back&nbsp;Home</span>
                </Button>

                <Button 
                    className="px-8 font-semibold"
                    onClick={nextStep}
                >
                    <span>Next</span>
                    <AiOutlineArrowRight />
                </Button>
            </div>
        </section>
    )
}

export default CreateProjet

