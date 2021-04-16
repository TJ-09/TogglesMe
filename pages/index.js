import Head from 'next/head'
import React, { useState, useCallback } from 'react';
import Toggle from '../components/toggle/toggle';
import { IoAddCircleSharp } from 'react-icons/io5'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FaShareAlt, FaCopy } from 'react-icons/fa'

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

  const [togglesTitle, setTogglesTitle] = useState('');
  const [toggleActiveArray, setToggleActiveArray] = useState([0, 0]); // using 0 not false as it shortens the base64
  const [toggleLinks, setToggleLinks] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [shareLink, setShareLink] = useState(false);

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

    if (input.title.length > 0) {

      const newArray = [...buttonArray];
      newArray.push({ title: input.title, link: input.link });
      setButtonArray(newArray);
      const newToggleArray = [...toggleActiveArray];
      newToggleArray.push(0);
      setToggleActiveArray(newToggleArray);
      setInput({ title: '', link: [] })
    }

  }

  const OpenSharesLink = () => {
    Encoding();
    setOpenShare(!openShare);

  }

  const Encoding = () => {

    // wrap the base64 in uri for safety

    let encodedBtnArray = '';
    buttonArray.map(el => {
      encodedBtnArray = encodedBtnArray + el.title.toString() + "&" + el.link.toString() + "~";
    })
    encodedBtnArray = encodeURI(btoa(encodedBtnArray));
    const encodedTitle = encodeURI(btoa(togglesTitle));
    const encodedActiveArray = encodeURI(btoa(toggleActiveArray.toString()));

    setShareLink(encodedTitle + "&" + encodedTitle + "&" + encodedActiveArray)

  }

  const Decoding = () => {

    const decodedTitle = decodeURI(atob(encodedTitle));
    const decodedActiveArray = decodeURI(atob(encodedActiveArray));
    const decodedBtnArray = decodeURI(atob(encodedBtnArray));

    // undo here
    const decodedBtnArraySplit = decodedBtnArray.split("~");
    decodedBtnArraySplit.map((el, index) => {
      const temp = el.split("&");
      if (temp.length === 2) {
        console.log(temp);
        console.log(temp[1].split(","));
      }
    })

    // console.log(decodedTitle);
    // console.log(decodedActiveArray);
  }

  return (
    <>
      <Head>
        <title>Toggles Me</title>
        <meta name="description" content='Create funny toggles and share with your friends'></meta>
        <meta property="og:title" content='Toggles Me' />
        <meta property="og:type" content='website' />
        <meta property="og:url" content='toggles.me' />
        <meta property="og:image" content="" />
        <meta property="og:description" content='Create funny toggles and share with your friends' />
        <meta property="og:site_name" content="Toggles Me" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta charset="UTF-8"></meta>
      </Head>

      <main className="bg-gradient-to-b from-indigo-300 to-purple-400 relative min-h-screen">

        <div className="container mx-auto px-4 py-16 max-w-6xl">

          {/* Creating Box */}
          <div className="relative flex flex-col justify-center items-center min-w-0 break-words bg-white text-gray-500 w-full shadow-2xl rounded-lg ring-4 ring-purple-200 ring-opacity-50">

            <div className="leading-relaxed text-gray-500 font-bold py-4 max-w-4xl">
              <div className="pt-0 px-4">
                <div className="text-sm leading-normal text-center mt-0 mb-2 text-gray-500 font-bold uppercase">Toggles Title</div>
                <input
                  value={togglesTitle}
                  onChange={e => setTogglesTitle(e.currentTarget.value)}
                  type="text" placeholder="Title for Toggles"
                  className="px-3 py-4 relative bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring" />
              </div>
            </div>

            <div className="leading-relaxed text-gray-500 font-bold py-4 max-w-4xl">
              <div className="text-sm leading-normal text-center mt-0 mb-2 text-gray-500 font-bold uppercase">Toggle Name</div>
              <div className="flex flex-col sm:flex-row justify-center items-center pt-0 px-4">

                <input
                  value={input.title}
                  name="title"
                  onChange={e => handleInputChange(e.currentTarget.name, e.target.value)}
                  type="text" placeholder="Toggle Name"
                  className="px-3 py-4 relative bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full" />

                <div className="pt-0 px-4 flex flex-wrap justify-start items-start">
                  {toggleLinks &&
                    <>
                      <div className="flex flex-col place-items-center bg-white p-2 rounded-lg shadow-inner text-gray-800 z-50 origin-bottom-right top-16 absolute">
                        <AiOutlineCloseCircle size={25} className="text-purple-500 cursor-pointer" onClick={() => setToggleLinks(!toggleLinks)} />
                        {listOfLinks}
                      </div>

                      <div onClick={() => setToggleLinks(!toggleLinks)} className="opacity-25 fixed inset-0 z-40 bg-black cursor-pointer"></div>
                    </>
                  }
                  <button onClick={() => setToggleLinks(!toggleLinks)} className="bg-purple-500 text-white font-semibold active:bg-gray-100 text-sm px-6 py-3 my-3 sm:my-0 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    Link Toggle</button>

                </div>
                <div className="mt-3 block sm:hidden text-sm leading-normal text-center text-gray-500 font-bold uppercase">Add Toggle</div>
                <div className="mb-3 sm:mb-0">
                  <IoAddCircleSharp onClick={addButton} className="text-green-500 cursor-pointer shadow rounded-full hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" size={45} />
                </div>

              </div>

            </div>

            <div className="pt-0 px-4 flex flex-col justify-center items-center py-4">
              <button onClick={OpenSharesLink} className="bg-purple-500 flex justify-center items-center text-white active:bg-pink-600 font-bold uppercase text-sm px-5 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"          >
                <i><FaShareAlt size={35} className="pr-3" /></i> Share Toggles</button>
            </div>

          </div>

          {/* Share box */}
          {openShare &&
            <div className="flex flex-col justify-center items-center min-w-0 break-words bg-white text-gray-700 shadow-2xl rounded-lg ring-4 ring-purple-200 ring-opacity-50 mt-8">
              <h3 className="px-4 text-4xl font-normal text-center leading-normal mb-2 text-gray-800 pt-6">
                Share Link</h3>

              <p className="px-4 py-3 mb-2 text-white bg-indigo-500 rounded min-w-50 max-w-4xl text-sm shadow-lg border-0 outline-none focus:outline-none focus:ring">
                {shareLink}
              </p>

              <button onClick={() => { navigator.clipboard.writeText(shareLink) }} className="bg-purple-500 text-white flex justify-center items-center active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                <i><FaCopy size={25} className="pr-3" /></i> Copy</button>
            </div>
          }

          {/* Main toggles */}
          <div className="static min-w-0 break-words bg-white text-gray-700 w-full shadow-2xl rounded-lg ring-4 ring-purple-200 ring-opacity-50 mt-8">
            <h3 className=" px-4 text-4xl font-normal text-center break-words overflow-clip leading-normal mt-0 mb-2 text-gray-800 pt-6">
              {togglesTitle}</h3>

            {/* <div className="flex flex-col justify-center items-center leading-relaxed text-gray-500 font-bold uppercase py-4"> */}
            <div className="leading-relaxed text-gray-500 font-bold uppercase py-4">

              {toggleButtons}

            </div>
          </div>
        </div>

      </main >
    </>
  )
}
