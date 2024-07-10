
import "./Home.css";

import Student from "../assets/images/student.png";
import School from "../assets/images/school.png";
import Langage from "../assets/images/langage.png";




const Home = () => {
  return (
    <div className="containerHome">
        
        <div className="title">
            <p>Ayant construit un backend avec Spring Boot (java) et pour interagir avec ma bdd. <br /> Un user pourra lire simplement et une connexion admin pourra faire les PUT/DELETE/POST</p>
        </div>
        <div className="Lien">
            <a href="/Student">
                <img src={Student} alt="Etudiant" />
                <p>Voir les éleves</p>
            </a>
            <a href="/School">
                <img src={School} alt="Ecole" />
                <p>Voir les écoles</p>
            </a>
            <a href="/Langage">
                <img src={Langage} alt="Langage" />
                <p>Voir les langages</p>
            </a>
        </div>
    </div>
  );
};

export default Home;