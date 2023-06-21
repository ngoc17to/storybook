import Modal from './Modal';
import useModal from '../../hooks/useModal';

import './Modal.css';
import '../../App.css';

type AlertComponentProps = {
    title?: string,
    message?: string
}

const AlertComponent: React.FC<AlertComponentProps> = ({title, message}) =>
{
    const { modalVisible, show } = useModal();

    return (
        <div className="component-container">
            <button
                className="button-default"
                onClick={show}
            >
                <p>Confirm</p>
            </button>
            <Modal
                modalVisible={modalVisible}
                hide={show}
                text={{title: title, message: message}}
                type='alert'
            />
        </div>
    );
};

export default AlertComponent;
