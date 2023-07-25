import { toast } from "react-toastify";

window.getRandomId=()=>Math.random().toString(36).slice(2);
window.isEmail=email=>/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);

// ---toastify----
window.toastify=(msg,type)=>{

    switch (type) {
        case "success":
            toast.success(msg)
            break;
        case "error":
            toast.error(msg)
            break;
        case "info":
            toast.info(msg)
            break;
        case "warning":
            toast.warning(msg)
            break;
    
        default:
            toast(msg)
            break;
    }
}
// --------random id----------
