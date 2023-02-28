import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { AppointmentLocation } from '../appointments/useAppointments';
import AppointmentsList, { AppointmentsListProps } from '../appointments/AppointmentsList';

const getProps = (propOverrides: Partial<AppointmentsListProps> = {}) => {
    const dateObject = new Date();
    const currentDate = dateObject.getFullYear() + "-" + ("0" + (dateObject.getMonth() + 1)).slice(-2) + "-" + ("0" + dateObject.getDate()).slice(-2);
    const currentTimePlusAnHour = ("0" + ((dateObject.getHours() + 1) % 24)).slice(-2) + ":30";
    return {
        appointments: [
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
                date: '2025-10-15',
                time: '16:00',
                location: AppointmentLocation.London,
                description: 'This appointment is in the future and doesn\'t have any special styling.'
            },
        ],
        showEditForm: jest.fn(),
        handleDeleteAppointment: jest.fn(),
        ...propOverrides,
    }
};

const setup = (props: AppointmentsListProps = getProps()) => {
    return {
        ...render(<AppointmentsList {...props}/>),
        props,
    };
};

describe('the list functionality', () => {
    test('displays all provided appointments', () => {
        setup();
        const appointments = screen.getAllByText(/This appointment/);
        expect(appointments.length).toEqual(3);
    });

    test('it reacts to new appointments', () => {
        const { rerender, props } = setup();
        props.appointments.push({
            id: 4,
            date: '2025-10-15',
            time: '17:00',
            location: AppointmentLocation.London,
            description: 'This appointment is new.'
        });
        rerender(<AppointmentsList {...props}/>);
        const appointments = screen.getAllByText(/This appointment/);
        expect(appointments.length).toEqual(4);
    });

    test('it reacts to appointment removals', () => {
        const { rerender, props } = setup();
        props.appointments.pop();
        rerender(<AppointmentsList {...props}/>);
        const appointments = screen.getAllByText(/This appointment/);
        expect(appointments.length).toEqual(2);
    });
});

describe('the filter functionality', () => {
    test('it displays all appointments by default', () => {
        setup();
        const appointments = screen.getAllByText(/This appointment/);
        expect(appointments.length).toEqual(3);
    });

    test('it can show past appointments only', () => {
        setup();
        fireEvent.click(screen.getByLabelText(/Show past appointments only/));
        const appointments = screen.getAllByText(/This appointment/);
        expect(appointments.length).toEqual(1);
    });

    test('it can show upcoming appointments only', () => {
        setup();
        fireEvent.click(screen.getByLabelText(/Show upcoming appointments only/));
        const appointments = screen.getAllByText(/This appointment/);
        expect(appointments.length).toEqual(2);
    });
});

describe('the appointment total feature', () => { // i.e. the "Showing X of Y appointment(s)" text
    test('it displays correctly on initial render', () => {
        setup();
        const text = screen.getByText(/Showing 3 of 3 appointments/);
        expect(text).toBeTruthy();
    });

    test('it displays correctly when reacting to additions', () => {
        const { rerender, props } = setup();
        props.appointments.push({
            id: 4,
            date: '2025-10-15',
            time: '17:00',
            location: AppointmentLocation.London,
            description: 'This appointment is new.'
        });
        rerender(<AppointmentsList {...props}/>);
        const text = screen.getByText(/Showing 4 of 4 appointments/);
        expect(text).toBeTruthy();
    });

    test('it displays correctly when reacting to removals', () => {
        const { rerender, props } = setup();
        props.appointments.pop();
        rerender(<AppointmentsList {...props}/>);
        const text = screen.getByText(/Showing 2 of 2 appointments/);
        expect(text).toBeTruthy();
    });
});
