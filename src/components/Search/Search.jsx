import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaSistrix } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles.module.css";

const   Searchbar = ({searchValue}) =>{
  const [searchImg, setSearchImg] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);


 const handleChangeSearch = evt => {
  setSearchImg(evt.currentTarget.value.toLowerCase());
  }

  const handleOnSubmit = evt => {
    evt.preventDefault();
    if (searchImg.trim() === '') {
      showToastWarning("Set name");
    } else {
      searchValue(searchImg);
      setSearchImg('');
    }
  }

 const showToastWarning = message => {
    if (!isToastOpen) {
      toast.warn(message, {
        toastId: "custom-id-yes",
        onClose: () => setIsToastOpen(false),
      });
      setIsToastOpen(true);
    }
  }

    return (
      <header className={styles.Searchbar} onSubmit={handleOnSubmit}>
        <form className={styles.SearchForm}>
          <input
            className={styles.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            value={searchImg}
            placeholder="Search images and photos"
            onChange={handleChangeSearch}
          />
          <button type="submit" className={styles.SearchForm_button}>
            <FaSistrix />
          </button>
        </form>
        <ToastContainer />
      </header>
    );
}

Searchbar.propTypes = {
  searchValue: PropTypes.func.isRequired
};

export default Searchbar;
