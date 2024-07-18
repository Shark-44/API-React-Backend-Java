import "./ManageSchool.css"

import { useState, useEffect } from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import BTreturn from "../components/BTreturn";
import portrait from "../assets/images/portrait.png";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

type Langage = {
    idLangage: number;
    nameLangage: string;
}

function ManageSchool () {
    const query = useQuery();
    const id = query.get('id');
    const [nameSchool, setNameSchool] = useState('');
    const [photoSchool, setPhotoSchool] = useState<File | string>(portrait);
    const [listLangage, setListLangage] = useState<Langage[]>([]);
    const [selectedLangageIds, setSelectedLangageIds] = useState<number[]>([]);

   // infos sur école
   useEffect(() => {
    if (id) {
        axios.get(`http://localhost:8080/api/schools/${id}`)
            .then((res) => {
                const school = res.data;
                setNameSchool(school.nameSchool);
                setPhotoSchool(school.photoSchool || portrait);
            })
            .catch((error) => {
                console.error('Error fetching student data:', error);
            });
    }
}, [id]);

    // les languages proposés 
    useEffect(() => {
        
            axios.get(`http://localhost:8080/api/langages`)
                .then((res) => setListLangage(res.data))
                .catch((error) => {
                    console.error('Error fetching langage:', error);
                });
        
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let photoFileName = '';
        if (photoSchool && typeof photoSchool !== 'string') {
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

        const schoolData = {
            nameSchool,
            photoSchool: photoFileName || (typeof photoSchool === 'string' ? photoSchool : null),
        };

console.info(schoolData)

        try {
            const response = await axios.put(`http://localhost:8080/api/schools/${id}`, schoolData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            console.log('School updated:', response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message);
                console.error('Response data:', error.response?.data);
                console.error('Response status:', error.response?.status);
            } else {
                console.error('Error updating school:', (error as Error).message);
            }
        }
    
    }

    // inscription au cours des langages
    const handleLangageSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedLangageIds.length > 0) {
            try {
                const params = new URLSearchParams();
                selectedLangageIds.forEach(id => {
                    params.append('langageIds', id.toString());
                });
    
                const response = await axios.put(
                    `http://localhost:8080/api/schools/${id}/associate-langages?${params.toString()}`,
                    null,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );
                console.log('Langages associated:', response.data);
            } catch (error) {
                console.error('Error associating langages:', error);
                if (axios.isAxiosError(error)) {
                    console.error('Response data:', error.response?.data);
                    console.error('Response status:', error.response?.status);
                }
            }
        } else {
            console.error('No langages selected');
        }
    };
  
      // Mise à jour de la sélection des langages
      const handleLangageChange = (langageId: number) => {
          setSelectedLangageIds((prevSelected) =>
              prevSelected.includes(langageId)
                  ? prevSelected.filter((id) => id !== langageId)
                  : [...prevSelected, langageId]
          );
      };
  


    return (
        <div className="contenairSchool">
                            <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={nameSchool}
                        onChange={(e) => setNameSchool(e.target.value)}
                        placeholder="Nom"
                    />
                    <input
                        id="file"
                        type="file"
                        onChange={(e) => setPhotoSchool(e.target.files ? e.target.files[0] : portrait)}
                    />
                    <button type="submit">Modifier l'étudiant</button>
                </form>
                <img src={typeof photoSchool === 'string' ? photoSchool : URL.createObjectURL(photoSchool)} alt="Student" />
                <h3>Ajouter des langages</h3>
            <form onSubmit={handleLangageSubmit}>
                {listLangage.map((langage) => (
                    <div key={langage.idLangage} className="choiceLangage">
                        <div className="details">
                            <input
                                type="checkbox"
                                name="langage"
                                id={`langage-${langage.idLangage}`}
                                value={langage.idLangage}
                                onChange={() => handleLangageChange(langage.idLangage)}
                            />
                            <label htmlFor={`langage-${langage.idLangage}`}>Nom : {langage.nameLangage}</label>
                        </div>
                    </div>
                ))}
                <button type="submit">Add Langages</button>
            </form>
            <BTreturn />
        </div>
    )
}

export default ManageSchool;