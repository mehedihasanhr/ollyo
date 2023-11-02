import './App.css' 
import Gallery from './components/Gallery';
import { images } from './utils/data';

export type ImageType = typeof images[0];
 

function App() {

  return (
    <div className='container'>
      <Gallery images={images} /> 
    </div>
  )
}

export default App
