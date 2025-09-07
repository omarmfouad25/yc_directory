"use client"
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from "zod"; 
import { toast } from 'sonner';
import { createPitch } from '@/lib/actions';
import { useRouter } from 'next/navigation';

const StartupForm = () => {
    const [error, setError] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");
    const router = useRouter();


    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try{    
            const formValues= {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                link: formData.get('link') as string,
                pitch,
            }
            await formSchema.parseAsync(formValues);
            const result = await createPitch(prevState,formData, pitch)

            // console.log(formValues)
            if(result.status === "SUCCESS"){
            toast.success('Startup submitted successfully!');
            router.push(`/startup/${result._id}`);
            }

            return result
        }
        catch(error){
            if(error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors;
                setError(fieldErrors as unknown as Record<string, string>);

                toast.error('Please check your inputs and try again');

                return { ...prevState, error : 'Validation Failed', status: 'ERROR' };
            }
            toast.error('Unexpected error occured please try again later')
            return { ...prevState, error : 'Unexpected error went wrong', status: 'ERROR' };
        }
    };
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {error:"", status:"INITIAL"});

  return (
        <form
            action={formAction} 
            className='startup-form'>
            <div>
                <label htmlFor="title" className='startup-form_label'>Title</label>
                <Input id='title'  name='title' className='startup-form_input' 
                placeholder='Startup Title'
                required 
                />
                {error.title && <p className='startup-form_error'>{error.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className='startup-form_label'>Description</label>
                <Textarea id='description'  name='description' className='startup-form_textarea' 
                placeholder='Startup Description'
                required 
                />
                {error.description && <p className='startup-form_error'>{error.description}</p>}
            </div>

            <div>
                <label htmlFor="category" className='startup-form_label'>Category</label>
                <Input id='category'  name='category' className='startup-form_input' 
                placeholder='Startup Category (Tech, Health, Finance, etc.)'
                required 
                />
                {error.category && <p className='startup-form_error'>{error.category}</p>}
            </div>

            <div>
                <label htmlFor="link" className='startup-form_label'>Image URL</label>
                <Input id='link'  name='link' className='startup-form_input' 
                placeholder='Startup Image URL'
                required 
                />
                {error.link && <p className='startup-form_error'>{error.link}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id='pitch'
                    preview='edit'
                    height={300}
                    style={{ borderRadius: 20 , overflow: 'hidden'}}
                    textareaProps={{ placeholder: "Write your startup pitch, explain your idea and what it solves." }}
                    previewOptions={{ disallowedElements: ["style"] }}
                    className='startup-form_editor'
                />
                {error.pitch && <p className='startup-form_error'>{error.pitch}</p>}
            </div>
            <button type='submit' className='startup-form_btn text-white' disabled={isPending}>
                <span className='flex items-center justify-center align-middle'>
                    {isPending ? 'Submitting...' : 'Submit Startup'}
                    <Send className="size-5 ml-2"/>
                </span>
                
            </button>

        </form>
    )
}

export default StartupForm