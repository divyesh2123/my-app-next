import React from 'react'
import Image from "next/image";

import profilePic from "../../public/example.png";

export default function ImageExamplePage() {
  return (
    <div>
        <h1> User Profile </h1>
      <Image src={profilePic} alt="user profile picture" />
    </div>
  )
}
