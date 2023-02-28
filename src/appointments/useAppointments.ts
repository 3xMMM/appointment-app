import { useReducer } from 'react';

export enum AppointmentLocation {
    SanDiego = 'San Diego',
    Portland = 'Portland',
    Seattle = 'Seattle',
    London = 'London',
    Orlando = 'Orlando',
}

export type Appointment = {
    id?: number
    date: string
    time: string
    location: AppointmentLocation
    description: string
}
export type AppointmentsAction = {
    type: 'add' | 'edit' | 'delete'
    payload: Appointment
}

const dateObject = new Date();
const currentDate = dateObject.getFullYear() + "-" + ("0" + (dateObject.getMonth() + 1)).slice(-2) + "-" + ("0" + dateObject.getDate()).slice(-2);
const currentTimePlusAnHour = ("0" + ((dateObject.getHours() + 1) % 24)).slice(-2) + ":30";

function uniqueIdGenerator() {
    let currentId = 3; // Is 3 because I initialize the app with three sample Appointments.
    return function getNewId() {
        return ++currentId;
    }
}

const getAppointmentId = uniqueIdGenerator();

const initialAppointments = (): Appointment[] => {
    return [
        {
            id: 1,
            date: '2023-02-24',
            time: '11:00',
            location: AppointmentLocation.Seattle,
            description: 'This appointment was in the past and appears as a greyed out card.'
        },
        {
            id: 2,
            date: currentDate,
            time: currentTimePlusAnHour,
            location: AppointmentLocation.SanDiego,
            description: 'This appointment is coming up soon and has a green/teal ribbon to denote its importance.'
        },
        {
            id: 3,
            date: '2023-10-15',
            time: '16:00',
            location: AppointmentLocation.London,
            description: 'This appointment is in the future and doesn\'t have any special styling.'
        },
    ]
}

function reducer(appointments: Appointment[], action: AppointmentsAction) {
    const appointment = action.payload;
    switch (action.type) {
        case 'add': {
            return [...appointments, {
                ...appointment,
                id: getAppointmentId(),
            }];
        }
        case 'edit': {
            return appointments.map(a => {
                if (a.id === appointment.id) {
                    return appointment;
                } else {
                    return a;
                }
            });
        }
        case 'delete': {
            return appointments.filter(a => a.id !== appointment.id);
        }
        default: {
            throw Error(`Unknown action: ${action.type}`);
        }
    }
}

export default function useAppointments() {
    return useReducer(reducer, null, initialAppointments);
}
