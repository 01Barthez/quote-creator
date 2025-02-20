import { TiTickOutline } from "react-icons/ti";
import SEO from '@/components/custom/utils/SEO'
import { Button } from '@/components/ui/button'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from "framer-motion";
import { calculateDuration } from "@/functions/duration";
import { project } from "@/core/constant/constant";
// import { useProjectStore } from '@/stores/projet.store'

const ValidateProjet: React.FC = () => {
    const navigate = useNavigate();
    // const { project } = useProjectStore();
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

    // Redirection if projet is not valid
    useEffect(() => {
        if (!project) {
            console.log("Redirection vers /page-not-found");
            navigate("/page-not-found", { replace: true });
        }
    }, [project, slug]);

    const submitProject = () => {
        setPosting(true);

        // Post the project to atabase
        navigate(`/success-creation-projet`);
    }

    const totalProjectDuration = useMemo(() => {
        if (!project?.phases?.length) return "0 day";

        // Trouver la date la plus ancienne et la plus récente
        const minStartDate = new Date(Math.min(...project.phases.map(p => new Date(p.startDate).getTime())));
        const maxEndDate = new Date(Math.max(...project.phases.map(p => new Date(p.endDate).getTime())));

        return calculateDuration(minStartDate.toISOString(), maxEndDate.toISOString());
    }, [project]);


    const totalPhases = useMemo(() => {
        return project?.phases.length ?? 0;
    }, [project]);

    const totalMaterials = useMemo(() => {
        return project?.phases.reduce((acc, phase) => acc + phase.materials.reduce((acc2, material) => acc2 + material.quantite, 0), 0) ?? 0;
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
                    className='text-lg-title'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <span className="text-primary">V</span>alidation of <span className="text-primary">n</span>ew project
                </motion.h1>

                {/* Description */}
                <motion.p
                    className='max-w-[100%] md:max-w-[80%] lg:max-w-[70%] text-foreground/80 text-base md:text-lg'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .6, delay: 0.2, ease: "easeOut" }}
                >
                    Check informations before process to the creation of the project
                </motion.p>

                {/* projets data */}
                <div
                    className="space-y-10"
                >
                    {/* About the projet */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .7, delay: 0.1, ease: "easeOut" }}
                        className="space-y-3"
                    >
                        <div className="flex items-center gap-1">
                            <div className="yin-yang hidden md:block">
                            </div>
                            <h2 className="text-sm-title">
                                Main project information
                            </h2>
                        </div>

                        <div className="">
                            <h3 className="text-lg">
                                Name: <span className="text-foreground font-semibold text-base">"&nbsp;{project?.name}&nbsp;"</span>
                            </h3>
                            <h3 className="text-lg">
                                Description: <span className="text-foreground font-semibold text-base">"&nbsp;{project?.description}&nbsp;"</span>
                            </h3>
                        </div>
                    </motion.div>

                    {/* Array Summary of project developpment */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: .8, delay: 0.2, ease: "easeOut" }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-1">
                            <div className="yin-yang hidden md:block">
                            </div>

                            <h2 className="text-sm-title">
                                Summary of the project process
                            </h2>
                        </div>

                        <table className="w-full">
                            <caption>
                            </caption>

                            <thead className="border-2 border-foreground">
                                <tr>
                                    <th
                                        scope="col"
                                        className="text-xl  px-1 md:px-2 lg:px-4"
                                    >
                                        Phases
                                    </th>

                                    <th
                                        scope="col"
                                        className="text-lg text-nowrap px-1 md:px-2 lg:px-4"
                                    >
                                        Name and description
                                    </th>

                                    <th
                                        scope="col"
                                        className="text-lg text-nowrap px-1 md:px-2 lg:px-4"
                                    >
                                        time to completion
                                    </th>

                                    <th
                                        scope="col"
                                        className="text-lg text-nowrap px-1 md:px-2 lg:px-4"
                                    >
                                        Equipment needed
                                    </th>

                                    <th
                                        scope="col"
                                        className="text-lg text-nowrap px-1 md:px-2 lg:px-4"
                                    >
                                        total
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="border-2 border-foreground">
                                {
                                    project?.phases.map((phase, index) => {
                                        const totalPhaseBudget = phase.materials.reduce(
                                            (acc, material) => acc + (1000 * material.quantite),
                                            0
                                        );

                                        return (
                                            <tr key={phase.name || index}>
                                                <th
                                                    scope="row"
                                                    className="text-nowrap px-1 md:px-2 lg:px-4"
                                                >
                                                    Phase {phase.numeroPhase}
                                                </th>

                                                <td>
                                                    <table className="w-full">
                                                        <tbody>
                                                            <tr className="">
                                                                <td className="p-1 md:p-2 lg:p-4 border-none">
                                                                    {phase.name}
                                                                </td>
                                                            </tr>

                                                            <tr className=" border-t border-foreground">
                                                                <td className="p-1 md:p-2 lg:p-4 border-none ">
                                                                    {phase.description}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr >
                                                                <th className="!border !font-medium !text-foreground/80">From</th>
                                                                <th className="!border !font-medium !text-foreground/80">To</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            <tr>
                                                                <td className="!border !font-medium">
                                                                    {phase.startDate}
                                                                </td>
                                                                <td className="!border !font-medium">
                                                                    {phase.endDate}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <th
                                                                    className="!border !font-medium !text-foreground/60"
                                                                    scope="row"
                                                                    colSpan={3}
                                                                >
                                                                    {calculateDuration(phase.startDate, phase.endDate)}
                                                                </th>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table className="w-full ">
                                                        <thead>
                                                            <tr>
                                                                <th
                                                                    scope="col"
                                                                    className="!border !font-medium !text-foreground/80 text-base text-nowrap px-.5 md:px-1 lg:px-2"
                                                                >
                                                                    Name
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="!border !font-medium !text-foreground/80 text-base text-nowrap px-.5 md:px-1 lg:px-2"
                                                                >
                                                                    Quantity
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="!border !font-medium !text-foreground/80 text-base text-nowrap px-.5 md:px-1 lg:px-2"
                                                                >
                                                                    Unit price
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="!border !font-medium !text-foreground/80 text-base text-nowrap px-.5 md:px-1 lg:px-2"
                                                                >
                                                                    Total price
                                                                </th>
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
                                                                            <td className="!border text-center !font-medium">
                                                                                {material.materiel}
                                                                            </td>
                                                                            <td className="!border text-center !font-medium">
                                                                                {material.quantite}
                                                                            </td>
                                                                            <td className="!border text-center !font-medium">
                                                                                {price}
                                                                            </td>

                                                                            <td className="!border text-center !font-medium">
                                                                                {totalMateriel}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </td>

                                                <td className="text-center !font-medium text-foreground/90">
                                                    {totalPhaseBudget}Fcf
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>

                            <tfoot className="border-2 border-foreground">
                                <tr className="">
                                    <th
                                        scope="row"
                                        colSpan={2}
                                        className="border-l border-foreground p-1 md:p-2 lg:p-4"
                                    >
                                        Totals
                                    </th>

                                    <td className="border-l border-foreground !font-medium p-1 md:p-2 lg:p-4 text-center">
                                        {totalProjectDuration}
                                    </td>

                                    <td className="border-l border-foreground !font-medium p-1 md:p-2 lg:p-4 text-center">
                                        {totalMaterials} equipments
                                    </td>

                                    <td className="border-l border-foreground !font-semibold text-nowrap p-1 md:p-2 lg:p-4 text-center">
                                        {totalBudget} Fcfa
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </motion.div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-1">
                            <div className="yin-yang hidden md:block">
                            </div>

                            <h2 className="text-sm-title">
                                Summary
                            </h2>
                        </div>


                        <div className="text-base md:text-lg text-foreground/85">
                            <h3 className="">
                                Number of phases: <span className="!text-foreground font-semibold">{totalPhases > 9 ? `${totalPhases}` : `0${totalPhases}`}</span> Phase(s)
                            </h3>
                            <h3 className="">
                                Time to market: <span className="!text-foreground font-semibold"> {totalProjectDuration}</span>
                            </h3>
                            <h3 className="">
                                Total number of equipment required: <span className="!text-foreground font-semibold">{totalMaterials > 9 ? `${totalMaterials}` : `0${totalMaterials}`} </span> equipments
                            </h3>
                            <h3 className="">
                                Estimated budget: <span className="!text-foreground font-semibold"> {totalBudget ? `${totalBudget}` : 0} </span> Fcfa
                            </h3>
                        </div>
                    </div>
                </div>

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
                                navigate(`/details-projet`);
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
                            className={`relative backdrop-blur-md px-4 md:px-6 lg:px-10 ${isPosting && "pointer-events-none cursor-not-allowed"} `}
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
