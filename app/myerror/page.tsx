"use client"
import React from 'react'

export default function ExampleInfoErrorPage() 
{
    const error = new Error("An unexpected error occurred while loading the page.");    

    const [counter, setCounter] = React.useState(0);    

    if(counter >= 3) {   
      
        throw error;
    }


    const handleCountReset = () => {    
        setCounter(counter + 1);
    }

  return (
    <div>
        <h1>Example Info Error Page</h1>
        <button onClick={handleCountReset}>Reset Counter</button>
        <p>Counter: {counter}</p>
    </div>
  )
}
