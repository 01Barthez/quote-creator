import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
"use client"
import React, { useEffect } from 'react'
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

const DetailProjet: React.FC = () => {
    const navigate = useNavigate();
    const { setProject, project } = useProjectStore();

    const form = useForm<z.infer<typeof phasesSchema>>({
        resolver: zodResolver(phasesSchema),
        defaultValues: {
            name: ``,
            description: ``,
        },
    })

    useEffect(() => {
        if (project && project.name) {
            form.reset({
                name: project.name,
                description: project.description,
            });
        }
    }, [project, form]);

    /*
        // Redirection if projet is not valid
        useEffect(() => {
            if (!project) {
                console.log("Redirection vers /page-not-found");
                navigate("/page-not-found", { replace: true });
            }
        }, [project]);
    */
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
                <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>
                    <span className="text-primary">D</span>etail of &nbsp;<span className="text-primary">P</span>rojet Phases <br />
                    <span className="text-xl md:text-2xl lg:text-3xl">{project?.name}</span>
                </h1>

                <p className='text-foreground/80 text-sm md:text-base'>
                    You want to create new projet ? <br />
                    Provides required information to achieve it !
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 md:space-y-10 lg:space-y-16 w-full md:w-[80%] lg:w-[55%]"
                >
                    <div className="space-y-10">
                        {/* Phase info block */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-1">
                                <div className="yin-yang hidden md:block">
                                </div>
                                <h2 className="text-sm-title">
                                    Phase 1
                                </h2>
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
                            <div className="">
                                <FormLabel className="text-base font-base">
                                    Materials Needed
                                </FormLabel>

                                {/* List of materails */}

                            </div>
                        </div>

                        {/* Add a tooltip */}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <ShimmerButton
                                        type="button"
                                        className="h-auto w-auto py-2.5 px-2 text-xs font-semibold dark:bg-white text-background dark:text-foreground flex items-center gap-1"
                                        onClick={() => { }}
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

