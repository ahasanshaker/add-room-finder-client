import { useEffect, useState } from "react";

const BrowseAll = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/rooms")
      .then(res => res.json())
      .then(data => setRooms(data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {rooms.map(room => (
        <div key={room._id} className="p-4 border rounded-lg shadow">
          <h2 className="text-xl font-bold">{room.title}</h2>
          <p>{room.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BrowseAll;
