import Head from 'next/head'
import React, { useState, useCallback, useEffect } from 'react';
import Toggle from '../components/toggle/toggle';
import { IoAddCircleSharp } from 'react-icons/io5'
import { AiOutlineCloseCircle, AiOutlineSave } from 'react-icons/ai'
import { FaShareAlt, FaCopy } from 'react-icons/fa'
import { useRouter } from 'next/router';

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

  const router = useRouter();
  const [togglesTitle, setTogglesTitle] = useState('');
  const [toggleActiveArray, setToggleActiveArray] = useState([0, 0]); // using 0 not false as it shortens the base64
  const [toggleLinks, setToggleLinks] = useState(false);
  const [toggleEditLinks, setToggleEditLinks] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [shareLink, setShareLink] = useState(false);
  const [editLinks, setEditLinks] = useState(null);

  const [mode, setMode] = useState() // 1 = view, 2 = edit, 3=loading?
  const [input, setInput] = useState({
    title: '',
    link: [],// this is for new buttons
    edLink: [], // this is for edits
    editIndex: null // used so we know what is been edited
  })
  const [buttonArray, setButtonArray] = useState([
    { title: 'Number 1', link: [1] },
    { title: 'Number 2', link: [] },
  ]);

  useEffect(() => {
    if (router.query.q) {
      // there is a query
      // comes in title, btn, active
      const splitQueryString = router.query.q.split("$");
      Decoding(splitQueryString[0], splitQueryString[1], splitQueryString[2]);
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
      return <div onClick={() => CheckLinked(index, 'link')} key={index} className="flex justify-start items-center mb-1 cursor-pointer mt-2">

        <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-400">
          <input type="checkbox" className="opacity-0 absolute"></input>
          {show && <p className="text-green-500">X</p>}
        </div>
        <div className="select-none">{el.title}</div>

      </div>

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
    return <div onClick={() => CheckLinked(i, 'edLink')} key={i} className="flex justify-start items-center mb-1 cursor-pointer mt-2">

      <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center cursor-pointer items-center mr-2 focus-within:border-blue-400">
        <input type="checkbox" className="opacity-0 absolute"></input>
        {show && <p className="text-green-500">X</p>}
      </div>
      <div className="select-none">{el.title}</div>
    </div>
  })

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
      setInput({
        ...input,
        title: '',
        link: []
      })
    }

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

    setShareLink(encodedTitle + "$" + encodedBtnArray + "$" + encodedActiveArray)

  }

  const Decoding = (encodedTitle, encodedBtnArray, encodedActiveArray) => {

    const decodedTitle = decodeURIComponent(atob(encodedTitle));
    const decodedActiveArray = decodeURIComponent(atob(encodedActiveArray));
    const decodedBtnArray = decodeURIComponent(atob(encodedBtnArray));

    // undo here
    const decodedBtnArraySplit = decodedBtnArray.split("~");
    setButtonArray([{}]); // clear it
    let newArray = [...buttonArray];
    decodedBtnArraySplit.map((el, index) => {
      const temp = el.split("&");
      if (temp.length === 2) {

        newArray = [...buttonArray];
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
        <meta charSet="UTF-8"></meta>
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
                {process.env.NEXT_PUBLIC_URL}?q={shareLink}
              </p>

              <button onClick={() => { navigator.clipboard.writeText(shareLink) }} className="bg-purple-500 text-white flex justify-center items-center active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                <i><FaCopy size={25} className="pr-3" /></i> Copy</button>
            </div>
          }

          {/* Main toggles */}
          <div className="static min-w-0 break-words bg-white text-gray-700 w-full shadow-2xl rounded-lg ring-4 ring-purple-200 ring-opacity-50 mt-8">
            <h3 className=" px-4 text-4xl font-normal text-center break-words overflow-clip leading-normal mt-0 mb-2 text-gray-800 pt-6">
              {togglesTitle}</h3>

            <div className="leading-relaxed text-gray-500 font-bold uppercase py-4">
              {toggleEditLinks &&
                <>
                  <div className="flex flex-col place-items-center bg-white p-2 rounded-lg shadow-inner text-gray-800 z-50 origin-center absolute">
                    <AiOutlineCloseCircle size={25} className="text-purple-500 cursor-pointer" onClick={CloseEdit} />
                    {editLinks}
                    {listOfEditLinks}
                    <AiOutlineSave size={25} className="text-green-500 cursor-pointer" onClick={SaveEditToggle} />
                  </div>

                  <div onClick={CloseEdit} className="opacity-25 fixed inset-0 z-40 bg-black cursor-pointer"></div>
                </>
              }
              {toggleButtons}
            </div>
          </div>
        </div>

      </main >
    </>
  )
}
