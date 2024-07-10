import "./Student.css";
import Card from "../components/Card";
import { useState } from "react";
import BTreturn from "../components/BTreturn";


function Student() {
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

    const handlePopoverOpen = () => {
        setIsPopoverOpen(true);
    };

    const handlePopoverClose = () => {
        setIsPopoverOpen(false);
    };

    return (
        <div className={`contenairStudient ${isPopoverOpen ? 'blurred' : ''}`}>
            <h1>Liste des étudiants</h1>
            <Card onPopoverOpen={handlePopoverOpen} onPopoverClose={handlePopoverClose} />
            <BTreturn />
        </div>
    );
}

export default Student;
