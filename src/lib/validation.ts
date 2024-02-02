import { z } from "zod"
import { jobTypes, locationTypes } from "./job-types";


// ***** SCHEMA VALIDATIONS *****
const companyLogoSchema = z.custom<File | undefined>()
.refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file"
)
.refine(file => {
    return !file || file.size < 1024 * 1024 * 2
}, "File must be less than 2MB")
// undefined because its not required. File type only available in node 20.

const requiredString = z.string().min(1, "Required")
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number")

const applicationSchema = z.object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")), // necessary for optional field but still check if email is valid
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")), 
})
.refine(data => data.applicationEmail || data.applicationUrl, {
    message: "Email or Url is required",
    path: ["applicationEmail"] //if we trigger this error it will show below the applicationEmail field in create new job form
})

const locationSchema = z.object({
    locationType: requiredString.refine(
        value => locationTypes.includes(value),
        "Invalid location type"
    ), // necessary for optional field but still check if email is valid
    location: z.string().max(100).optional()
})
.refine(data => !data.locationType || data.locationType === "Remote" // no need for location 
|| data.location // both hybrid and onsite require location

, {
    message: "Location is required for on-site jobs",
    path: ["location"] 
})

// ***** FORM VALIDATIONS *****
export const createJobSchema = z.object({
    title: requiredString.max(100),
    type: requiredString.refine(
        value => jobTypes.includes(value),
        "Invalid Job Type"
    ),
    companyName: requiredString.max(100),
    // companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    // form fields are always strings, even when we put in a number:
    salary: numericRequiredString.max(9, "Number can't be longer than 9 digits"),
})
.and(applicationSchema)
.and(locationSchema)



export const jobFilterSchema = z.object({
    q: z.string().optional(),
    type: z.string().optional(),
    location: z.string().optional(),
    remote: z.coerce.boolean().optional(),
})

// turns the schemas above into types
export type JobFilterValues = z.infer<typeof jobFilterSchema>
export type CreateJobValues = z.infer<typeof createJobSchema>