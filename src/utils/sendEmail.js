import { init, send } from 'emailjs-com';
import { toast } from 'react-toastify';

export const initEmailJs = () => {
    init(process.env.REACT_APP_USER_ID);
};

export const sendEmail = async (data, cb) => {
    const {
        id,
        title,
        street,
        price,
        square,
        city,
        hood,
        type,
        comment,
        email,
    } = data;
    toast.info("Slanje email-a.", {
        autoClose: 3000,
        position: 'bottom-right',
        hideProgressBar: true,
        closeOnClick: true,
    })
    try {
        const responseStatus =  await send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID,{
            id_ad: id,
            ad_title: title,
            street: street,
            price: price,
            surface: `${square}m2`,
            ad_city: city,
            ad_hood: hood,
            ad_type: type,
            comment: comment,
            email: email,
        });
        if (responseStatus.status === 200) {
            toast.success("Email uspešno poslat", {
                autoClose: 5000,
                position: 'bottom-right',
                hideProgressBar: false,
                closeOnClick: true,
            })
            return cb(true);
        } else {
            toast.error("Greska prilikom slanja email-a.", {
                autoClose: 5000,
                position: 'bottom-right',
                hideProgressBar: false,
                closeOnClick: true,
            });
            return cb(false);
        }
    } catch(e) {
        console.log(e);
        return cb(false);
    }
}