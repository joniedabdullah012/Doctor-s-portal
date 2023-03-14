import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Loading from '../../../Shared/Loading/Loading';
import AppointmentOption from '../AppointmentOption/AppointmentOption';
import BookingModal from '../BookingModal/BookingModal';

const AvailableAppointments = ({ selectedDate }) => {
    // const [appointmentOptions, setappointmentOption] = useState([]);

    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PP')

    const { data: appointmentoption = [], refetch, isLoading } = useQuery({
        queryKey: ['appointmentoption', date],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-silk-xi.vercel.app/appointmentoption?date=${date}`)
            const data = await res.json();
            return data

        }



    });

    if (isLoading) {
        return <Loading></Loading>

    }

    // useEffect(() => {
    //     fetch('https://doctors-portal-server-silk-xi.vercel.app/appointmentoption')
    //         .then(res => res.json())
    //         .then(data => setappointmentOption(data))

    // }, [])
    return (
        <section className='my-16'>
            <p className='text-center text-secondary font-bold'>Available Appointments on {format(selectedDate, 'PP')} </p>

            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
                {
                    appointmentoption.map(option => <AppointmentOption
                        key={option._id}

                        appointmentOption={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }

            </div>
            {
                treatment &&

                <BookingModal
                    selectedDate={selectedDate}

                    treatment={treatment}
                    setTreatment={setTreatment}
                    refetch={refetch}
                ></BookingModal>

            }

        </section>
    );
};

export default AvailableAppointments;