'use server'
import { z } from 'zod';

const schema = z.object({
    inputValue: z.string().min(1, "Input is required"),
  });

const formAction = async (formData: FormData) => {

    // use this method to get all entries at once:
    const dataToValidate = Object.fromEntries(formData.entries());
    const validation = schema.safeParse(dataToValidate);

    
    console.log("Received form data:", dataToValidate);

    if (!validation.success) {
        // Handle validation errors
        console.error(validation.error);
        throw new Error("Validation failed");
    }

    return "Form submitted successfully with value: " + validation.data.inputValue; 
    // Perform your server-side tasks
  };

  export default formAction