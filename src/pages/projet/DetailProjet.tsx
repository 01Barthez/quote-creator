import { RxCross2 } from "react-icons/rx";
"use client"
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineArrowRight } from "react-icons/ai";
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import type { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { useProjectStore } from "@/stores/projet.store";
import type { IProject } from '@/interface/interface';
import { phasesSchema } from '@/core/schema/schema';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format } from "date-fns"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { AutoComplete, type Option } from "@/components/custom/forms/Autocomplete";
import NumberInput from "@/components/custom/forms/NumberInput";
import { AnimatePresence } from 'motion/react';

const DetailProjet: React.FC = () => {
    const navigate = useNavigate();
    const { setProject, project } = useProjectStore();
    const [value, setValue] = useState<Option>()
    const [phases, setPhases] = useState<number[]>([1]);
    const [quantity, setQuantity] = useState<number>(1);
    const divRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Ajouter une phase dans le projet
    const handlePhases = () => {
        setPhases((prevPhases) => [...prevPhases, prevPhases.length + 1]);

        setTimeout(() => {
            const lastPhases = divRefs.current[phases.length];
            if (lastPhases) {
                lastPhases.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }, 50);
    };

    // Supprimer une phase dans le projet
    const handleRemovePhase = (indexToRemove: number) => {
        const updatedPhase = phases.filter((_, index) => index !== indexToRemove);

        // Réindexer les phases après suppression
        const reIndexedPhase = updatedPhase.map((_, idx) => idx + 1);
        setPhases(reIndexedPhase);

        // Scroll vers le haut après suppression
        setTimeout(() => {
            const prevIndex = indexToRemove > 0 ? indexToRemove - 1 : 0;
            const targetRef = divRefs.current[prevIndex];
            if (targetRef) {
                targetRef.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }, 50);
    };

    // useEffect(() => {
    //     if (containerRef.current) {
    //         containerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    //     }
    // }, [phases]);

    const form = useForm<z.infer<typeof phasesSchema>>({
        resolver: zodResolver(phasesSchema),
        defaultValues: {
            name: ``,
            description: ``,
        },
    })

    useEffect(() => {
        if (project && project.phases) {
            form.reset({
                name: project.phases[1].name,
                description: project.phases[1].description,
                startDate: project.phases[1].startDate,
                endDate: project.phases[1].endDate,
            });
        }
    }, [project, form]);

    const backOnNewProjet = () => {
        navigate('/new-projet');
    }

    function onSubmit(values: z.infer<typeof phasesSchema>) {
        const newProject: IProject = {
            name: values.name,
            description: values.description,
            status: "draft",
            phases: [],
        };

        setProject(newProject);
        navigate(`/validate-projet`);
        console.log(newProject);
    }

    return (
        <section className="container space-y-10 py-10 md:py-16 lg:py-20 ">
            <div className="flex flex-col gap-2">
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className='text-2xl md:text-3xl lg:text-4xl font-bold'
                >
                    <span className="text-primary">D</span>etail of &nbsp;<span className="text-primary">P</span>rojet Phases <br />
                    <span className="text-xl md:text-2xl lg:text-3xl">{project?.name}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .4, delay: 0.1, ease: "easeOut" }}
                    className='text-foreground/80 text-sm md:text-base'
                >
                    You want to create new projet ? <br />
                    Provides required information to achieve it !
                </motion.p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 md:space-y-10 lg:space-y-16 w-full md:w-[80%] lg:w-[55%]"
                >
                    <div className="space-y-10" >
                        <AnimatePresence>
                            {
                                phases.map((phase, index) => {
                                    const MATERIALS: Option[] = [];
                                    console.log(quantity);

                                    return (
                                        <motion.div
                                            key={`Phase-${phase}`}
                                            ref={(el) => { divRefs.current[index] = el }}
                                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                            transition={{ duration: 0.6 }}
                                            className="space-y-4"
                                        >
                                            <div className="w-full flex items-center gap-10 justify-between">
                                                <div className="flex items-center gap-1">
                                                    <div className="yin-yang hidden md:block">
                                                    </div>
                                                    <h2 className="text-sm-title">
                                                        Phase {phase}
                                                    </h2>
                                                </div>

                                                {index > 0 && (
                                                    <Button
                                                        type="button"
                                                        variant={"outline"}
                                                        onClick={() => handleRemovePhase(index)}
                                                        className="px-1.5 py-1.5 border-destructive text-destructive hover:bg-destructive/10"
                                                    >
                                                        <RxCross2 />
                                                    </Button>
                                                )}
                                            </div>

                                            <div className="space-y-2.5">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-base">
                                                                Name
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Name of phase"
                                                                    autoComplete='off'
                                                                    required
                                                                    minLength={3}
                                                                    maxLength={150}
                                                                    className="border-foreground"
                                                                    {...field}
                                                                />
                                                            </FormControl>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="description"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-base">
                                                                Description
                                                            </FormLabel>

                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="Description of the phase"
                                                                    autoComplete='off'
                                                                    required
                                                                    minLength={3}
                                                                    maxLength={350}
                                                                    className="resize-none border-foreground min-h-20"
                                                                    {...field}
                                                                />
                                                            </FormControl>

                                                            <FormMessage className="absolute animate-incommingErrorMSG" />
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="flex items-center gap-4 flex-col md:flex-row w-full">
                                                    <FormField
                                                        control={form.control}
                                                        name="startDate"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col w-full">
                                                                <FormLabel className="text-base">
                                                                    Start date of the phase
                                                                </FormLabel>

                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <FormControl>
                                                                            <Button
                                                                                variant={"outline"}
                                                                                className={cn(
                                                                                    "border-foreground w-full pl-3 text-left font-normal",
                                                                                    !field.value && "text-muted-foreground"
                                                                                )}
                                                                            >
                                                                                {field.value ? (
                                                                                    format(field.value, "PPP")
                                                                                ) : (
                                                                                    <span>Pick a date</span>
                                                                                )}
                                                                                <BiCalendar className="ml-auto h-4 w-4 opacity-50" />
                                                                            </Button>
                                                                        </FormControl>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-auto p-0" align="start">
                                                                        <Calendar
                                                                            mode="single"
                                                                            selected={field.value}
                                                                            onSelect={field.onChange}
                                                                            disabled={(date) =>
                                                                                date < new Date()
                                                                            }
                                                                            initialFocus
                                                                        />
                                                                    </PopoverContent>
                                                                </Popover>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="endDate"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col w-full">
                                                                <FormLabel className="text-base">
                                                                    End date of the phase
                                                                </FormLabel>

                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <FormControl>
                                                                            <Button
                                                                                variant={"outline"}
                                                                                className={cn(
                                                                                    "border-foreground w-full pl-3 text-left font-normal",
                                                                                    !field.value && "text-muted-foreground"
                                                                                )}
                                                                            >
                                                                                {field.value ? (
                                                                                    format(field.value, "PPP")
                                                                                ) : (
                                                                                    <span>Pick a date</span>
                                                                                )}
                                                                                <BiCalendar className="ml-auto h-4 w-4 opacity-50" />
                                                                            </Button>
                                                                        </FormControl>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-auto p-0" align="start">
                                                                        <Calendar
                                                                            mode="single"
                                                                            selected={field.value}
                                                                            onSelect={field.onChange}
                                                                            disabled={(date) => {
                                                                                const startDate = form.getValues("startDate");
                                                                                return !startDate || date < new Date(startDate);
                                                                            }}
                                                                            initialFocus
                                                                        />
                                                                    </PopoverContent>
                                                                </Popover>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            {/* List of materials */}
                                            <div className="flex items-end gap-10">
                                                <div className="">

                                                    <FormLabel className="text-base font-base">
                                                        Materials Needed
                                                    </FormLabel>

                                                    {/* List of materails */}
                                                    <div className="flex ">
                                                        <AutoComplete
                                                            options={MATERIALS}
                                                            emptyMessage="No results."
                                                            placeholder="Find something"
                                                            onValueChange={setValue}
                                                            value={value}
                                                        // isLoading={isLoading}
                                                        // disabled={isDisabled}
                                                        // Current value: {value ? value?.label : "No value selected"}
                                                        />

                                                    </div>
                                                </div>
                                                <FormItem>
                                                    <FormLabel className="text-base">
                                                        Quantity
                                                    </FormLabel>
                                                    <FormControl>
                                                        <NumberInput onValueChange={setQuantity} />
                                                    </FormControl>
                                                </FormItem>
                                            </div>
                                        </motion.div>
                                    )
                                })
                            }
                        </AnimatePresence>

                        {/* Add a tooltip */}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger
                                    onClick={handlePhases}
                                >
                                    <ShimmerButton
                                        type="button"
                                        className="h-auto w-auto py-2.5 px-2 text-xs font-semibold dark:bg-white text-background dark:text-foreground flex items-center gap-1"
                                    >
                                        <AiOutlinePlusCircle className="text-lg" />
                                        <span>
                                            Add Phase
                                        </span>
                                    </ShimmerButton>
                                </TooltipTrigger>

                                <TooltipContent>
                                    <p>Click to add New Phase to your project</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    </div>

                    {/* Navigations Buttons */}
                    <div className="flex items-center gap-3 md:gap-4 lg:gap-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: .5, delay: 0.3, ease: "easeOut" }}
                        >
                            <Button
                                variant={'outline'}
                                className='px-2 md:px-2 lg:px-3 border-foreground/30 text-foreground/70'
                                onClick={backOnNewProjet}
                                type='button'
                            >
                                <span>Previous</span>
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: .6, delay: 0.4, ease: "easeOut" }}
                        >
                            <Button
                                type="submit"
                                className="px-4 md:px-8 lg:px-10 font-semibold"
                            >
                                <span>Next</span>
                                <AiOutlineArrowRight />
                            </Button>
                        </motion.div>
                    </div>
                </form>
            </Form>
        </section>
    )
}

export default DetailProjet

