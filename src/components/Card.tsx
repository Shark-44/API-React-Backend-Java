import "./Card.css"
import { useEffect, useState } from "react";
import axios from "axios";

type Student = {
    id: number;
    name: string;
    firstname: string;
    photo: string;
    
}

function Card () {
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
        <div>
            {listStudent.map((list, index) => {
                return (
                    <div key={index} className="details">
                        <img src={list.photo} alt="" />
                        <p> Nom : {list.name}</p>
                        <p>Prenom : {list.firstname}</p>

                    </div>
                )
            })}
        </div>
    )
}

export default Card;