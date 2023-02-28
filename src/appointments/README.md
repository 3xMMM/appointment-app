# Appointments
This is where I chose to organize most of the logic/components. I could have kept everything in the main `<App>` component, but I wanted to organize it a bit better to help reduce cognitive load/promote focus.

There are two custom hooks:
- `useAppointments` (a reducer to keep track of the appointments)
- `useDualPurposeForm` (a collection of hooks to better encapsulate form display logic)
