import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import useAppointments from './appointments/useAppointments';
import AppointmentForm from './appointments/AppointmentForm';
import Modal from './components/Modal';
import AppointmentCard from './appointments/AppointmentCard';
import Button from './components/Button';

export enum AppointmentLocation {
    SanDiego = 'San Diego',
    Portland = 'Portland',
    Seattle = 'Seattle',
    London = 'London',
    Orlando = 'Orlando',
}

export type Appointment = {
    id?: number
    date: string
    time: string
    location: AppointmentLocation
    description: string
}

export type FormType = 'add' | 'edit';

const sortAppointmentsInAscendingOrder = (a: Appointment, b: Appointment): number => {
    const aTimestamp = Date.parse(`${a.date}T${a.time}`);
    const bTimestamp = Date.parse(`${b.date}T${b.time}`);
    if (aTimestamp > bTimestamp) {
        return 1;
    } else if (aTimestamp < bTimestamp) {
        return -1;
    } else {
        return 0;
    }
}

function App() {
    const { appointments, addAppointment, editAppointment, deleteAppointment } = useAppointments();
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState<FormType>('add');
    const [initialFormData, setInitialFormData] = useState<Appointment | null>(null);
    const addButton = useRef<HTMLButtonElement | null>(null);

    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [appointmentIdPendingDeletion, setAppointmentIdPendingDeletion] = useState<null | number>(null);
    const deleteButton = useRef<HTMLButtonElement | null>(null);

    // One-time setup on-load
    useEffect(() => {
        addAppointment({
            date: '2023-02-24',
            time: '11:00',
            location: AppointmentLocation.Seattle,
            description: 'Initial Appointment'
        });
    }, []);

    const showAddForm = () => {
        setInitialFormData(null);
        setShowForm(true);
        setFormType('add');
    };

    const showEditForm = (appointment: Appointment) => {
        setInitialFormData(appointment);
        setShowForm(true);
        setFormType('edit');
    }

    const handleDeleteAppointment = (appointment: Appointment) => {
        setShowDeleteConfirmationModal(true);
        setAppointmentIdPendingDeletion(appointment.id as number);
        deleteButton.current?.focus();
    }

    const handleConfirmedDeleteAppointment = () => {
        const appointmentToDelete = appointments.find(a => a.id === appointmentIdPendingDeletion);
        if (appointmentToDelete) {
            deleteAppointment(appointmentToDelete);
        } else {
            throw Error('Could not delete appointment; it does not exist.');
        }
        setAppointmentIdPendingDeletion(null);
        setShowDeleteConfirmationModal(false);
        addButton.current?.focus();
    }

    const appointmentToBeDeleted = (appointmentIdPendingDeletion) ? appointments.find(a => a.id === appointmentIdPendingDeletion) : null;

    const sortedAppointments = useMemo(() => appointments.sort(sortAppointmentsInAscendingOrder), [appointments]);

    return (
        <div className="App">
            <header>
                <h1>My Appointments</h1>
                <span className='AppointmentTotal'>You have { appointments.length } appointment{ appointments.length !== 1 ? 's' : '' }</span>
            </header>

            { /* TODO Make this a component */ }
            <Modal
                title={`${formType === 'add' ? 'Add' : 'Edit' } Appointment`}
                show={showForm}
                onClose={() => setShowForm(false)}
                elementToFocusOnClose={addButton}
            >
                <AppointmentForm
                    show={showForm}
                    type={formType}
                    initialFormData={initialFormData}
                    addHandler={addAppointment}
                    editHandler={editAppointment}
                    submitCallback={() => setShowForm(false)}
                    closeCallback={() => setShowForm(false)}
                />
            </Modal>

            { /* TODO Make this a component */ }
            <Modal
                title='Cancel Confirmation'
                show={showDeleteConfirmationModal}
                onClose={() => setShowDeleteConfirmationModal(false)}
                elementToFocusOnClose={addButton}
            >
                <div>
                    <div style={{ marginBottom: '0' }}>Are you sure you want to cancel this appointment?</div>
                    { appointmentToBeDeleted &&
                        <AppointmentCard appointment={appointmentToBeDeleted}/>
                    }
                    <Button hierarchy='Primary' isDestructive ref={deleteButton} onClick={handleConfirmedDeleteAppointment}>Cancel</Button>
                    <Button isDestructive onClick={() => setShowDeleteConfirmationModal(false)}>Back</Button>
                </div>
            </Modal>

            <main>
                <div>
                    <Button hierarchy='Primary' ref={addButton} onClick={showAddForm}>Add Appointment</Button>
                </div>

                { /* TODO Make this a component */ }
                <div className='AppointmentsList'>
                    <ul>
                        {
                            sortedAppointments.map(appointment => {
                                return (
                                    <li key={appointment.id}>
                                        <AppointmentCard
                                            appointment={appointment}
                                            showEditForm={showEditForm}
                                            handleDeleteAppointment={handleDeleteAppointment}
                                        />
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default App;
