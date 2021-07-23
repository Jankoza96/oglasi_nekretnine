import React, { useState, useEffect } from 'react';
import { DATA } from '../containers/constants';
import SearchItem from './SearchItem';

import AOS from "aos";
import "aos/dist/aos.css";

const SearchInput = (props) => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
    
    const [value, setValue] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        setValue(e.target.value);
        if (e.target.value.length === 4) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
        if (e.target.value.length > 3) {
            setData(DATA.filter((item) => item.ad_title.toLowerCase().includes(e.target.value.toLowerCase())))
        } else {
            setData([]);
        }
    }

    const renderResult = () => {
        if (!data.length) {
            return (
                <p>Nema rezultata za datu pretragu.</p>
            );
        } else {
            if (loading) {
                return (
                    <img className="loading_spinner" src="images/spinner.svg" alt="loading svg" />
                );
            } else {
                return data.slice(0, 10).map((item) => (
                    <SearchItem onClick={props.setSelectedData} data={item} key={item.id_ad} />
                ));
            }
        }
    }

    return (
        <div data-aos="fade-in"
        data-aos-duration="2000" className='search-wrap'>
            <div className="logo">
                <img className="logo_img" alt="logo" src="images/volvoxLogo.png"/>
            </div>
            <input
                className='search-input'
                placeholder='Pretraži po nazivu oglasa'
                value={value}
                onChange={handleOnChange}
            />
            <hr className="line" />
            <div className='search-results'>
                {renderResult()}
            </div>
        </div>
    )
}
export default SearchInput;