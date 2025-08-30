import { useEffect, useState } from "react";

const BrowseAll = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/rooms")
      .then(res => res.json())
      .then(data => setRooms(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Browse All Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div
            key={room._id}
            className="card bg-base-100 shadow-xl border hover:shadow-2xl transition-all duration-300"
          >
            <figure>
              <img
                src={room.image || "https://via.placeholder.com/400x250"}
                alt={room.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{room.title}</h2>
              <p className="text-gray-600">{room.description}</p>
              <div className="mt-2">
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {room.location || "Not specified"}
                </p>
                <p>
                  <span className="font-semibold">Rent:</span> ৳
                  {room.rent || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Room Type:</span>{" "}
                  {room.roomType || "N/A"}
                </p>
              </div>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-neutral btn-sm">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseAll;
