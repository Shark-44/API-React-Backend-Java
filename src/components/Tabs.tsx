// Tabs.tsx
import { useAuth } from '../context/authContext';
import './Tabs.css';

type TabsProps = {
  onConnexionClick: () => void;
  onDeconnexionClick: () => void;
}

function Tabs({ onConnexionClick, onDeconnexionClick }: TabsProps) {
  const { activeTab, setActiveTab } = useTabs();
  const { isConnected, setConnected } = useAuth();


  const handleConnexionClick = () => {
    setActiveTab('connexion');
    onConnexionClick();
  };

  const handleDeconnexionClick = () => {
    setActiveTab('deconnexion');
    setConnected(false);
    onDeconnexionClick();
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
    </div>
  );
}

export default Tabs;
