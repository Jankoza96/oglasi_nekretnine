import React, {useEffect} from 'react';

import AOS from "aos";
import "aos/dist/aos.css";

const SearchItem = (props) => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
    const {
       ad_title,
       street,
       price,
       surface,
       ad_city,
       ad_hood,
       ad_type
    } = props.data;
    return (
        <div data-aos="fade-down"
        data-aos-duration="700" data-aos-offset="-50" className="search-result">
            <p className="title">{ad_title}</p>
            <div className="search-item">
                <div className="search-item-wrap">
                    <p  className="info1"> GRAD: {ad_city}</p>
                    <p className="info1">NASELJE: {ad_hood}</p>
                    <p className="info1"> ULICA: {street}</p>
                </div>
                <div className="search-item-wrap">
                    
                    <p className="info">TIP NEKRETNINE: {ad_type}</p>
                    <p className="info">KVADRATURA: {surface} m²</p>
                    <p className="price">Cena: {price}€</p>
                </div>
            </div>
            <div className="button-container">
                <button className="search-button" onClick={() => props.onClick(props.data)}>POŠALJI</button>
            </div>
        </div>
    );
};

export default SearchItem;