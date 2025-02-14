import CTA from '@/components/custom/utils/CTA'
import SEO from '@/components/custom/utils/SEO'
import React from 'react'

const Home: React.FC = () => {
    return (
        <>
            {/* Seo compoments */}
            <SEO
                title='Welcome to devisMaster - Your Trusted devis calculator'
                description='calculate your estimate devis quickly with our app !'
            />

            {/* App Comoments */}
            <div className='container py-10 md:py-24 lg:py-36 flex items-center justify-center flex-col gap-4 md:gap-6 lg:gap-10'>
                <h1 className='text-xl md:text-2xl lg:text-4xl font-bold text-center'>
                    Welcome to <span className="text-primary"><span className="text-2xl md:text-3xl lg:text-5xl">D</span></span>evis<span className="text-2xl md:text-3xl lg:text-5xl text-primary">M</span>aster
                </h1>

                <p className='text-center text-foreground/80'>
                    Do you need a quickly estimate devis for your projet ? <br/> let's jump to calculate it !
                </p>

                <CTA url='/new-projet'/>
            </div>
        </>
    )
}

export default Home
