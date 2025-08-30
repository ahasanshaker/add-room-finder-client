import { useEffect, useState } from "react";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);

  // Fetch all rooms
  useEffect(() => {
    fetch("http://localhost:3000/rooms/home")
      .then(res => res.json())
      .then(data => {
        setRooms(data);
        setFilteredRooms(data);
      });
  }, []);

  // Filter rooms by location
  useEffect(() => {
    if (!search) {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter(room =>
        room.location.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredRooms(filtered);
    }
  }, [search, rooms]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center mb-4">Featured Rooms</h1>

      {/* Search Box */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-72 md:w-96 focus:outline-none shadow-lg"
        />
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRooms.length > 0 ? (
          filteredRooms.map(room => (
            <div key={room._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
              <figure>
                <img
                  src={room.image || "https://via.placeholder.com/400"}
                  alt={room.title}
                  className="h-52 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl font-semibold">
                  {room.title}
                  <div className="badge badge-secondary">{room.roomType}</div>
                </h2>
                <p className="text-gray-600 text-sm">{room.description}</p>
                <div className="mt-3 space-y-1 text-sm">
                  <p><span className="font-semibold">📍 Location:</span> {room.location}</p>
                  <p><span className="font-semibold">💰 Rent:</span> {room.rent} BDT</p>
                  <p><span className="font-semibold">📞 Contact:</span> {room.contact}</p>
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
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No rooms found for this location.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
