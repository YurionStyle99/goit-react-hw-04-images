import React, { useState } from "react";
import styles from "./styles.module.css";
import Searchbar from "./Search";
import ImageGallery from "./ImageGallery";
import Button from "./BtnLoadMore/Button";
import Modal from "./Modal";
import Loader from "./Loader/Loader";

const App =()=> {
  const [searchImg, setSearchImg] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTags, setSelectedTags] = useState('');
  const [isLoadingButton, setIsLoadingButton] = useState(false);

const handleSubmitSearch = (imgName) => {
  setSearchImg(imgName)
  setCurrentPage(1)
  setTotalResults(0)
  };

  const updateTotalResults = (total) => {
    setTotalResults(total);
  };

 const handleLoadMore = () => {
  setCurrentPage(currentPage+1)
  setIsLoadingButton(true)
  };

 const handleOpenModal = (imageUrl, tags) => {
    setSelectedImage(imageUrl)
    setSelectedTags(tags)
  };

 const handleCloseModal = () => {
  setSelectedImage(null)
  };

 const setLoadingButton = (isLoading) => {
  setIsLoadingButton(isLoading)
  };

    const showButton = totalResults > 12 && currentPage < Math.ceil(totalResults / 12);

    return (
      <div className={styles.container}>
        <Searchbar searchValue={handleSubmitSearch} />
        <ImageGallery
          img={searchImg}
          page={currentPage}
          updateTotalResults={updateTotalResults}
          onOpenModal={handleOpenModal}
          isLoadingButton={isLoadingButton}
          setLoadingButton={setLoadingButton}
        />
        {showButton && (
          <>
            {isLoadingButton && <Loader />}
            <Button onClick={handleLoadMore} />
          </>
        )}
        {selectedImage && (
          <Modal
            imageUrl={selectedImage}
            tags={selectedTags}
            onClose={handleCloseModal}
          />
        )}
      </div>
    );
}

export default App;