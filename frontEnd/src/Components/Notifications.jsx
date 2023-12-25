import { toast } from 'react-toastify';

export const Notifications = (message,type, location) => {
    const basicConfig = {
        position: location,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }
    switch (type) {
        case 'info':
            return toast.info(message, basicConfig);
        case 'success':
            return toast.success(message, basicConfig);
        case 'warn':
            return toast.warn(message, basicConfig);
        case 'error':
            return toast.error(message, basicConfig);
        default:
            return toast.warn(message, basicConfig);
    }
}