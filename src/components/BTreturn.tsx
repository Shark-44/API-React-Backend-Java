import "./BTreturn.css"
import Return from "../assets/images/retour.webp"
function BTreturn () {
    return (
        <div className="return">
            <a href="/">
                <img src={Return} alt="" />
            </a>
        </div>
    )

}

export default BTreturn;