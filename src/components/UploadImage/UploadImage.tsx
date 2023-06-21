import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { AiOutlineCloudUpload, AiOutlineFullscreen } from 'react-icons/ai';

import '../../App.css';
import './UploadImage.css';

import UploadImg from '../../img/upload.png';
import { useTheme } from '../../contexts/ThemeContext';
import useModal from '../../hooks/useModal';
import EnlargeImage from './EnlargeImage';

type UploadImageProps = {
    src?: string
}

const UploadImage: React.FC<UploadImageProps> = ({ src }) =>
{
    const { theme } = useTheme();
    const { show, modalVisible } = useModal();

    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const uploadBtnRef = useRef<HTMLButtonElement>(null);
    const enlargeBtnRef = useRef<HTMLButtonElement>(null);

    const [selectedImage, setSelectedImage] = useState<any>();
    const [imgPreview, setImgPreview] = useState<string | undefined>(src ? src : undefined);

    useEffect(() =>
    {
        if (!selectedImage)
        {
            setImgPreview(undefined);
            return;
        }

        const imgURL = URL.createObjectURL(selectedImage);

        setImgPreview(imgURL);

        return () => URL.revokeObjectURL(imgURL);
    }, [selectedImage]);

    useEffect(() =>
    {
        if (src)
        {
            setImgPreview(src);
        }
        else {console.log('do not exist defaultImg');}
    }, [src]);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (!event.target.files || event.target.files.length === 0) {return;}
        setSelectedImage(event.target.files[0]);
    };


    function handleClick()
    {
        if (hiddenFileInput.current)
        {
            hiddenFileInput.current.click();
        }
    }

    function imgEnterHandler()
    {
        uploadBtnRef.current?.classList.add('upload-btn-show');
        uploadBtnRef.current?.classList.remove('upload-btn-hide');
        enlargeBtnRef.current?.classList.add('enlarge-btn-show');
        enlargeBtnRef.current?.classList.remove('enlarge-btn-hide');
    }

    function imgLeaveHandler()
    {
        uploadBtnRef.current?.classList.remove('upload-btn-show');
        uploadBtnRef.current?.classList.add('upload-btn-hide');
        enlargeBtnRef.current?.classList.add('enlarge-btn-hide');
        enlargeBtnRef.current?.classList.remove('enlarge-btn-show');
    }

    function uploadBtnEnterHandler()
    {
        uploadBtnRef.current?.classList.add('upload-btn-show');
        uploadBtnRef.current?.classList.remove('upload-btn-hide');
    }
    
    function uploadBtnLeaveHandler()
    {
        uploadBtnRef.current?.classList.remove('upload-btn-show');
        uploadBtnRef.current?.classList.add('upload-btn-hide');
    }

    return (
        <div>
            <div className='upload-container'>
                <div className='upload-wrapper'>
                    {
                        imgPreview
                            ? (
                                <div
                                    className='image-container'
                                    onMouseEnter={imgEnterHandler}
                                    onMouseLeave={imgLeaveHandler}
                                >
                                    <img
                                        className='image-upload'
                                        src={imgPreview}
                                        alt='img-upload'
                                    />
                                </div>
                            )
                            : (
                                <button
                                    className='image-container'
                                    onClick={handleClick}
                                >
                                    <AiOutlineCloudUpload
                                        size="50%"
                                        color={theme === 'dark' ? '#fff' : '#000'}
                                    />
                                </button>
                            )
                    }
                    <button
                        ref={enlargeBtnRef}
                        className='enlarge-button'
                        onClick={show}
                        onMouseEnter={imgEnterHandler}
                        onMouseLeave={imgLeaveHandler}
                    >
                        <AiOutlineFullscreen
                            size="100%"
                            color={theme === 'dark' ? '#fff' : '#000'}
                        />
                    </button>
                </div>
                <button
                    ref={uploadBtnRef}
                    className='upload-button'
                    onMouseEnter={uploadBtnEnterHandler}
                    onMouseLeave={uploadBtnLeaveHandler}
                    onClick={handleClick}
                >
                    <img
                        src={UploadImg}
                        alt='UploadImg'
                        width={'25px'}
                    />
                    <p style={{ marginLeft: '5px' }}>Upload Image</p>
                </button>
            </div>
            
            <input
                ref={hiddenFileInput}
                type='file'
                name='image-upload'
                accept=".jpg, .png, .jpeg"
                style={{ display: 'none' }}
                onChange={changeHandler}
            />
            <EnlargeImage
                hide={show}
                modalVisible={modalVisible}
                imgPreview={imgPreview}
            />
        </div>
    );
};

export default UploadImage;
