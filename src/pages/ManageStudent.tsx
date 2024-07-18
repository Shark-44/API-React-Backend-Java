import "./ManageStudent.css";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import BTreturn from "../components/BTreturn";
import portrait from "../assets/images/portrait.png";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

type School = {
    idSchool: number;
    nameSchool: string;
    photoSchool: string;
    langages: { idLangage: number; nameLangage: string }[];
}

type Langage = {
    idLangage: number;
    nameLangage: string;
}

function ManageStudent() {
    const query = useQuery();
    const id = query.get('id');
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [birthday, setBirthday] = useState('');
    const [photo, setPhoto] = useState<File | string>(portrait);
    const [listSchool, setListSchool] = useState<School[]>([]);
    const [selectedSchoolId, setSelectedSchoolId] = useState<number | null>(null);
    const [selectedLangageIds, setSelectedLangageIds] = useState<number[]>([]);
    const [nameSchool, setNameSchool] = useState<School | null>(null);
    const [listLangage, setListLangage] = useState<Langage[]>([]);

    // infos sur un étudiant
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/api/students/${id}`)
                .then((res) => {
                    const student = res.data;
                    setName(student.name);
                    setFirstname(student.firstname);
                    setBirthday(student.birthday);
                    setPhoto(student.photo || portrait);
                })
                .catch((error) => {
                    console.error('Error fetching student data:', error);
                });
        }
    }, [id]);

    // Liste des écoles
    useEffect(() => {
        axios.get('http://localhost:8080/api/schools')
            .then((res) => setListSchool(res.data))
            .catch((error) => {
                console.error('Error fetching schools:', error);
            });
    }, []);

    // les languages proposés d'une école
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/api/students/${id}/school`)
                .then((res) => setNameSchool(res.data))
                .catch((error) => {
                    console.error('Error fetching school:', error);
                });
        }
    }, [id]);

    useEffect(() => {
        if (nameSchool && nameSchool.idSchool) {
            axios.get(`http://localhost:8080/api/schools/${nameSchool.idSchool}/langages`)
                .then((res) => setListLangage(res.data))
                .catch((error) => {
                    console.error('Error fetching langages:', error);
                });
        }
    }, [nameSchool]);
    console.info(listLangage)

    // Mise à jour d'une fiche étudiant
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let photoFileName = '';
        if (photo && typeof photo !== 'string') {
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

        const studentData = {
            name,
            firstname,
            birthday: birthday || null,
            photo: photoFileName || (typeof photo === 'string' ? photo : null),
        };

        try {
            const response = await axios.put(`http://localhost:8080/api/students/${id}/basic-info`, studentData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            console.log('Student updated:', response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message);
                console.error('Response data:', error.response?.data);
                console.error('Response status:', error.response?.status);
            } else {
                console.error('Error updating student:', (error as Error).message);
            }
        }
    };

    // inscription d'un étudiant dans une école
    const handleSchoolSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedSchoolId) {
            try {
                const response = await axios.put(`http://localhost:8080/api/students/${id}/associate-school/${selectedSchoolId}`);
                console.log('School associated:', response.data);
                setNameSchool(response.data); // Mettre à jour l'école sélectionnée
            } catch (error) {
                console.error('Error associating school:', error);
            }
        } else {
            console.error('No school selected');
        }
    };

    // inscription au cours des langages
    const handleLangageSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (selectedLangageIds.length > 0 && nameSchool) {
          try {
              const params = new URLSearchParams();
              selectedLangageIds.forEach(id => params.append('langageIds', id.toString()));
              params.append('schoolId', nameSchool.idSchool.toString());
  
              const response = await axios.put(
                  `http://localhost:8080/api/students/${id}/associate-langages`,
                  null,
                  {
                      params: params
                  }
              );
              console.log('Langages associated:', response.data);
          } catch (error) {
              console.error('Error associating langages:', error);
          }
      } else {
          console.error('No langages or school selected');
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
        <div className="ContainerManage">
            <div className="studentSection">
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
                    <p>Son anniversaire : {formatDate(birthday)}</p>
                    <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                    <input
                        id="file"
                        type="file"
                        onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : portrait)}
                    />
                    <button type="submit">Modifier l'étudiant</button>
                </form>
                <img src={typeof photo === 'string' ? photo : URL.createObjectURL(photo)} alt="Student" />
            </div>
            <h3>Ajouter une école</h3>
            <form onSubmit={handleSchoolSubmit}>
                {listSchool.map((school) => (
                    <div key={school.idSchool} className="choiceSchool">
                        <div className="details">
                            <input
                                type="radio"
                                name="school"
                                id={`school-${school.idSchool}`}
                                value={school.idSchool}
                                onChange={() => setSelectedSchoolId(school.idSchool)}
                            />
                            <label htmlFor={`school-${school.idSchool}`}>Nom : {school.nameSchool}</label>
                        </div>
                    </div>
                ))}
                <button type="submit">Subscribe</button>
            </form>
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
    );
}

export default ManageStudent;
