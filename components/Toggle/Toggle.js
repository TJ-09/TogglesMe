const Toggle = ({ name, toggleActive, clicked }) => {
    return (

        <div className="flex justify-center items-center">
            <p className="py-4 px-4">{name}</p>

            <div onClick={clicked}>
                <div className={`w-16 h-10 bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${toggleActive && 'bg-green-400'}`}>
                    <div className={`bg-white w-8 h-8 rounded-full shadow-md transform duration-300 ease-in-out ${toggleActive && 'translate-x-6'}`}>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Toggle;