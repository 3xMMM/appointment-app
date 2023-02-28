import './Modal.css';
import { ReactElement } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    title: string
    show: boolean
    onClose: () => void
    children: ReactElement
}

export default function Modal({ title, show, onClose, children }: ModalProps) {
    return (
        createPortal(
            <div
                className={`Modal ${show ? 'ModalShow' : ''}`}
                onClick={onClose}
                role='dialog'
                aria-modal='true'
                aria-labelledby='ModalTitle'
            >
                <div className='ModalContent' onClick={event => event.stopPropagation()}>
                    <div className='ModalHeader'>
                        <div id='ModalTitle' className='ModalTitle'>{ title }</div>
                    </div>
                    { children }
                </div>
            </div>,
            document.getElementById('root') as HTMLElement,
        )
    );
}
