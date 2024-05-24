import React from 'react';
import './Modal.css';

function Modal({ show, onClose, imageUrl }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <img src={imageUrl} alt="Pokémon" className="modal-image" />
      </div>
    </div>
  );
}

export default Modal;
