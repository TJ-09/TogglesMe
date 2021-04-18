// const [modalToggle, setmodalToggle] = useState(false);

// const tempToggle = () => {
//     setmodalToggle(!modalToggle);
// }

// <Modal toggle={modalToggle} negFn={tempToggle} posFn={tempToggle} />

import PropTypes from 'prop-types';

const Modal = ({ title, toggle, negFn, posFn, body, posBtn, negBtn }) => {

    return (

        <>
            {toggle ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        onClick={negFn}>
                        <div className="relative w-auto my-6 mx-2.5 max-w-2xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="text-2xl font-semibold text-gray-700">{title}</h3>
                                    <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={negFn}>
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-gray-600 text-lg leading-relaxed">
                                        {body}</p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-center p-6 border-t border-solid border-gray-300 rounded-b">
                                    <button className="bg-purple-500 text-white flex justify-center items-center active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={negFn}>{negBtn}</button>
                                    <button className="bg-purple-500 text-white flex justify-center items-center active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={posFn}>{posBtn}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-30 bg-black"></div>
                </>
            ) : null}
        </>
    );
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    toggle: PropTypes.bool.isRequired,
    negFn: PropTypes.func.isRequired,
    posFn: PropTypes.func.isRequired,
    body: PropTypes.string,
    posBtn: PropTypes.string.isRequired,
    negBtn: PropTypes.string.isRequired
};

export default Modal;