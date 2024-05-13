import React, { useRef, useEffect } from 'react';

interface ModalProps {
    handleClose: () => void;
    showModal: boolean;
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ handleClose, showModal, children }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog && showModal) dialog.showModal();
    }, [showModal]);

    return (
        <dialog
            ref={dialogRef}
            onClick={() => dialogRef.current?.close()}
            className="modal"
            onClose={handleClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="modal-box w-7/12 h-2/3 max-w-2xl max-h-2xl flex flex-col items-center"
            >
                <button
                    onClick={() => dialogRef.current?.close()}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    ✕
                </button>
                {children}
            </div>
        </dialog>
    );
};

export default Modal;
