import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>O'chirishni tasdiqlaysizmi?</h2>
        <div className="modal-actions">
          <button className='bBtn' onClick={onClose}>Bekor qilish</button>
          <button className='tBtn' onClick={onConfirm}>Tasdiqlash</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
