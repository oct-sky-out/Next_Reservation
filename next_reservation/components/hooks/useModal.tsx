import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { modalOpenStateAction } from '@/store/modalOpen';
import ModalStyle from '@/styles/components/ModalPotal/Modal';

interface IProps {
  children: React.ReactNode;
  additionalFunction?: () => void;
}

const useModal = () => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);

  const getModalOpenedState = () => modalOpened;

  const openModal = () => {
    setModalOpened(true);
    dispatch(modalOpenStateAction.setOpenState(true));
  };

  const closeModal = () => {
    setModalOpened(false);
    dispatch(modalOpenStateAction.setOpenState(false));
  };

  const ModalPotal: React.FC<IProps> = ({ children, additionalFunction }) => {
    const ref = useRef<Element | null>();
    const [activeModal, setActiveModal] = useState(false);
    useEffect(() => {
      setActiveModal(true);
      if (document) {
        const modalDom = document.querySelector('#root-modal');
        ref.current = modalDom;
      }
    }, []);

    if (ref.current && modalOpened && activeModal) {
      if (additionalFunction !== undefined) {
        additionalFunction();
      }
      return createPortal(
        <ModalStyle>
          <div className="modal-background" onClick={closeModal} />
          {children}
        </ModalStyle>,
        ref.current
      );
    }
    return null;
  };

  return {
    getModalOpenedState,
    ModalPotal,
    openModal,
    closeModal,
  };
};

export default useModal;
