import "./CardS.css"
import { useEffect, useState } from "react";
import axios from "axios";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";


type School = {
    idSchool: number;
    nameSchool: string;
    photoSchool: string;
    langages: { idLangage: number; nameLangage: string }[];
}

function CardS () {
    const [listSchool, setListSchool] = useState<School[]>([]);

    useEffect (() => {
        axios.get('http://localhost:8080/api/schools')
        .then((res) => setListSchool(res.data))
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    },[])
    console.log(listSchool)
    return (
        <div className="cardSdetail">
                        {listSchool.map((list, index) => {
                return (
                    <div key={index} className="globalCard">
                        <div className="details">
                            <img src={`http://localhost:8080/uploads/images/${list.photoSchool}`} alt="" />
                            <p> Nom : {list.nameSchool}</p>
                            
                        </div>
                        <Popover 
                            placement="top" 
                            showArrow={true}
                        >
                        <PopoverTrigger>
                          <Button color="primary" variant="flat" className="capitalize">Click info</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="px-1 py-2">
                                <p>Langages enseignés :{list.langages.map(langage => langage.nameLangage).join(', ')} </p>
                            </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                )
            })}
        </div>
    )
}
export default CardS;