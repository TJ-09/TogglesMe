import { FiEdit } from 'react-icons/fi'
import { IoRemoveCircleSharp } from 'react-icons/io5'

const Toggle = ({ title, toggleActive, clicked, index, link, deleteFn, editFn, mode }) => {

    const srText = 'Toggle for ' + title;

    return (
        <div className="flex justify-center items-center">
            <div className="w-2/4 flex items-center">
                <div className="pl-4">
                    {mode === 2 &&
                        <button className="focus:outline-none" onClick={() => editFn(index)}>
                            <span className="sr-only">Edit Toggle</span>
                            <FiEdit size={25} className="text-green-300 outline-none focus:outline-none ease-linear transition-all duration-150 cursor-pointer" />
                        </button>
                    }
                </div>
                <p className="py-4 px-4 break-words w-2/4 flex ml-auto justify-end">{title}</p>
            </div>

            <div className="w-2/4 flex justify-start" >
                <button onClick={() => clicked(index, link)} className={`w-16 h-10 focus:outline-none bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${toggleActive && 'bg-green-400 cursor-pointer'}`}>
                    <span className="sr-only">{srText}</span>
                    <div className={`bg-white w-8 h-8 rounded-full shadow-md cursor-pointer transform duration-300 ease-in-out ${toggleActive && 'translate-x-6'}`}>
                    </div>
                </button>
                <div className="w-2/4 flex justify-end items-center cursor-pointer">
                    {mode === 2 && <>
                        <span className="sr-only">Delete Toggle</span>
                        <IoRemoveCircleSharp onClick={() => deleteFn(index)} alt="Delete Toggle" size={25} className="text-red-300 shadow rounded-full hover:shadow-2xl outline-none focus:outline-none ease-linear transition-all duration-150" />
                    </>}
                </div>
            </div>

        </div>

    );
}

export default Toggle;