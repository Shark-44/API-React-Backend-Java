import "./Student.css";
import Card from "../components/Card";
import { useState } from "react";

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
        </div>
    );
}

export default Student;
