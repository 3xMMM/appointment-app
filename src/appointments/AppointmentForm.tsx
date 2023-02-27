import { FormEvent, useEffect, useRef, useState } from 'react';
import { Appointment, FormType, AppointmentLocation } from '../App';

type AppointmentFormProps = {
    show: boolean
    type: FormType
    initialFormData: Appointment | null // Used to populate the Edit Form's initial values; will be null for Add Forms
    addHandler: (appointment: Omit<Appointment, "id">) => void
    editHandler: (appointment: Appointment) => void
    submitCallback: () => void
}

const dateObject = new Date();
const currentDate = dateObject.getFullYear() + "-" + ("0" + (dateObject.getMonth() + 1)).slice(-2) + "-" + ("0" + dateObject.getDate()).slice(-2);
const currentTimePlusAnHour = ("0" + ((dateObject.getHours() + 1) % 24)).slice(-2) + ":00";

export default function AppointmentForm(props: AppointmentFormProps) {
    const { show, type, initialFormData, addHandler, editHandler, submitCallback } = props;

    const [date, setDate] = useState(currentDate);
    const [time, setTime] = useState(currentTimePlusAnHour)
    const [location, setLocation] = useState<AppointmentLocation | ''>('');
    const [description, setDescription] = useState('');
    let firstInput = useRef<HTMLInputElement | null>(null);

    // When showing the form, focus on the first input element.
    useEffect(() => {
        if (show) {
            firstInput.current?.focus();
        }
    }, [show]);

    // When changing the initial form data, change the local state accordingly
    useEffect(() => {
        if (initialFormData) { // Edit Form
            setDate(initialFormData.date);
            setTime(initialFormData.time);
            setLocation(initialFormData.location);
            setDescription(initialFormData.description);
        } else { // Add Form
            setDate(currentDate);
            setTime(currentTimePlusAnHour);
            setLocation('');
            setDescription('');
        }
    }, [initialFormData]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = {
            date,
            time,
            location: location as AppointmentLocation,
            description,
        };

        if (type === 'add') {
            addHandler(formData);
        } else {
            editHandler({
                ...formData,
                id: initialFormData?.id,
            });
        }
        submitCallback();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='date'>Date</label>
            <input
                ref={firstInput}
                id='date'
                name='date'
                type='date'
                value={date}
                onChange={e => setDate(e.target.value)}
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
    );
}
