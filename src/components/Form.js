import React, {useState, useEffect} from 'react';
import { validateEmail } from '../utils/validator';
import { sendEmail } from '../utils/sendEmail';

const Form = (props) => {
    const [id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [city, setCity] = useState(0);
    const [hood, setHood] = useState('');
    const [street, setStreet] = useState('');
    const [price, setPrice] = useState('');
    const [square, setSquare] = useState(0);
    const [type, setType] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [emailValidError, setEmailValidError] = useState(false);
    const [commentError, setCommentError] = useState(false);
    const [commentOversizeError, setCommentOversizeError] = useState(false);

    const { data } = props;

    useEffect(() => {
        const {
            id_ad,
            ad_title,
            street,
            surface,
            ad_city,
            ad_hood,
            ad_type
         } = data;
         setId(id_ad);
         setTitle(ad_title || '');
         setStreet(street || '');
         setPrice(data.price || 0);
         setSquare(surface || 0);
         setCity(ad_city || '');
         setHood(ad_hood || '');
         setType(ad_type || '');
    }, [data]);

    const resetState = () => {
        setId('');
        setTitle('');
        setStreet('');
        setPrice(0);
        setSquare(0);
        setCity('');
        setHood('');
        setType('');
        setEmail('');
        setComment('');
    };

    const validateFields = () => {
        if (!email) {
            setEmailError(1);
        }
        if (!validateEmail(email)) {
            setEmailValidError(1);
        }
        if (!comment) {
            setCommentError(true);
        }
        if (comment.length > 500) {
            setCommentOversizeError(true);
        }
        if (!email || !validateEmail(email) || !comment || comment.length > 500) {
            return;
        }
        sendEmail({
            id,
            title,
            city,
            hood,
            square,
            street,
            price,
            type,
            comment,
            email
        }, (status) => {
            if (status) {
                resetState();
                props.closeModal();
            }
        });
    };

    const handleOnChange = (e, setState, setError) => {
        setError && setError(false);
        setState(e.target.value);
    };

    return (
        <div className='form-wrap'>
            <div className='form-group'>
                <label htmlFor="ad_title">Naslov oglasa:</label>
                <input readOnly type="text" value={title} onChange={(e) => handleOnChange(e, setTitle)} id="ad_title" placeholder="Naslov oglasa" />
            </div>
            <div className="form-group">
                <label htmlFor="ad_city">Grad:</label>
                <input readOnly type="text" value={city} onChange={(e) => handleOnChange(e, setCity)} id="ad_city" placeholder="Grad" />
            </div>
            <div className="form-group">
                <label htmlFor="hood">Deo grada:</label>
                <input readOnly type="text" value={hood} onChange={(e) => handleOnChange(e, setHood)} id="hood" placeholder="Deo grada" />
            </div>
            <div className="form-group">
                <label htmlFor="street">Ulica:</label>
                <input readOnly type="text" value={street} onChange={(e) => handleOnChange(e, setStreet)} id="street" placeholder="Ulica" />
            </div>
            <div className="form-group">
                <label htmlFor="price">Cena:</label>
                <input readOnly type="number" min="0" value={price} onChange={(e) => handleOnChange(e, setPrice)} id="price" placeholder="Cena" />
            </div>
            <div className="form-group">
                <label htmlFor="square">Kvadratura:</label>
                <input readOnly type="number" min="0" value={square} onChange={(e) => handleOnChange(e, setSquare)} id="square" placeholder="Kvadratura" />
            </div>
            <div className="form-group">
                <label htmlFor="type">Tip nekretnine:</label>
                <input readOnly type="text" value={type} onChange={(e) => handleOnChange(e, setType)} id="type" placeholder="Tip nekretnine" />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input className={`${(emailError || emailValidError) && 'error-input'}`} type="email" value={email} onChange={(e) => { handleOnChange(e, setEmail, setEmailError); setEmailValidError(0) }} id="email" placeholder="E-mail" />
                {emailError === 1 ? <div className="error">Email polje ne sme da bude prazno.</div> : null}
                {emailValidError === 1 ? <div className="error">Email nije validan.</div> : null}
            </div>
            <div className="form-group">
                <label htmlFor="comment">Komentar:</label>
                <textarea className={`${(commentError || commentOversizeError) && 'error-input'}`} value={comment} onChange={(e) => { handleOnChange(e, setComment, setCommentError); setCommentOversizeError(false)}} id="comment" cols="30" rows="10" maxLength="500" placeholder="Unesite komentar..." />
                <span className={`comment-size ${comment.length > 500 && 'error '}`}>{comment.length}</span>
                {commentError && <div className="error">Polje komentara ne sme da bude prazno.</div>}
                {commentOversizeError && <div className="error">Komentar ne sme da predje više od 500 karaktera.</div>}
            </div>
            <div className="form-group mt-2">
                <button onClick={validateFields}>Potvrdi</button>
            </div>
            
        </div>
    )
};

export default Form;