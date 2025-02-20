// Schema for differents zod schema

import { z } from 'zod'
import { REGEX_Password } from '../constant/constant'


export const formSchema = z.object({
    email: z.string().email({
        message: "Should be a correct email !"
    }),
    password: z.string().regex(REGEX_Password, {
        message: "Should be a correct password !"
    })
})

export const projectSchema = z.object({
    name:
        z.string({
            required_error: "Name of projet is required !",
            invalid_type_error: "The name format is not valid !"
        })
            .trim()
            .min(3, {
                message: "Name should be more than 3 characters !",
            })
            .max(150, {
                message: "Name should be less than 150 characters !",
            }),

    description:
        z.string({
            required_error: "Description is required !",
            invalid_type_error: "Description format is not valid !"
        })
            .trim()
            .min(3, {
                message: "Description should be more than 3 characters !",
            })
            .max(350, {
                message: "Description should be less than 150 characters !",
            }),
});

export const materialSchema = z.object({
    materiel: z.string({
        required_error: "Name is required !",
        invalid_type_error: "Name format is not valid !"
    })
        .trim()
        .min(3, {
            message: "Name should be more than 3 characters !",
        })
        .max(350, {
            message: "Name should be less than 150 characters !",
        })
    ,
    quantite: z.number({
        required_error: "Quantity is required !",
        invalid_type_error: "Quantity format is not valid !"
    })
        .min(3, {
            message: "Quantity should be at less 1 !",
        })
    ,
});

export const phasesSchema = z.object({
    name:
        z.string({
            required_error: "Name of projet is required !",
            invalid_type_error: "The name format is not valid !"
        })
            .trim()
            .min(3, {
                message: "Name should be more than 3 characters !",
            })
            .max(150, {
                message: "Name should be less than 150 characters !",
            })
    ,

    description:
        z.string({
            required_error: "Description is required !",
            invalid_type_error: "Description format is not valid !"
        })
            .trim()
            .min(3, {
                message: "Description should be more than 3 characters !",
            })
            .max(350, {
                message: "Description should be less than 150 characters !",
            })
    ,

    startDate: z.date({
        required_error: "Start date is required!",
        invalid_type_error: "Invalid start date format!"
    }),

    endDate: z.date({
        required_error: "End date is required!",
        invalid_type_error: "Invalid end date format!"
    }),

    material: z.array(materialSchema)
        .min(1, {
            message: "You should provide at lest one materail"
        })
        .length(999, {
            message: "You've provided too much information try to reduce it !"
        })
    ,
})
    .refine((data) => {
        const start = new Date(data.startDate.getFullYear(), data.startDate.getMonth(), data.startDate.getDate());
        const end = new Date(data.endDate.getFullYear(), data.endDate.getMonth(), data.endDate.getDate());
        return end >= start;
    },
        {
            message: "End date must be after or equal to start date.",
            path: ["endDate"]
        });
