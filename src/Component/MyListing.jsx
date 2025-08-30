import React, { useEffect, useState } from 'react';
// import { useAuth } from '../provider/AuthProvider';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useAuth } from '../provider/AuthProvider';

const MyListing = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/rooms/user?email=${user.email}`)
      .then(res => res.json())
      .then(data => setRooms(data));
  }, [user]);

  if (!user) {
    Swal.fire({
      icon: 'warning',
      title: 'Please login first',
      showConfirmButton: true
    }).then(() => navigate('/login'));

    return null;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">My Listing</h1>

      {rooms.length === 0 ? (
        <p className="text-center text-gray-600">You have not added any rooms yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.map(room => (
            <div key={room._id} className="bg-white shadow-md rounded-xl p-4">
              <img src={room.image} alt={room.title} className="w-full h-48 object-cover rounded-lg mb-3"/>
              <h2 className="text-xl font-semibold">{room.title}</h2>
              <p className="text-gray-600">{room.location}</p>
              <p className="text-gray-600">Rent: ৳{room.rent}</p>
              <p className="text-gray-600">Type: {room.roomType}</p>
              <p className="text-gray-600">Description: {room.description}</p>

              <button
                className="btn btn-warning mt-2"
                onClick={() => navigate(`/updateRoom/${room._id}`)}
              >
                Update
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListing;
