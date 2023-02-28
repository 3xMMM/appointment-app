import { Appointment } from '../App';
import Card from '../components/Card';
import Button from '../components/Button';
import { Fragment } from 'react';

type AppointmentListItemProps = {
    appointment: Appointment
    showEditForm?: (appointment: Appointment) => void
    handleDeleteAppointment?: (appointment: Appointment) => void
}

const today = new Date();

export default function AppointmentCard({ appointment, showEditForm, handleDeleteAppointment }: AppointmentListItemProps) {
    const locale = 'en-US';
    const dateRaw = new Date(`${appointment.date}T${appointment.time}`);
    const date = new Intl.DateTimeFormat(locale, { month: 'long', day: 'numeric', year: 'numeric' }).format(dateRaw);
    const time = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: 'numeric' }).format(dateRaw);

    const actions = (showEditForm && handleDeleteAppointment && <Fragment>
        <Button onClick={() => showEditForm(appointment)}>Edit</Button>
        <Button onClick={() => handleDeleteAppointment(appointment)}>Cancel</Button>
    </Fragment>)

    const shouldHighlight = today.toDateString() === dateRaw.toDateString();

    return (
        <Card
            label={`${time} on ${date}`}
            subLabel={appointment.location}
            actions={actions}
            highlight={shouldHighlight}
        >
            <div>{appointment.description}</div>
        </Card>
    );
}
