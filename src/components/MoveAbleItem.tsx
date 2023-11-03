
import React, { memo } from 'react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend'
import { ImageType } from '../App';
import { m, motion } from 'framer-motion';

type MoveAbleItemProps = {
    id: number;
    index: number;
    item: any;
    moveItem: (dragIndex: number, hoverIndex: number) => void;
    children: any;
    setTargetItem: (item: {[key: string]: any}) => void;
    
}

type DragItemType = {
    type: string;
    id: number;
    index: number;
    item: ImageType;
}

const style: React.CSSProperties = { 
    backgroundColor: 'white',
    cursor: 'move',
  }

const MoveAbleItem = memo(function MoveAbleItem({ id, index,item, children, moveItem, setTargetItem  }: MoveAbleItemProps){
    const ref = useRef<HTMLDivElement>(null);
    
    const [ , connectDrop] = useDrop({
        accept: 'card',
        hover(item: DragItemType, monitor) {  
            setTargetItem({
                id: id,
                index: index,
                item: item,
                ref: ref,
            });  

            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }

            
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            //only x axis
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientX = (clientOffset as any).x - hoverBoundingRect.left;
 
            //only x axis
            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                return;
            }
  
            //only x axis
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                return;
            }
  
           
            // re-order items
            moveItem(dragIndex, hoverIndex); 
            item.index = hoverIndex;
        },

        collect: (monitor) => ({
            isOver: !!monitor.isOver(), 
            canDrop: !!monitor.canDrop(),  
        }),


    });

    const [{ isDragging, handleId}, connectDrag, preview] = useDrag({
        type: 'card',
        item: { type: 'card', id, index, item, ref},
        collect: (monitor) => ({
            handleId: monitor.getHandlerId(), 
            isDragging: monitor.isDragging(),
        }),
    });

    connectDrag(ref);
    connectDrop(ref);

    // use empty image as drag preview so browsers don't draw it
    React.useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, [])

    const opacity = isDragging ? 0 : 1;
    const zIndex = isDragging ? 2 : 1;
    const cursor = isDragging ? 'grabbing' : 'grab';
    const boxShadow = isDragging ? '0px 0px 8px 2px rgba(0,0,0,0.2)' : 'none';
 
    
    const containerStyle = React.useMemo(() => ({ ...style, opacity }), [opacity]);

    return (
        <motion.div
            ref={ref}
            style= {{
                ...containerStyle,
                cursor,
                boxShadow,
                zIndex,
            }}
            layout   
            className='gallery__item__moveable'
            data-handler-id={handleId}
        >
            {children}
        </motion.div>
    );
})

export default MoveAbleItem;
 