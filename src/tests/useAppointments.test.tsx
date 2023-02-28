import { act, renderHook, waitFor } from '@testing-library/react';
import useAppointments, { AppointmentLocation } from '../appointments/useAppointments';

const setup = () => {
    return renderHook(() => useAppointments());
}

describe('the initial state', () => {
    test('it has 3 initial appointments', () => {
        const { result } = setup();
        expect(result.current[0].length).toEqual(3);
    });
});

describe('the dispatcher', () => {
    test('it can add a new appointment', async () => {
        const { result } = setup();
        act(() => {
            const [, dispatch] = result.current;
            dispatch({
                type: 'add',
                payload: {
                    id: 4,
                    date: '2025-10-15',
                    time: '17:00',
                    location: AppointmentLocation.London,
                    description: 'This appointment is new.'
                },
            });
        });
        const [appointments] = result.current;
        expect(appointments.length).toEqual(4);
    });

    test('it can edit an existing appointment', async () => {
        const { result } = setup();
        act(() => {
            const [appointments, dispatch] = result.current;
            const firstAppointment = appointments[0];
            dispatch({
                type: 'edit',
                payload: {
                    ...firstAppointment,
                    description: 'This appointment was edited.'
                },
            });
        });
        const [appointments] = result.current;
        expect(appointments[0].description).toEqual('This appointment was edited.');
    });

    test('it can delete an existing appointment', () => {
        const { result } = setup();
        act(() => {
            const [appointments, dispatch] = result.current;
            const firstAppointment = appointments[0];
            dispatch({
                type: 'delete',
                payload: firstAppointment,
            });
        });
        const [appointments] = result.current;
        expect(appointments.length).toEqual(2);
    });

    test('it throws an error if an invalid action type is used', () => {
        const { result } = setup();
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
        expect(() => {
            act(() => {
                const [appointments, dispatch] = result.current;
                const firstAppointment = appointments[0];
                dispatch({
                    // @ts-ignore this is expected to throw an error
                    type: 'Hello',
                    payload: firstAppointment,
                });
            });
        }).toThrowError();
        consoleErrorMock.mockClear();
    });
});
