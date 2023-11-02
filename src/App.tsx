import './App.css' 
import Gallery from './components/Gallery';


const images = [
  {id: 1, src: "/images/image-11.jpeg", alt: "image-1", order: 1},
  {id: 2, src: "/images/image-10.jpeg", alt: "image-2", order: 2},
  {id: 3, src: "/images/image-9.webp", alt: "image-3", order: 3}, 
  {id: 4, src: "/images/image-8.webp", alt: "image-4", order: 4},
  {id: 5, src: "/images/image-7.webp", alt: "image-5", order: 5},
  {id: 6, src: "/images/image-6.webp", alt: "image-6", order: 6},
  {id: 7, src: "/images/image-5.webp", alt: "image-7", order: 7},
  {id: 8, src: "/images/image-4.webp", alt: "image-8", order: 8},
  {id: 9, src: "/images/image-3.webp", alt: "image-9", order: 9},
  {id: 10, src: "/images/image-2.webp", alt: "image-10", order: 10},
  {id: 11, src: "/images/image-1.webp", alt: "image-11", order: 11} 
]

export type ImageType = typeof images[0];
 

function App() {

  return (
    <div className='container'>
      <Gallery images={images} /> 
    </div>
  )
}

export default App
