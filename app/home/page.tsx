import React from 'react'
import Form from 'next/form'
export default function HomeInfo() {

const formAction = async (formData:any) => {
    'use server'
    console.log('formData', formData)

    // if needed, you can access the inputValue like this:
    const inputValue = formData.get("firstname") + " " + formData.get("lastname");
    console.log('inputValue', inputValue)

    // Save in database, send emails or any backend task without exposing such logic on the client side.
  }
  return (
    <Form action={formAction}>
      <input name="lastname" />
      <input name="firstname" />
      <button type="submit">Submit</button>
    </Form>
  )
}
