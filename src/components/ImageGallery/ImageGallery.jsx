import React, { useState, useEffect } from "react";
import styles from "../styles.module.css";
import { toast, ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import ImageGalleryItem from "./ImageGalleryItem";
import Loader from "components/Loader";

const ImageGallery = ({
  img,
  page,
  updateTotalResults,
  onOpenModal,
  isLoadingButton,
  setLoadingButton,
}) => {
  const [images, setImages] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [prevImg, setPrevImg] = useState("");
  const [prevPage, setPrevPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      const KEY = "34890929-c294eed46e5ac027db1a12ad9";
      const url = `https://pixabay.com/api/?q=${img}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

      setIsLoading(true);

      try {
        const response = await fetch(url);
        const data = await response.json();
        const hits = data.hits;
        const total = data.total;

        if (img !== prevImg) {
          setImages(hits);
          setTotalResults(total);
          setIsLoading(false);
        } else {
          setImages((prevImages) => [...prevImages, ...hits]);
          setTotalResults(total);
          setIsLoading(false);
        }

        updateTotalResults(total);

        if (img !== prevImg) {
          toast.info(`Total results: ${total}`, {
            position: "top-right",
            autoClose: 3000,
          });
        }

        setLoadingButton(false);
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        toast.warn("Something went wrong", {
          position: "top-center",
          autoClose: 3000,
        });

        setIsLoading(false);
        setLoadingButton(false);
      }
    };

    if (img !== prevImg || page !== prevPage) {
      fetchImages();
    }
    
    setPrevImg(img);
    setPrevPage(page);
  }, [img, page, prevImg, prevPage, updateTotalResults, setLoadingButton]);

  return (
    <div>
      <ul className={styles.ImageGallery}>
        {images.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            webformatURL={webformatURL}
            tags={tags}
            id={id}
            key={id}
            largeImageURL={largeImageURL}
            onOpenModal={() => onOpenModal(largeImageURL, tags)}
          />
        ))}
      </ul>
      {isLoading && <Loader />}
      {isLoadingButton && <Loader />}
      {totalResults > 0 && <ToastContainer />}
    </div>
  );
};

ImageGallery.propTypes = {
  img: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  updateTotalResults: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  isLoadingButton: PropTypes.bool.isRequired,
  setLoadingButton: PropTypes.func.isRequired,
};

export default ImageGallery;
