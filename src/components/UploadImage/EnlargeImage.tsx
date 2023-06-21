import React from 'react';
import ReactDOM from 'react-dom';
import './UploadImage.css';
import '../../App.css';
import '.././Modal/Modal.css';
import { AiOutlineClose, AiOutlineCloudDownload } from 'react-icons/ai';
import { saveAs } from 'file-saver';

type EnlargeImageProps = {
    modalVisible: boolean
    hide: () => void
    imgPreview: string | undefined
}

const EnlargeImage: React.FC<EnlargeImageProps> = ({ modalVisible, hide, imgPreview }) =>
{

    const downloadImage = () =>
    {
        if (imgPreview)
        {
            saveAs(imgPreview, 'image.jpg');
        }
    };

    if (modalVisible)
    {
        return (
            ReactDOM.createPortal (
                <div className="img-modal-container">
                    <div
                        className="img-modal-overlay"
                        onClick={hide}
                    />
                    <div className="img-modal-wrapper">
                        <img src={imgPreview} />
                        <button
                            className="img-modal-button download-button"
                            onClick={downloadImage}
                        >
                            <AiOutlineCloudDownload
                                className='app-icon'
                                size="100%"
                            />
                        </button>
                        <button
                            className="img-modal-button img-close-button"
                            onClick={hide}
                        >
                            <AiOutlineClose
                                className='app-icon'
                                size="100%"
                            />
                        </button>
                    </div>
                </div>, document.body,
            ));
    }
    else {return (<></>);}
};

export default EnlargeImage;
