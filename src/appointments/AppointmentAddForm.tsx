import { FormEvent, useState } from 'react';
import { Appointment, AppointmentLocation } from '../App';

type AppointmentAddFormProps = {
    show: boolean
    addAppointment: (appointment: Omit<Appointment, 'id'>) => void
    setShowAddForm: (value: boolean) => void
}

const dateObject = new Date();
const currentDate = dateObject.getFullYear() + "-" + ("0" + (dateObject.getMonth() + 1)).slice(-2) + "-" + ("0" + dateObject.getDate()).slice(-2);
const currentTimePlusAnHour = ("0" + ((dateObject.getHours() + 1) % 24)).slice(-2) + ":00";

export default function AppointmentAddForm({ show, addAppointment, setShowAddForm }: AppointmentAddFormProps) {
    const [date, setDate] = useState(currentDate);
    const [time, setTime] = useState(currentTimePlusAnHour)
    const [location, setLocation] = useState<AppointmentLocation | ''>('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addAppointment({
            date,
            time,
            location: location as AppointmentLocation,
            description
        });
        setDate(currentDate);
        setTime(currentTimePlusAnHour);
        setLocation('');
        setDescription('');
        setShowAddForm(false);
    };

    return (
        <>
            {
                show &&
                <form onSubmit={handleSubmit}>
                    <label htmlFor='date'>Date</label>
                    <input
                        id='date'
                        name='date'
                        type='date'
                        value={date} onChange={e => setDate(e.target.value)}
                        required
                    />

                    <label htmlFor='time'>Time</label>
                    <input
                        id='time'
                        name='time'
                        type='time'
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        required
                    />

                    <label htmlFor='location'>Location</label>
                    <select
                        id='location'
                        name='location'
                        value={location}
                        onChange={e => setLocation(e.target.value as AppointmentLocation)}
                        required
                    >
                        <option value=''>Select</option>
                        { Object.values(AppointmentLocation).map(a => {
                            return <option value={a} key={a}>{a}</option>
                        })}
                    </select>

                    <label htmlFor='description'>Description</label>
                    <input
                        id='description'
                        name='description'
                        type='text'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <button type='submit'>Submit</button>
                </form>
            }
        </>
    );
}
