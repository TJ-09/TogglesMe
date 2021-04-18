import { FaRegSquare, FaRegCheckSquare } from 'react-icons/fa'
import { FiCheckSquare } from 'react-icons/fi'


const LinkMenu = ({ index, linkType, title, show, clicked }) => {
    const srText = 'Select button for ' + title;
    return (

        <button onClick={() => clicked(index, linkType)} className="flex items-center focus:outline-none justify-start mb-1 cursor-pointer mt-2 w-full">
            <span className="sr-only">{srText}</span>
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