# Appointment App
https://3xmmm.github.io/appointment-app/

A simple React app that allows you to schedule appointments.

## Technologies Used
The requirement for this app is that no external libraries can be used. The only noteworthy things used are:
- React (bootstrapped via CRA)
- TypeScript (out of preference and the fact that it came with CRA)
- Jest/Testing Library (to demonstrate an understanding of unit/component testing)

## Main Features
### The App (`src/App.tsx`)
The source-of-truth for all state. This is where I'd recommend looking first to understand the app.

### The List (`src/appointments/AppointmentsList`)
A list component for the appointments. By default, it will sort all appointments in ascending order based on the date/time of the appointment. It has a filter feature that allows you to filter by:
- All (i.e. show all)
- Past Appointments only
- Upcoming Appointments only

### The Add and Edit Forms (`src/appointments/AppointmentForm`)
The main form component for adding and editing an Appointment.

### The Delete Feature (`src/appointments/AppointmentRemoveConfirmationModal`)
A confirmation modal that confirms if the User wants to delete an appointment.

## Custom Hooks
I used two custom hooks (`useAppointments` and `useDualPurposeForm`) that help encapsulate some logic.

### `useAppointments`
A hook that returns a reducer for managing the app's appointments. You'll see the dispatch method being used in a few places.

### `useDualPurposeForm`
A small hook where I placed some form display logic. It may not be necessary and arguably should have been somewhere else, but it's very simple/harmless and I kept it for that reason. The "dual purpose" name was chosen because it can track whether the form it's concerned with is an edit form or an add form.

## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in the interactive watch mode.
