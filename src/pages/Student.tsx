import "./Student.css";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import BTreturn from "../components/BTreturn";
import { useTab } from "../context/TabContext";
import AddStudentForm from "../components/AddStudentForm";



function Student() {
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const { activeTab } = useTab();

    useEffect(() => {
        
        const connectionState = localStorage.getItem('isConnected');
        setIsConnected(connectionState === 'true');
    }, []);

    //si connexion sur la page
    useEffect(() => {
        if (activeTab === 'connexion') {
            setIsConnected(true);
            localStorage.setItem('isConnected', 'true');
        } else if (activeTab === 'deconnexion') {
            setIsConnected(false);
            localStorage.setItem('isConnected', 'false');
        }
    }, [activeTab]);

    const handlePopoverOpen = () => {
        setIsPopoverOpen(true);
    };

    const handlePopoverClose = () => {
        setIsPopoverOpen(false);
    };
    const handleAddStudentClick = () => { setShowAddForm(true), setShowDelete(false)};
    const handleCloseAddForm = () => setShowAddForm(false);
    const handleDelStudentClick = () => {setShowDelete(true), setShowAddForm(false)};

    return (
        <div className={`contenairStudient ${isPopoverOpen ? 'blurred' : ''}`}>
            <h1>Liste des étudiants</h1>
            <Card onPopoverOpen={handlePopoverOpen} onPopoverClose={handlePopoverClose} showDelete={showDelete}/>
            {isConnected && (
                <div className="btAdmin">
                    <button onClick={handleAddStudentClick}>Ajouter un étudiant</button>
                    <button>Modifier un étudiant</button>
                    <button onClick={handleDelStudentClick}>Supprimer un étudiant</button>
                </div>
            )}
            {showAddForm && (
                <div className="modal">
                    <AddStudentForm onClose={handleCloseAddForm} />
                </div>
            )}
            <BTreturn />
        </div>
    );
}

export default Student;
