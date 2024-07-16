import "./Card.css"
import { useEffect, useState } from "react";
import axios from "axios";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";

type Student = {
    idStudent: number;
    name: string;
    firstname: string;
    photo: string;
    birthday:string;
    langages: { idLangage: number; nameLangage: string }[];
    
}

interface CardProps {
    onPopoverOpen: () => void;
    onPopoverClose: () => void;
    showDelete: boolean;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
}

function Card ({ onPopoverOpen, onPopoverClose, showDelete }: CardProps) {
    const [listStudent, setListStudent] = useState<Student[]>([]);
    const handleDelStudent = (id: number) => {
        console.info(id)
        axios.delete(`http://localhost:8080/api/students/${id}`)
             .catch((error) => {
            console.error('Error delete student:', error);
        });
    };

    useEffect (() => {
        axios.get('http://localhost:8080/api/students')
            .then((res) => setListStudent(res.data))
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    },[handleDelStudent])
    

    
    return (
        <div className="carddetail">
            {listStudent.map((student, index) => {
                return (
                    <div key={index} className="globalCard">
                         {showDelete && (<div id="delbutton"><button onClick={() => handleDelStudent(student.idStudent)}>X</button></div>)}
                        <div className="details">
                            <img src={`http://localhost:8080/uploads/images/${student.photo}`} alt="" />
                            <p> Nom : {student.name}</p>
                            <p>Prenom : {student.firstname}</p>
                        </div>
                       
                        <Popover 
                            placement="top" 
                            showArrow={true}
                            onOpenChange={(open) => open ? onPopoverOpen() : onPopoverClose()}
                        >
                        <PopoverTrigger>
                          <button color="primary" className="capitalize">Click info</button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="px-1 py-2">
                                <div className="text-small font-bold">Anniversaire : {formatDate(student.birthday)}</div>
                                <p>Langages étudiées : {student.langages.map(langage => langage.nameLangage).join(', ')}</p>
                            </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                )
            })}
         
        </div>
    )
}

export default Card;