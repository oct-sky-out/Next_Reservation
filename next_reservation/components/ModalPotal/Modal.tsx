import React, { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import ModalStyle from '../../styles/components/ModalPotal/Modal';

interface IProps {
  children: React.ReactNode;
  closePotal: () => void;
}

const ModalPotal: React.FC<IProps> = ({ children, closePotal }) => {
  const ref = useRef<Element | null>();
  const [activeModal, setActiveModal] = useState(false);
  useEffect(() => {
    setActiveModal(true);
    if (document) {
      const modalDom = document.querySelector('#root-modal');
      ref.current = modalDom;
    }
  }, []);

  if (ref.current && activeModal) {
    return createPortal(
      <ModalStyle>
        <div className="modal-background" onClick={() => closePotal()} />
        {children}
      </ModalStyle>,
      ref.current
    );
  }
  return null;
};

export default ModalPotal;
