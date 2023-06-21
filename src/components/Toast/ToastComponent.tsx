import React from 'react';
import useToast from '../../hooks/useToast';
import Toastify from './Toastify';
import '../../App.css';

type ToastComponentProps = {
    toastText: {message: string, type: string, id:string}[]
}

const ToastComponent: React.FC<ToastComponentProps> = ({toastText}) =>
{
    const { addToastHandler, deleteToastHandler, toastList } = useToast();

    return (
        <div className="component-container">
            <button
                className="button-default success-button"
                onClick={() => addToastHandler(toastText[0])}
            > <p>Success</p>
            </button>

            <button
                className="button-default warning-button"
                onClick={() => addToastHandler(toastText[1])}
            > <p>Warning</p>
            </button>

            <button
                className="button-default error-button"
                onClick={() => addToastHandler(toastText[2])}
            > <p>Error</p>
            </button>

            <Toastify
                toastList={toastList}
                deleteToast={deleteToastHandler}
            />
        </div>
    );
};

export default ToastComponent;
