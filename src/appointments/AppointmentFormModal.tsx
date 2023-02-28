import AppointmentForm from './AppointmentForm';
import Modal from '../components/Modal';
import React from 'react';
import { FormType } from './useDualPurposeForm';
import { Appointment, AppointmentsAction } from './useAppointments';

type AppointmentFormModalProps = {
    show: boolean
    currentFormType: FormType
    initialFormData: Appointment | null
    appointmentsDispatch: (action: AppointmentsAction) => void
    onClose: () => void
}

export default function AppointmentFormModal(props: AppointmentFormModalProps) {
    return (
        <Modal
            title={`${props.currentFormType === 'add' ? 'Add' : 'Edit' } Appointment`}
            show={props.show}
            onClose={props.onClose}
        >
            <AppointmentForm {...props}/>
        </Modal>
    );
}