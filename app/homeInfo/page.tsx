'use client'
import { useState } from 'react';
import Form from 'next/form';
import formAction from '../actions/form-action';


export default function Home() {
  const [error, setError] = useState(null);

  // Wrap the server action call in a client-side function.
  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await formAction(formData);

      console.log(result);
      // If no error, you can proceed with further UI changes (e.g., clear form, show success message)
    } catch (err: any) {
      setError(err.message);
      // or use a toast for example
    }
  };

  return (
   <>
      <Form action={handleSubmit}>
        <input name="inputValue" />
        <button type="submit">Submit</button>
      </Form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}