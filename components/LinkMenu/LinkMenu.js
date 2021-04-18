import { FaRegSquare, FaRegCheckSquare } from 'react-icons/fa'
import { FiCheckSquare } from 'react-icons/fi'


const LinkMenu = ({ index, linkType, title, show, clicked }) => {
    return (

        <button onClick={() => clicked(index, linkType)} className="flex items-center justify-start mb-1 cursor-pointer mt-2 w-full">

            {/* <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-400">
                <input type="checkbox" className="opacity-0 absolute"></input>
                {show && <p className="text-green-500">X</p>}
            </div> */}
            {show ?
                <FiCheckSquare className="text-green-600" size={25} />
                :
                <FaRegSquare className="text-gray-600" size={25} />
            }

            <div className="select-none ml-2">{title}</div>

        </button>

    );
}

export default LinkMenu;