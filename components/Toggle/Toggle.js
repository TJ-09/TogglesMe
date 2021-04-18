import { FiEdit } from 'react-icons/fi'
import { IoRemoveCircleSharp } from 'react-icons/io5'

const Toggle = ({ title, toggleActive, clicked, index, link, deleteFn, editFn }) => {

    return (
        <div className="flex justify-center items-center">
            <div className="w-2/4 flex items-center">
                <div className="pl-4">
                    <FiEdit onClick={() => editFn(index)} size={25} className="text-green-300 outline-none focus:outline-none ease-linear transition-all duration-150 cursor-pointer" />
                </div>
                <p className="py-4 px-4 break-words w-2/4 flex ml-auto justify-end">{title}</p>
            </div>

            <div className="w-2/4 flex justify-start" >
                <div onClick={() => clicked(index, link)} className={`w-16 h-10 bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${toggleActive && 'bg-green-400 cursor-pointer'}`}>
                    <div className={`bg-white w-8 h-8 rounded-full shadow-md cursor-pointer transform duration-300 ease-in-out ${toggleActive && 'translate-x-6'}`}>
                    </div>
                </div>
                <div onClick={() => deleteFn(index)} className="w-2/4 flex justify-end items-center cursor-pointer">
                    <IoRemoveCircleSharp size={25} className="text-red-300 shadow rounded-full hover:shadow-2xl outline-none focus:outline-none ease-linear transition-all duration-150" />
                </div>
            </div>

        </div>

    );
}

export default Toggle;