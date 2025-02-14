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

export const formSchemaEmail = z.object({
    email: z.string().email({
        message: "Should be a correct email !"
    }),
})