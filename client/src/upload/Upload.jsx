import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Upload() {
    const [file, setFile] = useState(null); // Default to null
    const [images, setImages] = useState([]); // Updated to plural for clarity
  
    const fileHandler = () => {
      const formData = new FormData();
      formData.append('file', file);
  
      axios.post("http://localhost:8800/upload", formData)
        .then((res) => {
          // console.log(res.data);
          setFile(null); // Reset file input
          fetchImages(); // Refresh images after upload
        })
        .catch((err) => console.log(err));
    };
  
    const fetchImages = () => {
      axios.get("http://localhost:8800/getImage")
        .then((res) => setImages(res.data.map((user) => user.image))) // Map to extract image filenames
        .catch((err) => console.log(err));
    };
  
    useEffect(() => {
      fetchImages();
    }, []);
  
    return (
      <div className="App">
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])}
           
        />
        <button onClick={fileHandler}>Upload</button>
        <br /><br />
  
        {images.length > 0 ? (
          images.map((img, index) => (
            <img 
              key={index} // Unique key
              src={`http://localhost:8800/images/${img}`} 
              alt={`Uploaded file ${index + 1}`} 
              style={{ maxWidth: "200px", margin: "10px" }} // Basic styling
            />
          ))
        ) : (
          <p>No images uploaded yet.</p>
        )}
      </div>
    );
  }
  
 
  