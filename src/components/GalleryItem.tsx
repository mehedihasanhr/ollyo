import {useRef} from 'react';
import type { ImageType } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag, useDrop, DragPreviewImage } from 'react-dnd';


type Props = {
    image: ImageType;
    index: number;
    update: (dragIndex: number, hoverIndex: number) => void;
}

const GalleryItem = ({ image, index, update }:Props) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'IMAGE',
        item: { id: image.id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    const [, drop] = useDrop(() => ({
        accept: 'IMAGE',
        hover(item: { id: number, index: number }, monitor) {
            if(!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if(dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;
            if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            item.index = hoverIndex;

            update(dragIndex, hoverIndex);
        }
    }))

    drag(drop(ref));


 
    return(
        <AnimatePresence>
            <motion.div 
                className='gallery__item'
                layoutId={image.id.toString()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                ref={ref}
            >
                <img src={image.src} alt={image.alt}
                    style={{order: image.order}}
                />
            </motion.div>
        </AnimatePresence>
    )
}

export default GalleryItem