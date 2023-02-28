import Card from '../components/Card';
import Button from '../components/Button';
import { Fragment } from 'react';
import { Appointment } from './useAppointments';

type AppointmentListItemProps = {
    appointment: Appointment
    showEditForm?: (appointment: Appointment) => void
    handleDeleteAppointment?: (appointment: Appointment) => void
}

export default function AppointmentCard({ appointment, showEditForm, handleDeleteAppointment }: AppointmentListItemProps) {
    const locale = 'en-US';
    const dateRaw = new Date(`${appointment.date}T${appointment.time}`);
    const date = new Intl.DateTimeFormat(locale, { month: 'long', day: 'numeric', year: 'numeric' }).format(dateRaw);
    const time = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: 'numeric' }).format(dateRaw);

    const currentDate = new Date();
    const isToday = currentDate.toDateString() === dateRaw.toDateString();
    const isPast = currentDate.getTime() > dateRaw.getTime();

    const actions = (showEditForm && handleDeleteAppointment && <Fragment>
        <Button onClick={() => showEditForm(appointment)}>Edit</Button>
        <Button onClick={() => handleDeleteAppointment(appointment)}>Remove</Button>
    </Fragment>)

    return (
        <Card
            label={`${time} on ${date}`}
            subLabel={appointment.location}
            actions={actions}
            highlight={isToday}
            opaque={isPast}
        >
            <div>{appointment.description}</div>
        </Card>
    );
}
