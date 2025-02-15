import CTA from '@/components/custom/utils/CTA'
import SEO from '@/components/custom/utils/SEO'
import React from 'react'
import { motion } from 'motion/react';

const Home: React.FC = () => {
    return (
        <>
            {/* Seo compoments */}
            <SEO
                title='Welcome to devisMaster - Your Trusted devis calculator'
                description='calculate your estimate devis quickly with our app !'
            />

            {/* App Comoments */}
            <section className='container py-10 md:py-16 lg:py-20 flex items-center justify-center flex-col gap-4 md:gap-6 lg:gap-10'>
                {/* Title */}
                <motion.h1
                    className='max-w-[100%] md:max-w-[80%] lg:max-w-[70%] text-xl md:text-2xl lg:text-4xl font-bold text-center'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    Welcome to <span className="text-primary"><span className="text-2xl md:text-3xl lg:text-5xl">D</span></span>evis<span className="text-2xl md:text-3xl lg:text-5xl text-primary">M</span>aster
                </motion.h1>

                {/* Short description */}
                <motion.p
                    className='max-w-[100%] md:max-w-[80%] lg:max-w-[70%] text-center text-foreground/80'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .6, delay: 0.2, ease: "easeOut" }}
                >
                    Do you need a quickly estimate devis for your projet ? <br /> let's jump to calculate it !
                </motion.p>

                {/* CTA button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: .5, delay: 0.3, ease: "easeOut" }}
                >
                    <CTA url='/new-projet' />
                </motion.div>
            </section>
        </>
    )
}

export default Home
