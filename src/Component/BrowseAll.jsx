import { useEffect, useState } from "react";

const BrowseAll = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/rooms")
      .then(res => res.json())
      .then(data => setRooms(data));
  }, []);

  // Filter rooms by search term
  const filteredRooms = rooms.filter(room =>
    room.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-10 bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-purple-700">
        Browse All Rooms
      </h1>

      {/* Search Box */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Search by location..."
          className="input input-bordered w-full max-w-md focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRooms.map(room => (
          <div
            key={room._id}
            className="card bg-white shadow-xl hover:shadow-2xl border border-gray-200 transition-all duration-300"
          >
            <figure>
              <img
                src={room.image || "https://via.placeholder.com/400x250"}
                alt={room.title}
                className="h-52 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl font-semibold">
                {room.title}
                <div className="badge badge-secondary ml-2">{room.roomType}</div>
              </h2>
              <p className="text-gray-600 text-sm">{room.description}</p>

              <div className="mt-3 space-y-1 text-sm">
                <p>
                  <span className="font-semibold">📍 Location:</span> {room.location}
                </p>
                <p>
                  <span className="font-semibold">💰 Rent:</span> {room.rent} BDT
                </p>
                <p>
                  <span className="font-semibold">📞 Contact:</span> {room.contact}
                </p>
              </div>

              <div className="card-actions justify-between items-center mt-4">
                <div>
                  <p className="text-sm text-gray-500">Posted by</p>
                  <p className="font-medium">{room.userName}</p>
                </div>
                <button className="btn btn-primary btn-sm">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseAll;
