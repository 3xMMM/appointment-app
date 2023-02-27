import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import useAppointments from './appointments/useAppointments';
import AppointmentForm from './appointments/AppointmentForm';
import Modal from './modal/Modal';
import AppointmentListItem from './appointments/AppointmentListItem';

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

    // One-time setup on-load
    useEffect(() => {
        addAppointment({
            date: '2023-02-24',
            time: '11:00',
            location: AppointmentLocation.London,
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

    const sortedAppointments = useMemo(() => appointments.sort(sortAppointmentsInAscendingOrder), [appointments]);

    return (
        <div className="App">
            <header>
                <h1>Appointments</h1>
            </header>
            <Modal
                title={`${formType === 'add' ? 'Add' : 'Edit' } Appointment`}
                show={showForm}
                setShow={setShowForm}
                elementToFocusOnClose={addButton}
            >
                <AppointmentForm
                    show={showForm}
                    type={formType}
                    initialFormData={initialFormData}
                    addHandler={addAppointment}
                    editHandler={editAppointment}
                    submitCallback={() => setShowForm(false)}
                />
            </Modal>
            <main>
                <button ref={addButton} onClick={showAddForm}>Add Appointment</button>
                <div className='AppointmentsList'>
                    <span>You have <strong>{ appointments.length } appointment{ appointments.length !== 1 ? 's' : '' }</strong>.</span>
                    <ul>
                        {
                            sortedAppointments.map(appointment => {
                                return (
                                    <AppointmentListItem
                                        key={appointment.id}
                                        appointment={appointment}
                                        showEditForm={showEditForm}
                                        deleteAppointment={deleteAppointment}
                                        elementToFocusOnDelete={addButton}
                                    />
                                );
                            })
                        }
                    </ul>
                </div>
            </main>
            <footer>
                Created by Mark Martinez.
            </footer>
        </div>
    );
}

export default App;
