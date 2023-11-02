import { ImageType } from "../App";

type GalleryItemProps = {
    image: ImageType;
    onImageClick: (image: ImageType) => void;
}

const GalleryItem = ({ image, onImageClick }: GalleryItemProps) => {
    return (
        <div className="gallery__item" onClick={() => onImageClick(image)}>
            <img src={image.src} alt={image.title} />
        </div>
    );
}

export default GalleryItem;