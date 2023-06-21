import Modal from './Modal';
import useModal from '../../hooks/useModal';

import './Modal.css';
import '../../App.css';

type ModalComponentProps = {
    title?: string,
    message?: string
}

const ModalComponent: React.FC<ModalComponentProps> = ({title, message}) =>
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
            />
        </div>
    );
};

export default ModalComponent;
