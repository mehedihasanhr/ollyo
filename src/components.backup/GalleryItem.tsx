import * as React from 'react';
import { useDrag, useDrop } from 'react-dnd'
import { ItemType } from '../utils/dragConfig';
import { motion, useAnimate } from 'framer-motion';


type PropTypes = {
    image: string;
    selected: boolean;
    onDrop: (item: string, target:string) => void;
    onSelect: (image: string) => void;
    onDragging: (item: string, target:string) => void;
}

const GalleryItem = ({image, selected, onSelect, onDrop, onDragging}: PropTypes) => {

    const dragItemRef = React.useRef<HTMLDivElement>(null); // drag item ref
        const  animate = useAnimate();



    // drop function
    const [{isOver}, drop] = useDrop({
        accept: ItemType.GALLERY_IMAGE,
        drop: (item: {image: string, ref: React.RefObject<HTMLDivElement>}) => { 
            if(item){ 
                onDrop(item.image, image);
            } 
        },
        hover: (item: {image: string, ref: React.RefObject<HTMLDivElement>}) => {
            // if over item is not the same as dragged item 
            if(item && item.image !== image) {
                onDragging(item.image, image);
            }
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    }, [image])

    // drop ref 



    // drag control
    const [_, drag] = useDrag({
        type: ItemType.GALLERY_IMAGE,
        item: {image, ref: dragItemRef}, // item to drag 
        collect: monitor => ({ 
            isDragging: !!monitor.isDragging()
        })
    })
 
    // drag item ref
    drag(drop(dragItemRef));

 
    return(
        <motion.div 
            ref={dragItemRef} 
            className={`gallery__item ${selected ? 'gallery__item__selected' : ''}`}
        >
            <input 
                type="checkbox"
                checked={selected}
                className="gallery__item__checkbox" 
                onChange={() => onSelect(image)} 
            />
            <>{image}</>
            <img src={image} />
        </motion.div>
    )
}

export default GalleryItem;