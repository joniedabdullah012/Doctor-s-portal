import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../../Shared/Loading/Loading';

const ManageDoctors = () => {
    const [deleteingDoctors, setDeleteingDoctors] = useState(null)

    const closeModal = () => {
        setDeleteingDoctors(null);


    }




    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {

            try {
                const res = await fetch('https://doctors-portal-server-silk-xi.vercel.app/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`


                    }

                });
                const data = await res.json();
                return data;

            }
            catch (error) {

            }

        }

    });

    const handleDeleteDoctor = doctor => {
        fetch(`https://doctors-portal-server-silk-xi.vercel.app/doctors/${doctor._id}`, {

            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }


        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success(`${doctor.name} doctor delete successfully `)

                }

            })

    }


    if (isLoading) {
        return <Loading></Loading>

    }
    return (
        <div>
            <h2 className='text-3xl'>Manage Doctors: {doctors?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doctor, i) =>
                                <tr key={doctor._id}>
                                    <th>{i + 1}</th>
                                    <td><div className="avatar">
                                        <div className="w-20 rounded-full">
                                            <img alt='' src={doctor.img} />
                                        </div>
                                    </div>
                                    </td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.email}</td>
                                    <td>{doctor.specialty}</td>
                                    <td>
                                        <label onClick={() => setDeleteingDoctors(doctor)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>

                                    </td>
                                </tr>

                            )
                        }

                    </tbody>
                </table>

                {
                    deleteingDoctors && <ConfirmationModal
                        title={`Are you sure deleteing doctor`}
                        message={`if you are deleteing ${deleteingDoctors.name}. It Cannot be undone`}
                        successAction={handleDeleteDoctor}
                        successButtonName="Delete"
                        modalData={deleteingDoctors}
                        closeModal={closeModal}

                    ></ConfirmationModal>
                }
            </div>
        </div>
    );
};

export default ManageDoctors;