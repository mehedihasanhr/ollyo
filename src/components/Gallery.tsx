import React from 'react'
import { ImageType } from '../App'
import MoveAbleItem from './MoveAbleItem'
import GalleryItem from './GalleryItem'
import update from 'immutability-helper'

import { DragItemLayer } from './DragItemLayer'
import Upload from './Upload'

const Gallery = ({ images }: { images: ImageType[] }) => {
    const [ targetItem, setTargetItem] = React.useState<{[key: string]: any}>({})
    const [selectedItems, setSelectedItems] = React.useState<ImageType[]>([])
    const [ items, setItems ] = React.useState(images)
    const [ requestedFrame, setRequestedFrame ] = React.useState(0)

    // rearrange items when drag and drop
    const moveItem = (dragIndex: number, hoverIndex: number) => {
        const dragItem = items[dragIndex] 
        if(dragIndex === hoverIndex) return

        // update items position
        setItems(update(items, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragItem],
            ],
        }))
  
        setRequestedFrame(requestedFrame + 1) // force re-render
    }  
 
    React.useEffect(() => {
        setItems(images)
    }, [images])


    // handle files upload
    const handleUploadFiles = (_preview: string[], files: FileList) => {
        const newItems = [...items] as ImageType[];
        for(let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            // read file as data url
            reader.readAsDataURL(file);
            reader.onloadend = () => { 
                newItems.push({
                    id: Date.now(),
                    src: reader.result as string,
                    title: file.name,
                    order: newItems.length + 1,
                }) 
                if(i === files.length - 1) setItems(newItems);
            }
        }  
    }


    // handle image selection
    const handleImageSelection = (image: ImageType) => { 
        if(selectedItems.includes(image)) {
            setSelectedItems(selectedItems.filter((item) => item.id !== image.id))
        } else {
            setSelectedItems([...selectedItems, image])
        }
    }  

    // handle delete images
    const handleDeleteImages = (images: ImageType | ImageType[]) => {
        const newGalleryItems = [...items]; // copy array
        
        // if images is an array, remove all images
        if(Array.isArray(images)) {
            images.forEach(image => {
                const index = newGalleryItems.indexOf(image);
                newGalleryItems.splice(index, 1);
            })
        }
        else {
            const index = newGalleryItems.indexOf(images);
            newGalleryItems.splice(index, 1);
        }
         
        setItems(newGalleryItems); // update state
    }

    const lengthOfSelectedImages = selectedItems.length; // length of selected images
      
    return (
        <>
            <div className="gallery">
            <div className="gallery__header">
                <div className="gallery__header__title">
                    {lengthOfSelectedImages > 0 ? 
                        <div className='gallery__header__title_text'>
                            <input type='checkbox' checked={lengthOfSelectedImages !== 0} onChange={() => {setSelectedItems([])}} />
                            <h1>{lengthOfSelectedImages} {lengthOfSelectedImages > 1 ? 'Files': 'File'} Selected</h1> 
                        </div>: 
                        <h1>Gallery</h1>
                    } 
                </div>
                {lengthOfSelectedImages > 0 ? 
                    <div className="gallery__header__actions"> 
                        <button 
                            className="gallery__header__actions__button" 
                            onClick={() => handleDeleteImages(selectedItems)}
                        >
                            Delete {lengthOfSelectedImages > 1 ? 'Files': 'File'}
                        </button>
                    </div>: null
                }
            </div>
                <div className="gallery__body">
                    {items.map((item, index) => (
                        <MoveAbleItem
                            key={item.id}
                            id={item.id}
                            index={index}
                            moveItem={moveItem}
                            item={item}
                            setTargetItem={setTargetItem}
                        >
                            <GalleryItem 
                                image={item} 
                                selected={selectedItems.includes(item)} 
                                onSelect={handleImageSelection}
                            />
                        </MoveAbleItem>
                    ))} 

                    <Upload onUpload={handleUploadFiles} />
                </div>
                
            </div>
            <DragItemLayer  dropItem={targetItem} />
        </>
    )
}

export default Gallery