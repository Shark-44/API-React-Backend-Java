import './Modal.css';
import LoginForm from './LoginForm';

type ModalProps = {
  onClose: () => void;
}

function Modal({ onClose }: ModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close">X</button>
        <LoginForm onClose={onClose}/>
      </div>
    </div>
  );
}

export default Modal;
