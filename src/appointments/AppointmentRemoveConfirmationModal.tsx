import AppointmentCard from './AppointmentCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import React, { useEffect, useRef } from 'react';
import { Appointment } from './useAppointments';

type AppointmentRemoveConfirmationModalProps = {
    show: boolean
    appointmentToDelete: Appointment | null
    onDelete: (appointment: Appointment) => void
    onClose: () => void
}

export default function AppointmentRemoveConfirmationModal({ show, onDelete, appointmentToDelete, onClose }: AppointmentRemoveConfirmationModalProps) {
    const deleteButton = useRef<HTMLButtonElement | null>(null);
    const appointmentRef = useRef<Appointment | null>(null);
    const appointment = appointmentToDelete ?? appointmentRef.current;

    const handleConfirmedDeleteAppointment = () => {
        if (appointmentToDelete) {
            onDelete(appointmentToDelete);
        } else {
            throw Error('Could not delete appointment; it does not exist.');
        }
        onClose();
    };

    useEffect(() => { // For accessibility
        if (show) {
            appointmentRef.current = appointmentToDelete;
            deleteButton.current?.focus();
        }
    }, [show]);

    return (
        <Modal title='Remove Confirmation' show={show} onClose={onClose}>
            <div>
                <div style={{ marginBottom: '0' }}>Are you sure you want to remove this appointment?</div>
                { appointment &&
                    <AppointmentCard appointment={appointment}/>
                }
                <Button hierarchy='Primary' isDestructive ref={deleteButton} onClick={handleConfirmedDeleteAppointment}>Remove</Button>
                <Button isDestructive onClick={onClose}>Back</Button>
            </div>
        </Modal>
    );
}
