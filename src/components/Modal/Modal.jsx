import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styles from "../styles.module.css";
import Loader from "components/Loader";

const modalRoot = document.querySelector("#root-modal");

const Modal =({imageUrl, tags, onClose})=> {
  const[isLoading, setIsLoading]= useState(true);

 const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleESC = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
  
    document.addEventListener("keydown", handleESC);
    document.body.style.overflow = "hidden";
  
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setIsLoading(false);
    };
  
    return () => {
      document.removeEventListener("keydown", handleESC);
      document.body.style.overflow = "auto";
    };
  }, [imageUrl,onClose]);
  


    return createPortal(
      <div className={styles.Overlay} onClick={handleBackdropClick}>
        <div className={styles.Modal}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <img src={imageUrl} alt={tags} />
            </>
          )}
        </div>
      </div>,
      modalRoot
    );
}

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
