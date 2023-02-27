import { useState } from 'react';
import { Appointment } from '../App';

/**
 * A custom hook to manage the app's state. This could have also been bundled
 * with the main App component, but I wanted to organize it better so that the
 * App component was less cluttered.
 *
 * Alternate Solution: If we wanted to globally access the Appointments feature
 * across an application, then this may be better handled by a state management
 * solution such as Redux. The Context API could have also been used if we were
 * drilling props down several components and we didn't benefit from the
 * pros/cons associated with a global state management solutions.
 *
 * Note: I opted to not use a global state management solution here because
 * 1) the app's scope is relatively small, and 2) the requirement was to not
 * use external libraries. Context was also not used because the props
 * required to manage the state only go 1-level deep into the component hierarchy.
 */
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
