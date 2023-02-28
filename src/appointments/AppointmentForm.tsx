import { FormEvent, useEffect, useRef, useState } from 'react';
import './AppointmentForm.css';
import Button from '../components/Button';
import { Appointment, AppointmentLocation, AppointmentsAction } from './useAppointments';
import { FormType } from './useDualPurposeForm';

type AppointmentFormProps = {
    show: boolean
    currentFormType: FormType
    initialFormData: Appointment | null // Used to populate the Edit Form's initial values; will be null for Add Forms
    appointmentsDispatch: (action: AppointmentsAction) => void
    onClose: () => void
}

const dateObject = new Date();
const currentDate = dateObject.getFullYear() + "-" + ("0" + (dateObject.getMonth() + 1)).slice(-2) + "-" + ("0" + dateObject.getDate()).slice(-2);
const currentTimePlusAnHour = ("0" + ((dateObject.getHours() + 1) % 24)).slice(-2) + ":00";

export default function AppointmentForm(props: AppointmentFormProps) {
    const { show, currentFormType, initialFormData, appointmentsDispatch, onClose } = props;
    const [date, setDate] = useState(currentDate);
    const [time, setTime] = useState(currentTimePlusAnHour)
    const [location, setLocation] = useState<AppointmentLocation | ''>('');
    const [description, setDescription] = useState('');

    const firstInput = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: Appointment = {
            date,
            time,
            location: location as AppointmentLocation,
            description,
        };

        if (currentFormType === 'add') {
            appointmentsDispatch({ type: currentFormType, payload: formData });
        } else {
            formData.id = initialFormData?.id;
            appointmentsDispatch( { type: currentFormType, payload: formData });
        }
        onClose();
    };

    const handleBack = (e: any) => {
        e.preventDefault();
        onClose();
        return false;
    }

    useEffect(() => { // For accessibility
        if (show) {
            firstInput.current?.focus();
        }
    }, [show]);

    useEffect(() => { // When changing the initial form data, change the local state accordingly
        const setFormData = (formData: Appointment | null) => {
            setDate(formData?.date ?? currentDate);
            setTime(formData?.time ?? currentTimePlusAnHour);
            setLocation(formData?.location ?? '');
            setDescription(formData?.description ?? '');
        }
        if (initialFormData) { // Edit Form
            setFormData(initialFormData);
        } else { // Add Form
            setFormData(null);
        }
    }, [initialFormData]);

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
