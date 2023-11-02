import * as React from 'react';
import GalleryItem from './GalleryItem';
import Upload from './Upload';
import GalleryItems from './GalleryItems';


type GalleryProps = {
    images: {id: number, src: string, alt: string, order: number}[];
}

const Gallery = ({images}: GalleryProps): React.ReactNode => {
    const [galleryItems, setGalleryItems] = React.useState<string[]>(images); // gallery items [images
    const [selectedImages, setSelectedImages] = React.useState<string[]>([]);

    // function to select an image
    const onSelect = (image: string) => { 
        /* 
            * check if image is already selected or not
            * find index of image in selected images array
            * if index is not -1, remove image from selected images 
            * else add image to selected images
        */

        const index = selectedImages.indexOf(image); 

        if(index !== -1) {
            // remove image from selected images
            const newSelectedImages = [...selectedImages]; // copy array
            newSelectedImages.splice(index, 1); // remove 1 element at index
            setSelectedImages(newSelectedImages); // update state
        }else setSelectedImages([...selectedImages, image]);
    }

    // function to handle files upload
    const handleFilesUpload = (previews: string[], files: FileList) => {
       const newGalleryItems = [...galleryItems]; // copy array
         for(let i = 0; i < files.length; i++) {
              newGalleryItems.push(previews[i]);
         }

            setGalleryItems(newGalleryItems); // update state   
    }

    // handle delete images
    const handleDeleteImages = (images: string | string[]) => {
        const newGalleryItems = [...galleryItems]; // copy array
        if(typeof images === 'string') {
            const index = newGalleryItems.indexOf(images);
            newGalleryItems.splice(index, 1);
        }else {
            images.forEach(image => {
                const index = newGalleryItems.indexOf(image);
                newGalleryItems.splice(index, 1);
            })
        }

        setGalleryItems(newGalleryItems); // update state
    }

    const lengthOfSelectedImages = selectedImages.length; // length of selected images
     
    return(
        <div className="gallery">
            <div className="gallery__header">
                <div className="gallery__header__title">
                    {lengthOfSelectedImages > 0 ? 
                        <h1>{lengthOfSelectedImages} {lengthOfSelectedImages > 1 ? 'Files': 'File'} Selected</h1> : 
                        <h1>Gallery</h1>
                    } 
                </div>
                {lengthOfSelectedImages > 0 ? 
                    <div className="gallery__header__actions"> 
                        <button 
                            className="gallery__header__actions__button" 
                            onClick={() => handleDeleteImages(selectedImages)}
                        >
                            Delete {lengthOfSelectedImages > 1 ? 'Files': 'File'}
                        </button>
                    </div>: null
                }
            </div>

            <GalleryItems
                galleryItems={galleryItems}
                onSelect={onSelect}
                selectedImages={selectedImages}
                handleFilesUpload={handleFilesUpload}
                updateGalleryItems={setGalleryItems}
            />
        </div>
    )
}

export default Gallery;