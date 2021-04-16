import Head from 'next/head'
import React, { useState } from 'react';
import Toggle from '../components/toggle/toggle';

export default function Home() {
  const [toggleActive, setToggleActive] = useState(false);


  const toggle = () => {
    setToggleActive(!toggleActive);
    console.log('hello');
  }

  return (
    <>
      <div className="bg-purple-800">
        <p className="py-3 text-2xl">Hello</p>
      </div>


      <div className="flex justify-center items-center leading-relaxed text-gray-500 font-bold uppercase py-4">

        <Toggle
          name="number 1"
          toggleActive={toggleActive}
          clicked={toggle}
        />

      </div>

    </>
  )
}
