const Toggle = ({ title, toggleActive, clicked, index, link }) => {

    return (
        <div className="flex justify-center items-center">
            <p className="py-4 px-4 w-2/4 flex justify-end break-words">{title}</p>

            <div className="w-2/4 flex justify-start" onClick={() => clicked(index, link)}>
                <div className={`w-16 h-10 bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${toggleActive && 'bg-green-400'}`}>
                    <div className={`bg-white w-8 h-8 rounded-full shadow-md transform duration-300 ease-in-out ${toggleActive && 'translate-x-6'}`}>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Toggle;