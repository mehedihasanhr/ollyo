
import React from 'react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ImageType } from '../App';
import { m, motion } from 'framer-motion';

type MoveAbleItemProps = {
    id: number;
    index: number;
    item: any;
    moveItem: (dragIndex: number, hoverIndex: number) => void;
    children: any;
}

type DragItemType = {
    type: string;
    id: number;
    index: number;
    item: ImageType;
}

const style: React.CSSProperties = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
  }

const MoveAbleItem = ({ id, index,item, children, moveItem }: MoveAbleItemProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{isOver}, connectDrag] = useDrop({
        accept: 'card',
        hover(item: DragItemType, monitor) { 
            moveItem(item.index, index); 
        },

        collect: (monitor) => ({
            isOver: !!monitor.isOver(), 
        }),


    });

    const [{ isDragging, handleId}, connectDrop] = useDrag({
        type: 'card',
        item: { type: 'card', id, index, item},
        collect: (monitor) => ({
            handleId: monitor.getHandlerId(), 
            isDragging: monitor.isDragging(),
        }),
    });

    connectDrag(ref);
    connectDrop(ref);

    const opacity = isDragging ? 0 : 1;
    const cursor = isDragging ? 'grabbing' : 'grab';
    const boxShadow = isDragging ? '0px 0px 8px 2px rgba(0,0,0,0.2)' : 'none';

 
    
    const containerStyle = React.useMemo(() => ({ ...style, opacity }), [opacity]);

    return (
        <motion.div 
            ref={ref} 
            style={{
                x: 0,
                y: 0,
                transition: 'margin 0.2s ease-in-out',
                boxShadow,  
                backgroundColor: isOver ? '#f0f0f0' : 'transparent',
                ...containerStyle,
            }}
        >
            {children}
        </motion.div>
    );
}

export default MoveAbleItem;
 