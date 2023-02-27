import { Appointment } from '../App';
import { MutableRefObject } from 'react';

type AppointmentListItemProps = {
    appointment: Appointment
    showEditForm: (appointment: Appointment) => void
    deleteAppointment: (appointment: Appointment) => void
    elementToFocusOnDelete: MutableRefObject<HTMLElement | null>
}

export default function AppointmentListItem({ appointment, showEditForm, deleteAppointment, elementToFocusOnDelete }: AppointmentListItemProps) {
    const handleDelete = () => {
        deleteAppointment(appointment);
        elementToFocusOnDelete.current?.focus();
    }
    return (
        <li>
            <div>{appointment.id}</div>
            <div>
                {`${appointment.date} @ ${appointment.time}`}
            </div>
            <div>{appointment.location}</div>
            <div>{appointment.description}</div>
            <button onClick={() => showEditForm(appointment)}>Edit</button>
            <button onClick={handleDelete}>Cancel</button>
        </li>
    );
}
