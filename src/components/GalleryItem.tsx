import { memo } from "react";
import { ImageType } from "../App";

type GalleryItemProps = {
    image: ImageType;
    selected: boolean;
    onSelect?: (image: ImageType) => void;
}

const GalleryItem = memo(function GalleryItem ({ image, selected, onSelect }: GalleryItemProps){
    return ( 
        <div className={`gallery__item ${selected ? 'gallery__item__selected' : ''}`}>
             <input 
                type="checkbox"
                checked={selected}
                className="gallery__item__checkbox" 
                onChange={() => onSelect && onSelect(image)} 
            />
            <img src={image.src} alt={image.title} className="gallery__item"/>
        </div>
    );
});

export default GalleryItem;