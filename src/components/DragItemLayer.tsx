import { motion } from 'framer-motion'
import { useDragLayer } from 'react-dnd'
import React from 'react'

export const DragItemLayer = ({dropItem}: {dropItem: {[key: string]: any}}) => {
  

  const { isDragging, item, currentOffset } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),  
  }))
 

  if(!isDragging) return null;
  if(currentOffset === null) return null;

  const dragItemRef = item?.ref;
  const width = dropItem?.ref?.current?.offsetWidth;
  const height = dropItem?.ref?.current?.offsetHeight; 

   
 
  return (
    <motion.div  
      initial={false}
      animate={{
        width: width,
        height: height,
      }}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        top: currentOffset?.y,
        left: currentOffset?.x,
        width: width,
        height: height,
        zIndex: 1000,  
      }}  
    >
      <motion.div 
        animate={{
          width: width,
          height: height,
        }} 
        style={{
          width: width,
          height: height,
          backgroundColor: 'white', 
          borderRadius: 10,
          overflow: 'hidden',
          border: '1px solid #ccc'
        }}
      >
         <img 
          src={item?.item?.src} 
          alt="" 
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        /> 
      </motion.div>
    </motion.div>
  )
}
