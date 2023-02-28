import { FormEvent, useEffect, useRef, useState } from 'react';
import { Appointment, FormType, AppointmentLocation } from '../App';
import './AppointmentForm.css';
import Button from '../components/Button';

type AppointmentFormProps = {
    show: boolean
    type: FormType
    initialFormData: Appointment | null // Used to populate the Edit Form's initial values; will be null for Add Forms
    addHandler: (appointment: Omit<Appointment, "id">) => void
    editHandler: (appointment: Appointment) => void
    submitCallback: () => void
    closeCallback: () => void
}

const dateObject = new Date();
const currentDate = dateObject.getFullYear() + "-" + ("0" + (dateObject.getMonth() + 1)).slice(-2) + "-" + ("0" + dateObject.getDate()).slice(-2);
const currentTimePlusAnHour = ("0" + ((dateObject.getHours() + 1) % 24)).slice(-2) + ":00";

export default function AppointmentForm(props: AppointmentFormProps) {
    const { show, type, initialFormData, addHandler, editHandler, submitCallback, closeCallback } = props;

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

    const handleBack = (e: any) => {
        e.preventDefault();
        closeCallback();
        return false;
    }

    return (
        <form className='AppointmentForm' onSubmit={handleSubmit}>
            <div className='w-full'>
                <div className='FormControl w-half' style={{ display: 'inline-block', marginRight: '16px'}}>
                    <label htmlFor='date'>Date</label>
                    <input
                        ref={firstInput}
                        id='date'
                        className='w-full'
                        name='date'
                        type='date'
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className='FormControl w-half' style={{ display: 'inline-block' }}>
                    <label htmlFor='time'>Time</label>
                    <input
                        id='time'
                        className='w-full'
                        name='time'
                        type='time'
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className='FormControl'>
                <label htmlFor='location'>Location</label>
                <select
                    id='location'
                    name='location'
                    value={location}
                    onChange={e => setLocation(e.target.value as AppointmentLocation)}
                    required
                    className='w-full'
                >
                    <option value=''>Select</option>
                    { Object.values(AppointmentLocation).map(a => {
                        return <option value={a} key={a}>{a}</option>
                    })}
                </select>
            </div>

            <div className='FormControl'>
                <label htmlFor='description'>Description</label>
                <textarea
                    id='description'
                    name='description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={3}
                    className='w-full'
                />
            </div>

            <Button hierarchy='Primary' type='submit'>Submit</Button>
            <Button hierarchy='Secondary' type='button' onClick={handleBack}>Back</Button>
        </form>
    );
}
