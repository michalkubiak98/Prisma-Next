'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import H1 from '@/src/components/ui/h1';
import { CreateJobValues, createJobSchema } from '@/src/lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/src/components/ui/input';
import Select from '@/src/components/ui/select';
import { jobTypes, locationTypes } from '@/src/lib/job-types';
import LocationInput from '@/src/components/LocationInput';
import { FiX } from 'react-icons/fi';
import { Label } from '@/src/components/ui/label';
import config from '../../../../tailwind.config';
import RichTextEditor from '@/src/components/RichTextEditor';
import { draftToMarkdown } from 'markdown-draft-js';
import LoadingButton from '@/src/components/LoadingButton';
import { createJobPosting } from './actions';

export default function NewJobForm() {
  // define type of data we expect in the form
  const form = useForm<CreateJobValues>({
    // resolver responsible for validation
    resolver: zodResolver(createJobSchema),
  });

  // destructure form to not have to always use form.something
  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CreateJobValues) {
    //alert(JSON.stringify(values, null, 2));

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        //strings or file value for company logo image
        formData.append(key, value);
      }
    });

    try {
      // ******* CREATE A JOB POSTING AND PUSH TO DB *******
      await createJobPosting(formData);

      // we cannot forward the direct error message from the backend (post for creating job listing) as it could
      // potentially leak sensitive information to the frontend, so we have to return an error string on the server action instead if we
      // want the user to see an error message. in Production nextjs removes the error object from catch block
    } catch (error) {
      // if db is down for example or any other error the use will get the below alert
      // instead of redirect to error page and losing all the input values like a long description

      alert('Error submitting form');
    }
  }

  return (
    <main className="max-w-3xl m-auto my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1>Find your perfect developer</H1>
        <p className="text-muted-foreground">
          Get your job posting seen by thousands of job seekers.
        </p>
      </div>
      <div className="space-y-6 border rounded-lg p-4">
        <div>
          <h2 className="font-semibold">Job Details</h2>
          <p className="text-muted-foreground">
            Provide a job description and details
          </p>
        </div>
        {/* We want to use the shadcn/ui Form component which integrates the react-hood-form and zod validation*/}
        {/* We also need to pass these form values into the form*/}
        <Form {...form}>
          {/* html form, disable html form validation to use our own */}
          {/* the onSubmit requires javascript, its just not feasible to have a form without JS */}
          <form
            className="space-y-4"
            noValidate
            // handleSubmit is responsible for validating the data, so we wrap the onSubmit with it
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              // the useForm value passed to form can now autocomplete the name of this form field from the Job Schema
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    {/* no need to set the id of the input the form controller does this for us */}
                    <Input placeholder="eg. Frontend Developer" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              // the useForm value passed to form can now autocomplete the name of this form field from the Job Schema
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue="">
                      <option value="" hidden>
                        Select an option
                      </option>
                      {jobTypes.map((jobType) => (
                        <option key={jobType} value={jobType}>
                          {jobType}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              // the useForm value passed to form can now autocomplete the name of this form field from the Job Schema
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 
            // input will want a value but for fiels there is no value so we must destructure the render field
            <FormField
              control={control}
              // the useForm value passed to form can now autocomplete the name of this form field from the Job Schema
              name="companyLogo"
              render={({ field: {value, ...fieldValues} }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...fieldValues} 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        // extract file and pass to react hook form to pass the zod validation (single file not a file list)
                        const file = e.target.files?.[0]
                        fieldValues.onChange(file)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              */}
            <FormField
              control={control}
              // the useForm value passed to form can now autocomplete the name of this form field from the Job Schema
              name="locationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      defaultValue=""
                      onChange={(e) => {
                        // when change type of location to remote revalidate the location field as its not needed so get rid og error msg
                        field.onChange(e);
                        if (e.currentTarget.value === 'Remote') {
                          trigger('location');
                        }
                      }}
                    >
                      <option value="" hidden>
                        Select an option
                      </option>
                      {locationTypes.map((locationType) => (
                        <option key={locationType} value={locationType}>
                          {locationType}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office Location</FormLabel>
                  <FormControl>
                    {/* we passed the ref so the locationInput is wired to the react hook form */}
                    {/* as soon as we click on location result and trigger onLocationSelected its passed to react hook form and can then later be submitted */}
                    <LocationInput
                      onLocationSelected={field.onChange}
                      ref={field.ref}
                    />
                  </FormControl>
                  {watch('location') && (
                    <div className="flex items-center gap-1">
                      {/* set the button type to button because we are in a form, otherwise form will think its a submit button */}
                      <button
                        type="button"
                        onClick={() => {
                          // if we delete this location it should reset the form value and re validate
                          setValue('location', '', { shouldValidate: true });
                        }}
                      >
                        <FiX size={20} />
                      </button>
                      <span className="text-sm">{watch('location')}</span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* email and other input aligned horizontally so bit of a different layout here*/}
            {/* not directly inside the form so need to write the htmlFor manually*/}
            <div className="space-y-2">
              <Label htmlFor="applicationEmail">How to apply</Label>
              <div className="flex justify-between">
                <FormField
                  control={control}
                  name="applicationEmail"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <div className="flex items-center">
                          <Input
                            id="applicationEmail"
                            placeholder="Email"
                            type="email"
                            {...field}
                          />
                          <span className="mx-2">or</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="applicationUrl"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          placeholder="Website"
                          type="url"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger('applicationEmail'); // trigger email field validation
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* 
             <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label onClick={() => setFocus('description')}>
                    Description
                  </Label>
                  <FormControl>
                    <RichTextEditor
                      onChange={(draft) =>
                        field.onChange(draftToMarkdown(draft))
                      }
                      ref={field.ref}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={isSubmitting}>
              Submit
            </LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  );
}
