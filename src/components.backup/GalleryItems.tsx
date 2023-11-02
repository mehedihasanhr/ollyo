import * as React from "react"
import { useDrop, useDragDropManager } from "react-dnd"
import Upload from "./Upload"
import GalleryItem from "./GalleryItem"
import { ItemType } from "../utils/dragConfig"


type PropTypes = {
    galleryItems: string[];
    onSelect: (image: string) => void;
    selectedImages: string[];
    handleFilesUpload: (previews: string[], files: FileList) => void;
    updateGalleryItems: (images:string[]) => void;
}

const GalleryItems = ({galleryItems, updateGalleryItems, onSelect, selectedImages, handleFilesUpload}: PropTypes) => {
    
    // drop function 
    const handleDrop = (item: string, target:string) => {
        const targetIndex = galleryItems.indexOf(target);
        const itemIndex = galleryItems.indexOf(item);

        const newGalleryItems = [...galleryItems];
        newGalleryItems.splice(itemIndex, 1);
        newGalleryItems.splice(targetIndex, 0, item);

        updateGalleryItems(newGalleryItems);
    }

    // control drag
    const handleDragging = (item: string, target: string) => {
        const targetIndex = galleryItems.indexOf(target);
        const itemIndex = galleryItems.indexOf(item);

        const newGalleryItems = [...galleryItems];
        newGalleryItems.splice(itemIndex, 1);
        newGalleryItems.splice(targetIndex, 0, item);

        updateGalleryItems(newGalleryItems);
    }

    return(
        <div className="gallery__body">
            {galleryItems.length > 0 ?
                galleryItems.map((image: string, index: number) => (
                    <React.Fragment key={index}> 
                        <GalleryItem 
                            image={image} 
                            selected = {selectedImages.indexOf(image) !== -1} 
                            onSelect={onSelect}
                            onDrop={handleDrop}
                            onDragging={handleDragging}
                        />
                    </React.Fragment> 
                )) 
            : null}

            {galleryItems.length === 0 ? 
                <div className="gallery__body__empty">
                    <h1>No Images Found</h1>
                </div>
            : null}

            <Upload
                onUpload={handleFilesUpload}
            />
        </div>
    )
}

export default GalleryItems;