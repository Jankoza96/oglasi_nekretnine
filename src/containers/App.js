import React, {useState, useEffect, useRef} from 'react';
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import SearchInput from '../components/SearchInput'
import Modal from '../components/Modal';
import { initEmailJs } from '../utils/sendEmail';

function App() {
  const [data, setData] = useState({});

  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current.style.display = 'block';
};

  const closeModal = () => {
      modalRef.current.style.display = 'none';
      setData({});
  };

  const handleSelectedData = (newData) => {
    setData(newData);
    openModal();
  }

  useEffect(() => {
    initEmailJs();
  }, []);

  return (
    <div className='container'>
      <SearchInput setSelectedData={handleSelectedData} />
      <Modal data={data} modalRef={modalRef} closeModal={closeModal} />
      <ToastContainer />
    </div>
  );
}

export default App;
