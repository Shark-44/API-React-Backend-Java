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
interface CardProps {
    onPopoverOpen: () => void;
    onPopoverClose: () => void;
    showDelete: boolean;
    showManage: boolean;
}

function CardS ({ onPopoverOpen, onPopoverClose, showDelete, showManage }: CardProps) {
    const [listSchool, setListSchool] = useState<School[]>([]);
    const [refresh, setRefresh] = useState(false);

    const handleDelSchool = (id: number) => {
        axios.delete(`http://localhost:8080/api/schools/${id}`)
            .then(() => {
                setRefresh((prev) => !prev);
            })
            .catch((error) => {
                console.error('Error deleting school:', error);
            });
    };


    useEffect (() => {
        axios.get('http://localhost:8080/api/schools')
        .then((res) => setListSchool(res.data))
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    },[refresh])
   
    return (
        <div className="cardSdetail">
                        {listSchool.map((school, index) => {
                return (
                    <div key={index} className="globalCard">
                        {showDelete && (<div id="delbutton"><button onClick={() => handleDelSchool(school.idSchool)}>X</button></div>)}
                        {showManage && (<div id="Manbutton"><a href={`/ManageSchool?id=${school.idSchool}`}><button>V</button></a></div>)}
                        
                        <div className="details">
                            <img src={`http://localhost:8080/uploads/images/${school.photoSchool}`} alt="" />
                            <p> Nom : {school.nameSchool}</p>
                            
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
                                <p>Langages enseignés :{school.langages.map(langage => langage.nameLangage).join(', ')} </p>
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