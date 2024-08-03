import React from 'react';
import '../css/Modal.module.css';

const Modal = ({ item, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        {item.type === 'image' && <img src={item.src} alt={item.title} />}
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer">Read Full Article</a>}
      </div>
    </div>
  );
};

export default Modal;