import { useState } from 'react';

export type FormType = 'add' | 'edit';

export type Form<FormData> = {
    formIsVisible: boolean,
    currentFormType: FormType,
    initialFormData: FormData | null,
    hideForm: () => void,
    showAddForm: () => void,
    showEditForm: (formData: FormData) => void,
}

/**
 * A "Dual Purpose" Form in this context would be a form that reuses the
 * same inputs/form data schema for its Add and Edit functionality.
 */
export default function useDualPurposeForm<FormData>(): Form<FormData> {
    const [formIsVisible, setFormIsVisible] = useState(false);
    const [currentFormType, setCurrentFormType] = useState<FormType>('add');
    const [initialFormData, setInitialFormData] = useState<FormData | null>(null);
    
    const hideForm = () => {
        setFormIsVisible(false);
    }

    const showAddForm = () => {
        setInitialFormData(null);
        setFormIsVisible(true);
        setCurrentFormType('add');
    };

    const showEditForm = (formData: FormData) => {
        setInitialFormData(formData);
        setFormIsVisible(true);
        setCurrentFormType('edit');
    }

    return {
        formIsVisible,
        currentFormType,
        initialFormData,
        hideForm,
        showAddForm,
        showEditForm,
    };
}