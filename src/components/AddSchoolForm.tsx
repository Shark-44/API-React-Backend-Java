import "./AddSchoolForm.css";

import { useState } from 'react';
import axios from "axios";

function AddSchoolForm ({ onClose }: { onClose: () => void }) {
    const [nameSchool, setNameSchool] = useState('');
    const [photoSchool, setPhotoSchool] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
         // Pour upload photo
    let photoFileName = '';
    if (photoSchool) {
      const formData = new FormData();
      formData.append('file', photoSchool);
      try {
        const response = await axios.post('http://localhost:8080/api/files/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        photoFileName = response.data.split(': ')[1]; 
      } catch (error) {
        console.error('Error uploading file:', error);
        return;
      }
    }
        // Creer etudiant
        const schoolData = {
            nameSchool,
            photo: photoFileName || null,
          };
          console.log('Sending data:', JSON.stringify(schoolData));
          try {
            const response = await axios.post('http://localhost:8080/api/schools', schoolData, {
              headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            });
            console.log('School created:', response.data);
            onClose();
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error('Axios error:', error.message);
              console.error('Response data:', error.response?.data);
              console.error('Response status:', error.response?.status);
            } else {
              console.error('Error creating student:', (error as Error).message);
            }
            
          }
        };




        
    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                value={nameSchool} 
                onChange={(e) => setNameSchool(e.target.value)} 
                />
                <input 
                id="file"
                type="file" 
                onChange={(e) => setPhotoSchool(e.target.files ? e.target.files[0] : null)} 
                />
                <button type="submit">Ajouter une école</button>
                <button onClick={onClose} id="close">X</button>
                </form>
        </div>
    )
}

export default AddSchoolForm;