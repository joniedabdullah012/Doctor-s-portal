import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvailableAppointments from '../AvailableAppointments/AvailableAppointments';

const Appointment = () => {
    const [selectedDate, setSelectDate] = useState(new Date());
    return (
        <div>
            <AppointmentBanner
                selectedDate={selectedDate}
                setSelectDate={setSelectDate}

            ></AppointmentBanner>
            <AvailableAppointments
                selectedDate={selectedDate}

            ></AvailableAppointments>
        </div>
    );
};

export default Appointment;