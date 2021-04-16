import Head from 'next/head'
import React, { useState, useCallback } from 'react';
import Toggle from '../components/toggle/toggle';
import { IoAddCircleSharp } from 'react-icons/io5'
import { AiOutlineCloseCircle } from 'react-icons/ai'

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
  const [toggleLinks, setToggleLinks] = useState(false);

  const [input, setInput] = useState({
    title: '',
    link: [],
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

  const CheckLinked = (indexInput) => {
    // does is exist already?
    const newArray = [...input.link];
    if (input.link.length > 0 && input.link.includes(indexInput)) {
      // it does exist remove it
      const indexOfChecked = newArray.indexOf(indexInput);
      newArray.splice(indexOfChecked, 1)

    } else {
      // add it to
      newArray.push(indexInput)
    }
    setInput({
      ...input,
      link: newArray
    })

  }

  let listOfLinks = null;
  if (buttonArray) {
    listOfLinks = buttonArray.map((el, index) => {

      // if the element exists in the link input then show the tick (this is only cosmetic)
      let show = false;
      if (input.link.length > 0 && input.link.includes(index)) {
        // it does exist, check it
        show = true;
      }
      return <div onClick={() => CheckLinked(index)} key={index} className="flex justify-start items-center mb-1 cursor-pointer mt-2">

        <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-400">
          <input type="checkbox" className="opacity-0 absolute"></input>
          {show && <p className="text-green-500">X</p>}
        </div>
        <div className="select-none">{el.title}</div>

      </div>

    })
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

        <div className="relative flex flex-col min-w-0 break-words bg-white text-gray-700 w-full shadow-2xl rounded-lg ring-4 ring-purple-200 ring-opacity-50 z-0">
          <div className="flex justify-center items-center leading-relaxed text-gray-700 font-bold py-4 z-0">

            <div className="pt-0 px-4">
              <input
                value={input.title}
                title="title"
                onChange={e => handleInputChange(e.currentTarget.title, e.target.value)}
                type="text" placeholder="Name"
                className="px-3 py-4 relative bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full" />
            </div>

            <div className="pt-0 px-4 flex flex-col justify-start items-start">
              {toggleLinks ?
                <>
                  <div className="flex flex-col place-items-center bg-white p-2 rounded-lg shadow-inner text-gray-800 z-50 origin-top-right absolute right-0">
                    <AiOutlineCloseCircle size={25} className="text-purple-500 cursor-pointer" onClick={() => setToggleLinks(!toggleLinks)} />
                    {listOfLinks}
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
                :
                <button onClick={() => setToggleLinks(!toggleLinks)} className="bg-purple-100 text-gray-500 active:bg-gray-100 text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                  Linked To</button>
              }
            </div>

            <IoAddCircleSharp onClick={addButton} className="text-green-500" size={45} />

          </div>
        </div>

        <div className="static min-w-0 break-words bg-white text-gray-700 w-full shadow-2xl rounded-lg ring-4 ring-purple-200 ring-opacity-50 mt-8">
          <div className="flex flex-col justify-center items-center leading-relaxed text-gray-700 font-bold uppercase py-4">

            {toggleButtons}

          </div>
        </div>


      </div>

    </main>
  )
}
