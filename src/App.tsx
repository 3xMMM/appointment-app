import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import useAppointments, { Appointment } from './appointments/useAppointments';
import useDualPurposeForm from './appointments/useDualPurposeForm';
import AppointmentsList from './appointments/AppointmentsList';
import AppointmentFormModal from './appointments/AppointmentFormModal';
import AppointmentRemoveConfirmationModal from './appointments/AppointmentRemoveConfirmationModal';
import Button from './components/Button';

function App() {
    const [appointments, appointmentsDispatch] = useAppointments();
    const appointmentsForm = useDualPurposeForm<Appointment>();
    const addButton = useRef<HTMLButtonElement | null>(null);
    const [deleteModalIsVisible, setDeleteModalIsVisible] = useState(false);
    const [appointmentPendingDeletion, setAppointmentPendingDeletion] = useState<Appointment | null>(null);

    const showDeleteAppointmentModal = (appointment: Appointment) => {
        setDeleteModalIsVisible(true);
        setAppointmentPendingDeletion(appointment);
    };

    const onCloseRemoveConfirmationModal = () => {
        setDeleteModalIsVisible(false);
        setAppointmentPendingDeletion(null);
        addButton.current?.focus();
    };

    const onCloseFormModal = () => {
        appointmentsForm.hideForm();
        addButton.current?.focus();
    };

    useEffect(() => { // For accessibility
        addButton.current?.focus();
    }, []);

    return (
        <div className="App">
            <header>
                <h1>My Appointments</h1>
            </header>
            <main>
                <Button hierarchy='Primary' ref={addButton} onClick={appointmentsForm.showAddForm}>Add Appointment</Button>
                <AppointmentsList appointments={appointments} showEditForm={appointmentsForm.showEditForm} handleDeleteAppointment={showDeleteAppointmentModal}/>
            </main>
            <AppointmentFormModal
                show={appointmentsForm.formIsVisible}
                currentFormType={appointmentsForm.currentFormType}
                initialFormData={appointmentsForm.initialFormData}
                appointmentsDispatch={appointmentsDispatch}
                onClose={onCloseFormModal}
            />
            <AppointmentRemoveConfirmationModal
                show={deleteModalIsVisible}
                appointmentToDelete={appointmentPendingDeletion}
                onDelete={(appointmentToDelete) => appointmentsDispatch({ type: 'delete', payload: appointmentToDelete})}
                onClose={onCloseRemoveConfirmationModal}
            />
        </div>
    );
}

export default App;
