import AppointmentsListItem from './AppointmentsListItem';
import { Appointment } from '../App';

export type AppointmentsListProps = {
    appointments: Appointment[]
    deleteAppointment: (appointment: Appointment) => void
}

export default function AppointmentsList({ appointments, deleteAppointment }: AppointmentsListProps) {
    return(
        <ul>
            { appointments.map(appointment => <AppointmentsListItem key={appointment.id} appointment={appointment} deleteAppointment={deleteAppointment}/>) }
        </ul>
    );
}
