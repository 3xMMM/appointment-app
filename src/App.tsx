import React, { useEffect, useState } from 'react';
import './App.css';
import AppointmentsList from './appointments/AppointmentsList';
import useAppointments from './appointments/useAppointments';
import AppointmentAddForm from './appointments/AppointmentAddForm';

export enum AppointmentLocation {
    SanDiego = 'San Diego',
    Portland = 'Portland',
    Seattle = 'Seattle',
    London = 'London',
    Orlando = 'Orlando',
};

export type Appointment = {
    id: number
    date: string
    time: string
    location: AppointmentLocation
    description: string
}

function App() {
    const { appointments, addAppointment, deleteAppointment } = useAppointments();
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        addAppointment({
            date: '02/24/2023',
            time: '11:00',
            location: AppointmentLocation.London,
            description: 'Initial Appointment'
        });
    }, []);

    return (
    <div className="App">
        <header>
            <h1>Appointments</h1>
        </header>
        <AppointmentAddForm show={showAddForm} addAppointment={addAppointment} setShowAddForm={setShowAddForm}/>
        <main>
            <button onClick={() => setShowAddForm(!showAddForm)}>Add Appointment</button>
            <AppointmentsList appointments={appointments} deleteAppointment={deleteAppointment}/>
        </main>
        <footer>
            Created by Mark Martinez.
        </footer>
    </div>
    );
}

export default App;
