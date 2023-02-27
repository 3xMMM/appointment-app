import './Modal.css';
import { MutableRefObject, ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    title: string
    show: boolean
    setShow: (value: boolean) => void
    elementToFocusOnClose: MutableRefObject<HTMLElement | null>
    children: ReactElement
}

export default function Modal({ title, show, setShow, elementToFocusOnClose, children }: ModalProps) {
    useEffect(() => {
        if (!show) {
            elementToFocusOnClose.current?.focus();
        }
    }, [show]);

    return (
        createPortal(
            <div
                className={`Modal ${show ? 'ModalShow' : ''}`}
                onClick={() => setShow(false)}
                role='dialog'
                aria-modal='true'
                aria-labelledby='ModalTitle'
            >
                <div className='ModalContent' onClick={event => event.stopPropagation()}>
                    <div className='ModalHeader'>
                        <div id='ModalTitle' className='ModalTitle'>{ title }</div>
                        <button aria-label='Close' onClick={() => setShow(false)}>X</button>
                    </div>
                    { children }
                </div>
            </div>,
            document.getElementById('root') as HTMLElement,
        )
    );
}
