import "./School.css";
import CardS from "../components/CardS";
import BTreturn from "../components/BTreturn";
import AddSchoolForm from "../components/AddSchoolForm";
import { useTab } from "../context/TabContext";
import { useState, useEffect } from "react";

function School (){
    
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [showManage, setShowManage] = useState<boolean>(false);
    
    const [isConnected, setIsConnected] = useState<boolean>(false);
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
    const handleAddSchoolClick = () => { setShowAddForm(true), setShowDelete(false), setShowManage(false)};
    const handleCloseAddForm = () => setShowAddForm(false);
    const handleDelSchoolClick = () => {setShowDelete(true), setShowAddForm(false), setShowManage(false)};
    const handlePutSchoolClick = () => {setShowManage(true), setShowAddForm(false), setShowDelete(false)};

       

    return ( 
    <div className={`contenairSchool ${isPopoverOpen ? 'blurred' : ''}`}>
        <h1> Liste des écoles</h1>
        <CardS onPopoverOpen={handlePopoverOpen} onPopoverClose={handlePopoverClose} showDelete={showDelete} showManage={showManage}/>
        {isConnected && (
                <div className="btAdmin">
                    <button onClick={handleAddSchoolClick}>Ajouter une école</button>
                    <button onClick={handlePutSchoolClick}>Modifier une école</button>
                    <button onClick={handleDelSchoolClick}>Supprimer une école</button>
                </div>
            )}
        {showAddForm && (
                <div className="modal">
                    <AddSchoolForm onClose={handleCloseAddForm} />
                </div>
            )}
        <BTreturn />
    </div>
    )
}

export default School;