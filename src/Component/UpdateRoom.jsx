import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const UpdateRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    fetch(`https://homefinder-omega.vercel.app/rooms`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(r => r._id === id);
        if (found) setRoom(found);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedRoom = Object.fromEntries(formData.entries());

    fetch(`https://homefinder-omega.vercel.app/rooms/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(updatedRoom)
    })
      .then(res => res.json())
      .then(data => {
        Swal.fire({
          icon: 'success',
          title: 'Room updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/'); // navigate to home or mylisting
      });
  };

  if (!room) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-base-100 shadow-lg p-6 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Update Room</h1>
      <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-4">
        <input type="text" name="title" defaultValue={room.title} className="input input-bordered w-full" required />
        <input type="text" name="location" defaultValue={room.location} className="input input-bordered w-full" required />
        <input type="number" name="rent" defaultValue={room.rent} className="input input-bordered w-full" required />
        <input type="text" name="roomType" defaultValue={room.roomType} className="input input-bordered w-full" required />
        <input type="text" name="lifeStyle" defaultValue={room.lifeStyle} className="input input-bordered w-full" required />
        <input type="tel" name="contact" defaultValue={room.contact} className="input input-bordered w-full" required />
        <input type="date" name="available" defaultValue={room.available} className="input input-bordered w-full" required />
        <input type="text" name="image" defaultValue={room.image} className="input input-bordered w-full" required />
        <textarea name="description" defaultValue={room.description} className="textarea textarea-bordered h-28" required />
        <button className="btn btn-primary mt-2">Update Room</button>
      </form>
    </div>
  );
};

export default UpdateRoom;
