import { useState } from 'react';
import { Appointment } from '../App';

export default function useAppointments() {
    const [appointmentId, setAppointmentId] = useState(1);
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const addAppointment = (appointment: Omit<Appointment, 'id'>): void => {
        setAppointments([...appointments, {
            id: appointmentId,
            ...appointment,
        }])
        setAppointmentId(appointmentId + 1);
    };

    const deleteAppointment = (appointment: Appointment): void => {
        setAppointments(appointments.filter(a => a.id !== appointment.id));
    };

    const editAppointment = (appointment: Appointment): void => {
        setAppointments(appointments.map(a => {
            if (a.id === appointment.id) {
                return appointment;
            } else {
                return a;
            }
        }));
    };

    return {
        appointments,
        addAppointment,
        deleteAppointment,
        editAppointment,
    };
}
