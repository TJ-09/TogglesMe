import Head from 'next/head';
import React, { useState, useCallback, useEffect } from 'react';
import Toggle from '../components/Toggle/Toggle';
import { IoAddCircleSharp, IoRefreshSharp } from 'react-icons/io5';
import { AiOutlineCloseCircle, AiOutlineSave } from 'react-icons/ai';
import { FaShareAlt, FaCopy } from 'react-icons/fa';
import { useRouter } from 'next/router';
import LinkMenu from '../components/LinkMenu/LinkMenu';
import Modal from '../components/Modal/Modal';
import confetti from 'canvas-confetti';


export default function Home() {
  const router = useRouter();
  const [togglesTitle, setTogglesTitle] = useState('');
  const [toggleActiveArray, setToggleActiveArray] = useState([0, 0]); // using 0 not false as it shortens the base64
  const [toggleLinks, setToggleLinks] = useState(false);
  const [toggleEditLinks, setToggleEditLinks] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [toggleResult, setToggleResult] = useState('');
  const [modalToggle, setModalToggle] = useState(false);
  const [validationPrompt, setValidationPrompt] = useState([]);
  const [mode, setMode] = useState(2) // 1 = view, 2 = edit, 3=loading?
  const [input, setInput] = useState({
    title: '',
    link: [],// this is for new buttons
    edLink: [], // this is for edits
    editIndex: null // used so we know what is been edited
  })
  const [buttonArray, setButtonArray] = useState([
    { title: 'Toggle 1', link: [1] },
    { title: 'Toggle 2', link: [] },
  ]);
  const urlLink = `${process.env.NEXT_PUBLIC_URL}?q=`

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

  const DeleteToggle = (index) => {
    // remove it from the btn array
    const newArray = [...buttonArray];
    newArray.splice(index, 1)
    setButtonArray(newArray);

    // remove the active array
    const newToggleArray = [...toggleActiveArray];
    newToggleArray.splice(index, 1)
    setToggleActiveArray(newToggleArray);

  }

  const CheckLinked = (indexInput, linkInput) => { // bold
    setInput((prevState) => {
      const newArray = [...prevState[linkInput]];
      if (newArray.includes(indexInput)) {
        // it does exist remove it
        const indexOfChecked = newArray.indexOf(indexInput);
        newArray.splice(indexOfChecked, 1)
      } else {
        // add it to
        newArray.push(indexInput)
      }
      return ({
        ...prevState,
        [linkInput]: newArray
      });
    });
  }

  let result = toggleActiveArray.every(e => e == 1); // hack with the double equals
  if (result) {
    confetti({
      particleCount: 150
    });
  }

  const MakeEditLinks = (index) => {
    // get all the link and then tick the ones that are in this buttons array already
    // for the edit function

    // copy the link to the edit input temporarily and set editing index
    let linkCopy;
    if (!input.editIndex) {
      linkCopy = [...buttonArray[index].link]
    } else {
      linkCopy = [...input.edLink]
    }
    setInput({
      ...input,
      edLink: linkCopy,
      editIndex: index
    });

    if (!toggleEditLinks) {
      setToggleEditLinks(true);
    }
  }

  const SaveEditToggle = () => {

    const newArray = [...buttonArray];
    newArray[input.editIndex] = ({
      ...newArray[input.editIndex],
      link: input.edLink
    });
    setButtonArray(newArray);
    CloseEdit();
  }

  useEffect(() => {
    if (router.query.q) {
      // there is a query
      // comes in title, btn, active
      setMode(1); // view mode
      const splitQueryString = router.query.q.split("$");
      Decoding(splitQueryString[0], splitQueryString[1], splitQueryString[2]);
    } else {
      setMode(2); // edit mode
    }

  }, [router.query.q, router])

  let toggleButtons = null;
  if (buttonArray && buttonArray.length > 0) {
    toggleButtons = buttonArray.map((el, elIndex) => {
      return <Toggle
        key={elIndex}
        index={elIndex}
        title={el.title}
        link={el.link}
        toggleActive={toggleActiveArray[elIndex]}
        clicked={toggle}
        deleteFn={DeleteToggle}
        editFn={MakeEditLinks}
        mode={mode}
      />
    });
  }

  // for the adding menu
  let listOfLinks = null;
  if (buttonArray) {
    listOfLinks = buttonArray.map((el, index) => {

      // if the element exists in the link input then show the tick (this is only cosmetic)
      let show = false;
      if (input.link.length > 0 && input.link.includes(index)) {
        // it does exist, check it
        show = true;
      }
      return <LinkMenu
        key={index}
        index={index}
        linkType={'link'}
        title={el.title}
        show={show}
        clicked={CheckLinked}
      />
    })
  }

  let listOfEditLinks = null;
  listOfEditLinks = buttonArray.map((el, i) => {
    // if the element exists in the edLink input then show the tick (this is only cosmetic)
    let show = false;
    if (input.edLink.length > 0 && input.edLink.includes(i)) {
      // it does exist, check it
      show = true;
    }
    if (buttonArray[input.editIndex] === el) {// if this is the btn we are editing do nothing
      return null;
    }
    return <LinkMenu
      key={i}
      index={i}
      linkType={'edLink'}
      title={el.title}
      show={show}
      clicked={CheckLinked}
    />
  })

  const handleInputChange = useCallback((nameOfEntity, Value) => setInput({
    ...input,
    [nameOfEntity]: Value
  }), [input]);

  const addButton = () => {

    if (input.title.length > 0 && !input.title.includes("&") && !input.title.includes("~")) {
      const newArray = [...buttonArray];
      newArray.push({ title: input.title, link: input.link });
      setButtonArray(newArray);
      const newToggleArray = [...toggleActiveArray];
      newToggleArray.push(0);
      setToggleActiveArray(newToggleArray);
      setInput({
        ...input,
        title: '',
        link: []
      })
    } else {
      setValidationPrompt([]);
      if (input.title.includes("&") || input.title.includes("~")) {
        setValidationPrompt(validationPrompt => [...validationPrompt, { message: 'Toggles name cannot contain "&" or "~" characters', background: 'bg-indigo-500' }]);
      }
      if (input.title.length === 0) {
        setValidationPrompt(validationPrompt => [...validationPrompt, { message: 'Please enter a Toggle Name', background: 'bg-indigo-500' }]);
      }
    }
  }

  let validationPres = null;
  if (validationPrompt.length > 0) {
    // loop through array for items and show them
    validationPres = validationPrompt.map((el, index) => {
      return (
        <div key={index} className={`text-white mx-2.5 px-3 py-2 sm:px-6 sm:py-4 sm:mt-3 border-0 rounded relative align-middle mb-4 ${el.background}`}>
          <span className="text-s sm:text-xl lg:text-base inline-block align-middle mr-0 sm:mr-8">
            {el.message}</span>
          <button
            className="absolute bg-transparent text-lg sm:text-2xl text-purple-200 font-semibold leading-none right-0 top-0 mt-4 mr-2 outline-none focus:outline-none"
            onClick={() => clearAlert(index)}>
            <span>x</span>
          </button>
        </div>
      )
    })

  }

  const clearAlert = (index) => {
    let splicedValPrompts = [...validationPrompt]
    splicedValPrompts.splice(index, 1);
    setValidationPrompt(splicedValPrompts);
  }

  const Reset = () => {

    if (router.query.q) { // if there is a query of the toggle then reset by decoding what is in it again but show as a view
      if (modalToggle) {
        setModalToggle(false);
      }
      router.push({
        pathname: '/',
        query: { q: router.query.q },
      });
    } else {
      // reset everything
      setButtonArray([
        { title: 'Toggle 1', link: [1] },
        { title: 'Toggle 2', link: [] },
      ]);
      setToggleActiveArray([0, 0]);
      setTogglesTitle(''); // no title
      setOpenShare(false); // close share menu
      setMode(2); // edit mode
      router.push('/', undefined, { shallow: true }); // push to the home
    }

  }

  const Create = () => {
    if (modalToggle) {
      setModalToggle(false);
    }
    router.push('/', undefined, { shallow: true }); // push to the home
    setButtonArray([
      { title: 'Toggle 1', link: [1] },
      { title: 'Toggle 2', link: [] },
    ]);
    setToggleActiveArray([0, 0]);
    setTogglesTitle(''); // no title
    setOpenShare(false); // close share menu
    setMode(2); // edit mode
  }

  const OpenSharesLink = () => {
    Encoding();
    setOpenShare(!openShare);
  }

  const CloseEdit = () => {
    // set the editing one to blank and link 2
    setInput({
      ...input,
      edLink: [],
      editIndex: null
    })
    // set the toggle to off
    setToggleEditLinks(false);
  }

  const Encoding = () => {
    // wrap the base64 in uri for safety
    let encodedBtnArray = '';
    buttonArray.map(el => {
      encodedBtnArray = encodedBtnArray + el.title.toString() + "&" + el.link.toString() + "~";
    })
    encodedBtnArray = encodeURIComponent(btoa(encodedBtnArray));
    const encodedTitle = encodeURIComponent(btoa(togglesTitle));
    const encodedActiveArray = encodeURIComponent(btoa(toggleActiveArray.toString()));

    setShareLink(urlLink + encodedTitle + "$" + encodedBtnArray + "$" + encodedActiveArray)

  }

  const Decoding = (encodedTitle, encodedBtnArray, encodedActiveArray) => {
    try { // crude error handling
      const decodedTitle = decodeURIComponent(atob(encodedTitle));
      const decodedActiveArray = decodeURIComponent(atob(encodedActiveArray));
      const decodedBtnArray = decodeURIComponent(atob(encodedBtnArray));

      // undo here
      const decodedBtnArraySplit = decodedBtnArray.split("~");
      let newArray = []; // start with a blank array (getting everything from the url)
      decodedBtnArraySplit.map((el, index) => {
        const temp = el.split("&");
        if (temp.length === 2) {

          // newArray = [...buttonArray];
          const linkArray = temp[1].split(",");
          linkArray.map((el, index) => {
            if (el.length > 0) { // could have no link
              linkArray[index] = parseInt(el);
            }
          })
          newArray.push({ title: temp[0], link: linkArray });

        }
      })
      setButtonArray(newArray);

      // this gives an array of strings so parse it to 
      const activeArray = decodedActiveArray.split(",");
      activeArray.map((el, index) => {
        activeArray[index] = parseInt(el);
      })
      setTogglesTitle(decodedTitle);
      setToggleActiveArray(activeArray)


    } catch (error) {
      setModalToggle(true);
    }
  }

  return (
    <>
      <Head>
        <title>Toggles Me</title>
        <meta name="description" content='Create and share funny toggles with your friends'></meta>
        <meta property="og:title" content='Toggles Me' />
        <meta property="og:type" content='website' />
        <meta property="og:url" content='toggles.me' />
        <meta property="og:image" content="/apple-touch-icon.png" />
        <meta property="og:description" content='Create funny toggles and share with your friends' />
        <meta property="og:site_name" content="Toggles Me" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta charSet="UTF-8"></meta>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <main className="bg-gradient-to-b from-indigo-300 to-purple-400 relative min-h-screen">

        <Modal title={'Something went wrong with the link =('}
          toggle={modalToggle}
          negFn={Create}
          posFn={Reset}
          body={'That link didn\'t work for some reason! Try it again or go to the home page.'}
          posBtn={'Try Again'}
          negBtn={'Home'}
        />

        <div className="container mx-auto px-4 py-16 max-w-6xl">

          {/* Heading */}
          <div className="flex flex-col justify-center items-center min-w-0 break-words bg-white text-gray-700 shadow-2xl rounded-lg ring-4 ring-purple-200 ring-opacity-50 mt-8">
            <h1 className="px-4 py-4 text-4xl sm:text-7xl font-sniglet font-extrabold text-center text-purple-900">
              Toggles Me</h1>
            <h3 className="hidden sm:block px-4 pb-4 text-md sm:text-sm font-sniglet font-normal text-center text-purple-500">
              Create and share funny toggles with your friends
            </h3>
          </div>

          {/* Creating Box */}
          <div className="relative flex flex-col justify-center items-center min-w-0 break-words bg-white text-gray-500 w-full shadow-2xl rounded-lg ring-4 ring-purple-200 ring-opacity-50 mt-8">
            {mode !== 1 &&
              <>
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
                            <span className="sr-only">Close link toggles menu</span>
                            <AiOutlineCloseCircle size={25} alt="Close link toggles menu" className="text-purple-500 cursor-pointer" onClick={() => setToggleLinks(!toggleLinks)} />
                            {listOfLinks}
                          </div>
                          <button>
                            <span className="sr-only">Close linking new Toggle</span>
                            <div onClick={() => setToggleLinks(!toggleLinks)} className="opacity-25 fixed inset-0 z-40 bg-black cursor-pointer"></div>
                          </button>
                        </>
                      }
                      <button onClick={() => setToggleLinks(!toggleLinks)} className="bg-purple-500 text-white font-semibold active:bg-indigo-600 text-sm px-6 py-3 my-3 sm:my-0 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        Link Toggle</button>

                    </div>
                    <div className="mt-3 block sm:hidden text-sm leading-normal text-center text-gray-500 font-bold uppercase">Add Toggle</div>
                    <div className="mb-3 sm:mb-0">
                      <span className="sr-only">Add Toggle Button</span>
                      <IoAddCircleSharp onClick={addButton} alt="Add Toggle Button" className="text-green-500 cursor-pointer shadow rounded-full hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" size={45} />
                    </div>

                  </div>
                  {validationPres}

                </div>
              </>}
            <div className={`pt-4 px-4 flex flex-col justify-center items-center py-4 ${mode !== 1 && "border-t border-gray-300"}`}>
              <button onClick={OpenSharesLink} className="bg-purple-500 flex justify-center items-center text-white font-bold active:bg-indigo-600 uppercase text-sm px-5 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"          >
                <i><FaShareAlt size={35} className="pr-3" /></i> Share Toggles</button>
            </div>
          </div>

          {/* Share box */}
          {openShare &&
            <div className="flex flex-col justify-center items-center min-w-0 break-words bg-white text-gray-700 shadow-2xl rounded-lg ring-4 ring-purple-200 ring-opacity-50 mt-8">
              <h3 className="px-4 text-4xl font-normal text-center leading-normal mb-2 text-gray-700 pt-6">
                Share Link</h3>

              <p className="px-4 py-3 mb-2 text-white bg-indigo-500 rounded min-w-50 max-w-4xl text-sm shadow-lg border-0 outline-none focus:outline-none focus:ring">
                {shareLink}
              </p>

              <button onClick={() => { navigator.clipboard.writeText(shareLink) }} className="bg-purple-500 text-white flex justify-center items-center active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                <i><FaCopy size={25} className="pr-3" /></i> Copy Link</button>
            </div>
          }

          {/* Main toggles */}
          <div className="static min-w-0 break-words bg-white text-gray-700 w-full shadow-2xl rounded-lg ring-4 ring-purple-200 ring-opacity-50 mt-8">
            <h3 className=" px-4 text-4xl font-normal text-center break-words overflow-clip leading-normal mt-0 mb-2 text-gray-700 pt-6">
              {togglesTitle}</h3>

            <div className="leading-relaxed text-gray-500 font-bold uppercase py-4">
              {toggleEditLinks &&
                <>
                  <div className="flex flex-col place-items-center bg-white p-2 rounded-lg shadow-inner text-gray-800 z-50 origin-center absolute">
                    <button className="focus:outline-none">
                      <span className="sr-only">Close editing Toggle</span>
                      <AiOutlineCloseCircle size={25} className="text-purple-500 cursor-pointer" onClick={CloseEdit} />
                    </button>
                    {listOfEditLinks}
                    <button className="focus:outline-none">
                      <span className="sr-only">Save Edits to toggle</span>
                      <AiOutlineSave size={25} className="text-green-500 cursor-pointer" onClick={SaveEditToggle} />
                    </button>
                  </div>
                  <button className="focus:outline-none">
                    <span className="sr-only">Close editing Toggle</span>
                    <div onClick={CloseEdit} className="opacity-25 fixed inset-0 z-40 bg-black cursor-pointer"></div>
                  </button>
                </>
              }
              {toggleButtons}
            </div>
            <div className="flex justify-between">

              {/* Reset Button */}
              <div onClick={Reset} className="flex items-center cursor-pointer font-sniglet text-purple-500 hover:text-indigo-700 focus:text-purple-300">
                <button className="focus:outline-none">
                  <span className="sr-only">Reset Toggles Page</span>
                  <IoRefreshSharp size={25} />
                </button>
                <p className="text-xs">Reset</p>
              </div>

              {/* Create own Button */}
              {mode === 1 &&

                <div onClick={Create} className="flex items-center cursor-pointer font-sniglet text-purple-500 hover:text-indigo-700 focus:text-purple-300">
                  <button className="focus:outline-none">
                    <span className="sr-only">Create your own Toggle</span>
                    <IoAddCircleSharp size={25} />
                  </button>
                  <p className="text-xs">Create your own Toggle!</p>
                </div>
              }
            </div>

          </div>
        </div>

      </main >
    </>
  )
}
