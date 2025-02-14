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
