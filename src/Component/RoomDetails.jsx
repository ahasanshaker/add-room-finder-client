import { useEffect, useState } from "react";
import { useParams } from "react-router";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/rooms/${id}`)
      .then(res => res.json())
      .then(data => setRoom(data));
  }, [id]);

  if (!room) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 card bg-base-100 shadow-xl">
      <figure>
        <img src={room.image} alt={room.title} className="w-full h-80 object-cover rounded" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl">{room.title}</h2>
        <p className="text-lg text-gray-700">{room.description}</p>

        <div className="mt-4 space-y-1">
          <p><span className="font-semibold">📍 Location:</span> {room.location}</p>
          <p><span className="font-semibold">💰 Rent:</span> {room.rent} BDT</p>
          <p><span className="font-semibold">🏠 Room Type:</span> {room.roomType}</p>
          <p><span className="font-semibold">👤 Lifestyle:</span> {room.lifeStyle}</p>
          <p><span className="font-semibold">📞 Contact:</span> {room.contact}</p>
          <p><span className="font-semibold">📅 Available From:</span> {room.available}</p>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500">Posted by: {room.userName} ({room.userEmail})</p>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
