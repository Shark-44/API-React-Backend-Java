import "./Langage.css"
import { useEffect, useState } from "react";
import axios from "axios";
import BTreturn from "../components/BTreturn";

type Langage = {
    idLangage: number;
    nameLangage: String;
}

function Langage () {
    const [ListLangage, setListLangage] = useState<Langage[]>([])

    useEffect (() => {
        axios.get('http://localhost:8080/api/langages')
        .then((res) => setListLangage(res.data))
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    },[])
    console.info(ListLangage)
    return (
    <div className="contenairLangage">
        
        <h1>Liste des Langages</h1>
        {ListLangage.map((list,index)=>{
            return(
                <div key={index} id="listLang">
                    <p>{list.nameLangage}</p>
                </div>
            )
        })
        }
        <BTreturn />
    </div>)
}

export default Langage;