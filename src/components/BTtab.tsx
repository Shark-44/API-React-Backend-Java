import { useState } from 'react';
import './BTtab.css';
import Modal from './Modal';
import { useTab } from '../context/TabContext';

export default function BTtab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeTab, setActiveTab } = useTab();

  /*useEffect(() => {
    console.log('BTtab rendered, activeTab:', activeTab);
  }, [activeTab]);*/

  const handleConnexionClick = () => {
    setIsModalOpen(true);
    setActiveTab('connexion');
  };

  const handleDeconnexionClick = () => {
    setIsModalOpen(false);
    setActiveTab('deconnexion');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="tabs-container">
      <div
        className={`tab ${activeTab === 'connexion' ? 'tab-success' : 'tab-inactive'}`}
        onClick={handleConnexionClick}
      >
        Connexion
      </div>
      <div
        className={`tab ${activeTab === 'deconnexion' ? 'tab-danger' : 'tab-inactive'}`}
        onClick={handleDeconnexionClick}
      >
        Deconnexion
      </div>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </div>
  );
}
