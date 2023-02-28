import AppointmentCard from './AppointmentCard';
import React, { useMemo, useState } from 'react';
import { Appointment } from './useAppointments';

export type AppointmentsListProps = {
    appointments: Appointment[]
    showEditForm: (appointment: Appointment) => void
    handleDeleteAppointment: (appointment: Appointment) => void
}

type Filter = 'all' | 'past' | 'upcoming';

const getTimestampForAppointment = (a: Appointment): number => Date.parse(`${a.date}T${a.time}`);

const sortAppointmentsInAscendingOrder = (a: Appointment, b: Appointment): number => {
    const aTimestamp = getTimestampForAppointment(a);
    const bTimestamp = getTimestampForAppointment(b);
    if (aTimestamp > bTimestamp) {
        return 1;
    } else if (aTimestamp < bTimestamp) {
        return -1;
    } else {
        return 0;
    }
}

const filterPastAppointments = (appointments: Appointment[]) => appointments.filter(a => getTimestampForAppointment(a) < Date.now());
const filterUpcomingAppointments = (appointments: Appointment[]) => appointments.filter(a => getTimestampForAppointment(a) > Date.now());

export default function AppointmentsList({ appointments, showEditForm, handleDeleteAppointment }: AppointmentsListProps) {
    const [filter, setFilter] = useState<Filter>('all');

    let displayedAppointments = useMemo(() => {
        let a = appointments;
        if (filter === 'past') {
            a = filterPastAppointments(a);
        } else if (filter === 'upcoming') {
            a = filterUpcomingAppointments(a);
        }
        return a.sort(sortAppointmentsInAscendingOrder);
    }, [appointments, filter]);

    return (
        <div className='AppointmentsList'>
            <fieldset>
                <legend>Filters</legend>
                <div className='RadioInput'>
                    <input type='radio' id='filterAll' name='filter' value='all' checked={ filter === 'all' } onChange={() => setFilter('all')}/>
                    <label htmlFor='filterAll'> Show all appointments</label>
                </div>
                <div className='RadioInput'>
                    <input type='radio' id='filterPast' name='filter' value='past' checked={ filter === 'past' } onChange={() => setFilter('past')}/>
                    <label htmlFor='filterPast'> Show past appointments only</label>
                </div>
                <div className='RadioInput'>
                    <input type='radio' id='filterUpcoming' name='filter' value='upcoming' checked={ filter === 'upcoming' } onChange={() => setFilter('upcoming')}/>
                    <label htmlFor='filterUpcoming'> Show upcoming appointments only</label>
                </div>
            </fieldset>
            <span className='AppointmentTotal'>
                Showing {displayedAppointments.length} of { appointments.length } appointments
            </span>
            <hr/>
            <ul>
                {
                    displayedAppointments.map(appointment => {
                        return (
                            <li key={appointment.id}>
                                <AppointmentCard
                                    appointment={appointment}
                                    showEditForm={showEditForm}
                                    handleDeleteAppointment={handleDeleteAppointment}
                                />
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}