import { Appointment } from '../App';

export type AppointmentsListItemProps = {
    appointment: Appointment
    deleteAppointment: (appointment: Appointment) => void
}

export default function AppointmentsListItem({ appointment, deleteAppointment }: AppointmentsListItemProps) {
    return (
        <li>
            <div>{appointment.id}</div>
            <div>
                {`${appointment.date} @ ${appointment.time}`}
            </div>
            <div>{appointment.location}</div>
            <div>{appointment.description}</div>
            <button>Edit</button>
            <button onClick={() => deleteAppointment(appointment)}>Cancel</button>
        </li>
    );
}
