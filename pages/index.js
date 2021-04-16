import Head from 'next/head'
import React, { useState, useCallback } from 'react';
import Toggle from '../components/toggle/toggle';
import { IoAddCircleSharp } from 'react-icons/io5'

export default function Home() {

  const toggle = (index, linked) => {
    const tempArray = [...toggleActiveArray];
    tempArray[index] = !tempArray[index];
    if (linked.length > 0) {
      linked.map(el => {
        tempArray[el] = !tempArray[el];
      })
    }
    setToggleActiveArray(tempArray);
  }

  const [toggleActive, setToggleActive] = useState(false);
  const [toggleActiveArray, setToggleActiveArray] = useState([false, false]);

  const [input, setInput] = useState({
    title: '',
    link: '',
  })

  const [buttonArray, setButtonArray] = useState([
    { title: 'Number 1', link: [1] },
    { title: 'Number 2', link: [] },
  ]);

  let toggleButtons = null;
  if (buttonArray) {
    toggleButtons = buttonArray.map((el, elIndex) => {
      return <Toggle
        key={elIndex}
        index={elIndex}
        title={el.title}
        link={el.link}
        toggleActive={toggleActiveArray[elIndex]}
        clicked={toggle}
      />
    });
  }

  const handleInputChange = useCallback((nameOfEntity, Value) => setInput({
    ...input,
    [nameOfEntity]: Value
  }), [input]);

  const addButton = () => {
    const newArray = [...buttonArray];
    newArray.push({ title: input.title });
    setButtonArray(newArray);
    const newToggleArray = [...toggleActiveArray];
    newToggleArray.push(false);
    setToggleActiveArray(newToggleArray);
    handleInputChange(title, '');
  }


  return (

    <main className="bg-gradient-to-b from-indigo-300 to-purple-400 relative min-h-screen">

      <div className="container mx-auto px-4 py-16">

        <div className="relative flex flex-col min-w-0 break-words bg-white text-gray-700 w-full shadow-2xl rounded-lg ring-4 ring-purple-200 ring-opacity-50">
          <div className="flex justify-center items-center leading-relaxed text-gray-700 font-bold uppercase py-4">

            <div className="pt-0 px-4">
              <input
                value={input.title}
                title="title"
                onChange={e => handleInputChange(e.currentTarget.title, e.target.value)}
                type="text" placeholder="Name"
                className="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full" />
            </div>

            <div className="pt-0 px-4">
              <input value={input.link}
                title="link"
                onChange={e => handleInputChange(e.currentTarget.title, e.target.value)}
                type="text" placeholder="Link to"
                className="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full" />
            </div>

            <IoAddCircleSharp onClick={addButton} className="text-green-500" size={45} />

          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        <div className="relative flex flex-col min-w-0 break-words bg-white text-gray-700 w-full shadow-2xl rounded-lg ring-4 ring-purple-200 ring-opacity-50">
          <div className="flex flex-col justify-center items-center leading-relaxed text-gray-700 font-bold uppercase py-4">

            {toggleButtons}

          </div>
        </div>




      </div>
    </main>

  )
}
