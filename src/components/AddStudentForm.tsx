import { useState } from 'react';
import axios from 'axios';

import "./AddStudentForm.css"

function AddStudentForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Pour upload photo
    let photoFileName = '';
    if (photo) {
      const formData = new FormData();
      formData.append('file', photo);
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
    const studentData = {
        name,
        firstname,
        birthday: birthday || null,
        photo: photoFileName || null,
      };
      console.log('Sending data:', JSON.stringify(studentData));
      try {
        const response = await axios.post('http://localhost:8080/api/students', studentData, {
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        console.log('Student created:', response.data);
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
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Nom" 
        />
        <input 
          type="text" 
          value={firstname} 
          onChange={(e) => setFirstname(e.target.value)} 
          placeholder="Prénom" 
        />
        <input 
          type="date" 
          value={birthday} 
          onChange={(e) => setBirthday(e.target.value)} 
        />
        <input 
          id="file"
          type="file" 
          onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)} 
        />
        <button type="submit">Ajouter l'étudiant</button>
        <button onClick={onClose} id="close">X</button>
      </form>
    </div>
  );
}

export default AddStudentForm;