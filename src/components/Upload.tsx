
const Upload = ({onUpload}: {onUpload: (preview: string[], files: FileList) => void}) =>{
   
    // handle files upload
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if(files) {
            // preview images
            const images: string[] = [];
            
            for(let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                // read file as data url
                reader.readAsDataURL(file);
                reader.onloadend = () => { 
                    images.push(reader.result as string);
                    if(i === files.length - 1) onUpload(images, files);
                }
            }  
        }
        
    }

    return(
        <div className="gallery__item gallery__item__upload">

            {/* multi files input */}
            <input 
                type="file" 
                multiple
                onChange={handleUpload}
                className="gallery__item__upload__input" 
            />


           <div className="gallery__item__upload__container">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    width="24" 
                    height="24"
                    className="gallery__item__upload__icon"
                >
                    <path d="M9,5.5c0-.83,.67-1.5,1.5-1.5s1.5,.67,1.5,1.5-.67,1.5-1.5,1.5-1.5-.67-1.5-1.5Zm15-.5v6c0,2.76-2.24,5-5,5H10c-2.76,0-5-2.24-5-5V5C5,2.24,7.24,0,10,0h9c2.76,0,5,2.24,5,5ZM7,11c0,.77,.29,1.47,.77,2.01l5.24-5.24c.98-.98,2.69-.98,3.67,0l1.04,1.04c.23,.23,.62,.23,.85,0l3.43-3.43v-.38c0-1.65-1.35-3-3-3H10c-1.65,0-3,1.35-3,3v6Zm15,0v-2.79l-2.02,2.02c-.98,.98-2.69,.98-3.67,0l-1.04-1.04c-.23-.23-.61-.23-.85,0l-4.79,4.79c.12,.02,.24,.02,.37,.02h9c1.65,0,3-1.35,3-3Zm-3.91,7.04c-.53-.15-1.08,.17-1.23,.7l-.29,1.06c-.21,.77-.71,1.42-1.41,1.81-.7,.4-1.51,.5-2.28,.29l-8.68-2.38c-1.6-.44-2.54-2.09-2.1-3.69l.96-3.56c.14-.53-.17-1.08-.7-1.23-.53-.14-1.08,.17-1.23,.7L.18,15.29c-.73,2.66,.84,5.42,3.5,6.15l8.68,2.38c.44,.12,.89,.18,1.33,.18,.86,0,1.7-.22,2.47-.66,1.16-.66,1.99-1.73,2.35-3.02l.29-1.06c.15-.53-.17-1.08-.7-1.23Z"/>
                </svg>

                <h3 className="gallery__item__upload__text">Add Images</h3>
           </div>
        </div>
    )
}

export default Upload;