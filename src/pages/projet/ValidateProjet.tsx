import { TiTickOutline } from "react-icons/ti";
import SEO from '@/components/custom/utils/SEO'
import { Button } from '@/components/ui/button'
import { useProjectStore } from '@/stores/projet.store'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from "framer-motion";
import { calculateDuration } from "@/functions/duration";

const ValidateProjet: React.FC = () => {
    const navigate = useNavigate();
    const { project } = useProjectStore();
    const { slug } = useParams();
    const [isPosting, setPosting] = useState<boolean>(false);

    // visualisations logs
    useEffect(() => {
        console.log({
            project,
            "Project Slug": project?.slug,
            "URL Slug": slug,
        });
    }, [project, slug]);
    /* 
        // Redirection avant le rendu si le projet est invalide
        if (!project || project.slug !== slug) {
            console.log("Redirection vers /page-not-found");
            navigate("/page-not-found", { replace: true });
        }
    */

    const submitProject = () => {
        setPosting(true);

        // Post the project to atabase

        navigate(`/succes-creation-projet/${slug}`);
    }

    const totalProjectDuration = useMemo(() => {
        if (!project?.phases?.length) return "0 jour";
    
        // Trouver la date la plus ancienne et la plus récente
        const minStartDate = new Date(Math.min(...project.phases.map(p => new Date(p.startDate).getTime())));
        const maxEndDate = new Date(Math.max(...project.phases.map(p => new Date(p.endDate).getTime())));
    
        return calculateDuration(minStartDate.toISOString(), maxEndDate.toISOString());
    }, [project]);
    

    const totalPhases = useMemo(() => {
        return project?.phases.length ?? 0;
    }, [project]);

    const totalMaterials = useMemo(() => {
        return project?.phases.reduce((acc, phase) => acc + phase.materials.length, 0) ?? 0;
    }, [project]);


    const totalBudget = useMemo(() => {
        return project?.phases.reduce((acc, phase) => {
            return acc + phase.materials.reduce((sum, material) => sum + (1000 * material.quantite), 0);
        }, 0) ?? 0;
    }, [project]);


    return (
        <>
            {/* Seo compoments */}
            <SEO
                title="Validate Projet Creation - DevisMaster"
                description="You have to validate creation of your project on DevisMaster!"
            />

            {/* Section of validation page  */}
            <section className='validation relative container py-10 md:py-16 lg:py-20 space-y-4 md:space-y-6 lg:space-y-10'>
                {/* Title */}
                <motion.h1
                    className='max-w-[100%] md:max-w-[80%] lg:max-w-[70%] text-xl md:text-2xl lg:text-4xl font-bold'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <span className="text-primary">V</span>alidation of <span className="text-primary">n</span>ew project
                </motion.h1>

                {/* Description */}
                <motion.p
                    className='max-w-[100%] md:max-w-[80%] lg:max-w-[70%] text-foreground/80'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .6, delay: 0.2, ease: "easeOut" }}
                >
                    Check informations before process to the creation of the project
                </motion.p>

                {/* projets data */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: .6, delay: 0.2, ease: "easeOut" }}
                    className="space-y-10"
                >
                    {/* About the projet */}
                    <div className="space-y-3">
                        <h2 className="text-sm-title">
                            Main project information
                        </h2>

                        <div className="">
                            <h3 className="">
                                Name: <span className="text-foreground">{project?.name}</span>
                            </h3>
                            <h3 className="">
                                Description: <span className="text-foreground">{project?.description}</span>
                            </h3>
                        </div>
                    </div>

                    {/* Array Summary of project developpment */}
                    <div className="space-y-4 ">
                        <h2 className="text-sm-title">
                            Summary of the project process
                        </h2>

                        <table className="w-full border">
                            <caption>
                            </caption>

                            <thead className="border">
                                <tr>
                                    <th scope="col" className="">Phases</th>
                                    <th scope="col" className="">Name and description</th>
                                    <th scope="col" className="">time to completion</th>
                                    <th scope="col" className="">Equipment needed</th>
                                    <th scope="col" className="">total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    project?.phases.map((phase, index) => {
                                        const totalPhaseBudget = phase.materials.reduce(
                                            (acc, material) => acc + (1000 * material.quantite),
                                            0
                                        );

                                        return (
                                            <tr key={phase.name || index}>
                                                <th scope="row">
                                                    Phase {phase.numeroPhase}
                                                </th>
                                                <td>
                                                    <table className="w-full">
                                                        <tr>
                                                            {phase.name}
                                                        </tr>

                                                        <hr />

                                                        <tr>
                                                            {phase.description}
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr>
                                                                <th>From</th>
                                                                <th>To</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    {phase.startDate}
                                                                </td>
                                                                <td>
                                                                    {phase.endDate}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <th className="border-r" scope="row" colSpan={3}>
                                                                    {calculateDuration(phase.startDate, phase.endDate)}
                                                                </th>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table className="w-full ">
                                                        <thead className="border">
                                                            <tr>
                                                                <th scope="col" className="">Name</th>
                                                                <th scope="col" className="">Quantity</th>
                                                                <th scope="col" className="">Unit price</th>
                                                                <th scope="col" className="">Total price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                phase.materials.map((material, index) => {
                                                                    {/* Method Get to fetch the price in the database using name of material */ }
                                                                    const price = 1000

                                                                    {/* Get the total for one material */ }
                                                                    const totalMateriel = price * material.quantite;

                                                                    return (
                                                                        <tr key={material.materiel || index}>
                                                                            <td className="">
                                                                                {material.materiel}
                                                                            </td>
                                                                            <td className="">
                                                                                {material.quantite}
                                                                            </td>
                                                                            <td className="">
                                                                                {price}
                                                                            </td>

                                                                            <td className="">
                                                                                {totalMateriel}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>

                                                        <tfoot>
                                                            <tr>
                                                                <th className="border-r" scope="row" colSpan={3}>
                                                                    Total
                                                                </th>
                                                                <td className="">
                                                                    {phase.materials.length} equipments
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </td>

                                                <td>
                                                    {totalPhaseBudget}Fcf
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>

                            <tfoot className="border  ">
                                <tr>
                                    <th scope="row" colSpan={2}>Totals</th>
                                    <td>
                                        {totalProjectDuration}
                                    </td>
                                    <td>
                                        {totalMaterials} equipments
                                    </td>
                                    <td>
                                        {totalBudget} Fcfa
                                    </td>
                                </tr>
                            </tfoot>
                        </table>

                        <div className="">
                            <h2 className="text-base md:text-lg font-semibold">
                                Summary
                            </h2>

                            <div className="">
                                <h3 className="">
                                    Number of phases: <span className="text-foreground">{totalPhases}</span> Phase(s)
                                </h3>
                                <h3 className="">
                                    Time to market: <span className="text-foreground"> {totalProjectDuration}</span>
                                </h3>
                                <h3 className="">
                                    Total number of equipment required: <span className="text-foreground">{totalMaterials} </span> equipments
                                </h3>
                                <h3 className="">
                                    Estimated budget: <span className="text-foreground"> {totalBudget} </span> Fcfa
                                </h3>
                            </div>
                        </div>
                    </div>

                </motion.div>

                {/* cta buttons sections */}
                <div
                    className="flex items-center gap-2 md:gap-4"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: .5, delay: 0.3, ease: "easeOut" }}
                    >
                        <Button
                            className='backdrop-blur-md'
                            variant={'outline'}
                            onClick={() => {
                                navigate(`/details-projet/${slug}`);
                            }}
                        >
                            Go Back
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: .6, delay: 0.4, ease: "easeOut" }}
                    >
                        <Button
                            className={`relative backdrop-blur-md ${isPosting && "pointer-events-none cursor-not-allowed"} `}
                            variant={'default'}
                            disabled={isPosting}
                            onClick={submitProject}
                        >
                            <div className={`flex items-center gap-1 ${isPosting ? "opacity-0" : "opacity-1"}`}>
                                <TiTickOutline />
                                <span>Validate</span>
                            </div>

                            <div className={`postingLoader absolute ${isPosting ? "opacity-1" : "opacity-0"}`}></div>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </>
    )
}

export default ValidateProjet
