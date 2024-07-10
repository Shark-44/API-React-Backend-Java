import "./School.css"
import CardS from "../components/CardS";
import BTreturn from "../components/BTreturn";


function School (){
    return ( 
    <div className="contenairSchool">
        <h1> Liste des écoles</h1>
        <CardS />
        <BTreturn />
    </div>
    )
}

export default School;