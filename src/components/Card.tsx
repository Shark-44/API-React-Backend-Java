import "./Card.css"
import { useEffect, useState } from "react";
import axios from "axios";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";

type Student = {
    id: number;
    name: string;
    firstname: string;
    photo: string;
    birthday:string;
    langages: { idLangage: number; nameLangage: string }[];
    
}

interface CardProps {
    onPopoverOpen: () => void;
    onPopoverClose: () => void;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
}

function Card ({ onPopoverOpen, onPopoverClose }: CardProps) {
    const [listStudent, setListStudent] = useState<Student[]>([]);
    

    useEffect (() => {
        axios.get('http://localhost:8080/api/students')
            .then((res) => setListStudent(res.data))
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    },[])
  
    console.log(listStudent)
    return (
        <div className="carddetail">
            {listStudent.map((list, index) => {
                return (
                    <div key={index} className="globalCard">
                        <div className="details">
                            <img src={`http://localhost:8080/uploads/images/${list.photo}`} alt="" />
                            <p> Nom : {list.name}</p>
                            <p>Prenom : {list.firstname}</p>
                        </div>
                        <Popover 
                            placement="top" 
                            showArrow={true}
                            onOpenChange={(open) => open ? onPopoverOpen() : onPopoverClose()}
                        >
                        <PopoverTrigger>
                          <Button color="primary" variant="flat" className="capitalize">Click info</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="px-1 py-2">
                                <div className="text-small font-bold">Anniversaire : {formatDate(list.birthday)}</div>
                                <p>Langages étudiées : {list.langages.map(langage => langage.nameLangage).join(', ')}</p>
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