import { useState  } from 'react';
import type { ImageType } from '../App';
import GalleryItem from './GalleryItem';

type Props = {
    images: ImageType[];
}

// drag and drop able gallery with framer motion and react dnd smooth drag and drop

const Gallery = ({images}: Props) => {
    const [galleryItems, setGalleryItems] = useState<ImageType[]>(images);
   

    const update = (dragIndex: number, hoverIndex: number) => {
        const dragItem = galleryItems[dragIndex];
        setGalleryItems(prevState => {
            const coppiedState = [...prevState];
            coppiedState.splice(dragIndex, 1);
            coppiedState.splice(hoverIndex, 0, dragItem);
            return coppiedState;
        })
    }


    return(
        <div className="gallery"> 
           <div className='gallery__body'>
                {galleryItems.map((image: ImageType, index: number) => (
                   <GalleryItem key={image.id} image={image} index={index} update={update}/> 
                ))}
            </div> 
        </div>
    )
}

export default Gallery