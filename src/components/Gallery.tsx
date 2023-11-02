import React from 'react'
import { ImageType } from '../App'
import MoveAbleItem from './MoveAbleItem'
import GalleryItem from './GalleryItem'
import update from 'immutability-helper'

const Gallery = ({ images }: { images: ImageType[] }) => {
    const [ items, setItems ] = React.useState(images)
    const [ requestedFrame, setRequestedFrame ] = React.useState(false)

    const moveItem = (dragIndex: number, hoverIndex: number) => {
        const dragItem = items[dragIndex]
        const hoverItem = items[hoverIndex]

        setItems(update(items, {
            $splice: [
                [dragIndex, 1, hoverItem],
                [hoverIndex, 1, dragItem]
            ]
        }))

        scheduleFrame()

    }

    const scheduleFrame = () => {
        if(!requestedFrame){
            requestAnimationFrame(drawFrame)
            setRequestedFrame(true)
        }
    }

    React.useEffect(() => {
        return () => {
            if(requestedFrame){
                cancelAnimationFrame(requestedFrame)
            }
        }
    })


    const drawFrame = () => {
         setRequestedFrame(false)
    }

    
 

    return(
        <div className='gallery'>
            <div className="gallery__body">
            {items.map((image, index) => (
               <MoveAbleItem key={image.id} index={index} item={image} id={image.id} moveItem={moveItem}>
                    <GalleryItem image={image} onImageClick={() => ''}/>
               </MoveAbleItem>
            ))}
            </div>
        </div>
    )
}

export default Gallery