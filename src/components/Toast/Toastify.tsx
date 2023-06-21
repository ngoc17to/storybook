import React from 'react';
import ReactDOM from 'react-dom';
import '../../App.css';
import './Toast.css';
import { AiOutlineClose, AiFillCheckCircle, AiFillWarning, AiFillCloseCircle } from 'react-icons/ai';

type ToastProps = {
    toastList: {message: string, type: string, id:string}[]
    deleteToast: (id: string) => void
}
const Toastify: React.FC<ToastProps> = ({ toastList, deleteToast }) =>
{

    const renderIcon = (type: string) =>
    {
        switch (type)
        {
            case 'success': {
                return <AiFillCheckCircle size="100%" />;
            }
            case 'warning': {
                return <AiFillWarning size="100%" />;
            }
            default: {
                return <AiFillCloseCircle size="100%" />;
            }
        }
    };

    if (toastList === null) {return (<></>);}
    return (
            ReactDOM.createPortal(
                <div className="toast-container">
                    <div className="toast-wrapper">
                        {toastList.map(({ message, type, id }) => (
                            <div
                                key={id}
                                className={type}
                            >
                                <div className='toast-icon'>
                                    {renderIcon(type)}
                                </div>

                                <p>{message}</p>

                                <button
                                    className="toast-close-button"
                                    onClick={() => deleteToast(id)}
                                >
                                    <AiOutlineClose
                                        size="100%"
                                        className='app-icon'
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>, document.body,
            )
    );
};
export default Toastify;

