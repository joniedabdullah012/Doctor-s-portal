import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const { name, slots, price } = treatment;
    const date = format(selectedDate, 'PP');
    const { user } = useContext(AuthContext)

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const patientname = form.patientname.value;
        const email = form.email.value;
        const slot = form.slot.value;
        const phone = form.phone.value;


        const booking = {
            appointmentDate: date,
            treatment: name,
            patient: patientname,
            email,
            slot,
            phone,
            price

        }

        fetch('https://doctors-portal-server-silk-xi.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setTreatment(null)
                    toast.success('booking confirm');
                    refetch();
                }
                else {
                    toast.error(data.message)

                }
            })






    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" disabled value={date} placeholder="Type here" className="input w-full input-bordered " />
                        <select name='slot' className="select select-bordered w-full max-w-xs">



                            {
                                slots.map((slot, i) => <option
                                    key={i}
                                    value={slot}

                                >{slot}</option>)
                            }
                        </select>
                        <input name='patientname' type="text" defaultValue={user?.diplayName} placeholder="Your Name" className="input w-full input-bordered " />
                        <input name='email' type="email" defaultValue={user?.email} placeholder="Email Address" className="input w-full input-bordered " disabled />
                        <input name='phone' type="text" placeholder="Phone Number" className="input w-full input-bordered " />
                        <br />
                        <input className='btn btn-accent w-full ' type="Submit" value="Submit" />
                    </form>

                </div>
            </div>

        </>
    );
};

export default BookingModal;