import React from 'react';

const Review = ({ review }) => {
    const { name, img, location, userreviews } = review;
    return (
        <div className="card shadow-xl">
            <div className="card-body">

                <p>{userreviews}</p>
                <div className="flex items-center mt-6">
                    <div className="avatar mr-6">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img alt='' src={img} />
                        </div>

                    </div>
                    <div>
                        <h5 className="text-xl">{name}</h5>
                        <p>{location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;