// "use client"
import { AiOutlineArrowRight } from "react-icons/ai";
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectSchema } from "@/core/schema/schema";
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
import type { IProject } from "@/interface/interface";
import { motion } from 'framer-motion';

const CreateProjet: React.FC = () => {
    const navigate = useNavigate();
    const { setProject, project } = useProjectStore();

    const form = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: ``,
            description: ``,
        },
    })

    useEffect(() => {
        if (project && (project.name || project.description)) {
            form.reset({
                name: project.name,
                description: project.description,
            });
        }
    }, [project, form]);

    
    function onSubmit(values: z.infer<typeof projectSchema>) {
        const newProject: IProject = {
            name: values.name,
            description: values.description,
            status: "draft",
            phases: [],
        };

        setProject(newProject);
        navigate(`/details-projet`);
    }

    return (
        <section className="container space-y-10 py-16 md:py-16 lg:py-20">
            <div className="flex flex-col gap-2">
                {/*  Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className='text-2xl md:text-3xl lg:text-4xl font-bold'
                >
                    <span className="text-primary">C</span>reate a <span className="text-primary">N</span>ew projet
                </motion.h1>

                {/*  description */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .6, delay: 0.2, ease: "easeOut" }}
                    className='text-foreground/80 text-sm md:text-base'
                >
                    You want to create new projet ? <br />
                    Provides required information to achieve it !
                </motion.p>
            </div>

            {/* form */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 md:space-y-10 lg:space-y-16 w-full md:w-[80%] lg:w-[55%]"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -300 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: .6, delay: 0.3, ease: "easeOut" }}
                        className="space-y-4"
                    >
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
                                            placeholder="Name of projet"
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
                                            placeholder="Description of the projet"
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
                    </motion.div>

                    <div className="flex items-center gap-3 md:gap-4 lg:gap-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: .5, delay: 0.3, ease: "easeOut" }}
                        >
                            <Button
                                variant={'outline'}
                                className='px-2 md:px-2 lg:px-3 border-foreground/30 text-foreground/70'
                                onClick={() => navigate("/")}
                            >
                                <span>Back&nbsp;Home</span>
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

export default CreateProjet

