import { useState } from 'react';

type ToastType = {message: string, type: string, id:string}
type ToastHookReturnType = () => {
    toastList: ToastType[]
    addToastHandler: (clickedToastButton: ToastType) => void
    deleteToastHandler: (id: string) => void
}

const useToast: ToastHookReturnType = () =>
{
    const [toastList, setToastList] = useState<ToastType[]>([]);

    function addToastHandler(clickedToastButton: ToastType)
    {
        setToastList(currentToastList =>
        {
            const newToastId = Math.random().toString();

            const newToastList = [
                ...currentToastList,
                {
                    message: clickedToastButton.message,
                    type: clickedToastButton.type,
                    id: newToastId,
                },
            ];

            setTimeout(() =>
            {
                deleteToastHandler(newToastId);
            }, 3000);

            return newToastList;
        });
        
    }
    
    function deleteToastHandler(id: string)
    {
        setToastList(currentToastList =>
        {
            return currentToastList.filter((toast) => toast.id !== id);
        });
    }

    return {
        toastList,
        addToastHandler,
        deleteToastHandler,
    };
};

export default useToast;
