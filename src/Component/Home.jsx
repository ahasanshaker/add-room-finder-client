import { Link } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    fetch(
      "https://homefinder-omega.vercel.app/rooms/home"
    )
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setFilteredRooms(data);
      });
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) =>
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
          filteredRooms.map((room, index) => {
            let animationType = {};

            if (index % 3 === 0) {
              animationType = {
                initial: { opacity: 0, y: 60 },
                animate: { opacity: 1, y: 0 },
              };
            } else if (index % 3 === 1) {
              animationType = {
                initial: { opacity: 0, x: -80 },
                animate: { opacity: 1, x: 0 },
              };
            } else {
              animationType = {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
              };
            }

            return (
              <motion.div
                key={room._id}
                initial={animationType.initial}
                animate={animationType.animate}
                transition={{
                  duration: 0.8,
                  delay: index * 0.4,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition rounded-2xl"
              >
                <figure>
                  <img
                    src={room.image || "https://via.placeholder.com/400"}
                    alt={room.title}
                    className="h-52 w-full object-cover rounded-t-2xl"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-xl font-semibold">
                    {room.title}
                    <div className="badge badge-secondary text-xs md:text-sm truncate max-w-[100px]">
                      {room.roomType}
                    </div>
                  </h2>
                  <p className="text-gray-600 text-sm">{room.description}</p>
                  <div className="mt-3 space-y-1 text-sm">
                    <p>
                      <span className="font-semibold">📍 Location:</span>{" "}
                      {room.location}
                    </p>
                    <p>
                      <span className="font-semibold">💰 Rent:</span>{" "}
                      {room.rent} BDT
                    </p>
                    <p>
                      <span className="font-semibold">📞 Contact:</span>{" "}
                      {room.contact}
                    </p>
                  </div>
                  <div className="card-actions justify-between items-center mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Posted by</p>
                      <p className="font-medium">{room.userName}</p>
                    </div>
                    <Link
                      to={`/room/${room._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No rooms found for this location.
          </p>
        )}
      </div>

      {/* ===================== New Section 1: Featured Locations ===================== */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          🌍 Featured Locations in Dhaka
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Dhanmondi",
              desc: "Budget-friendly rooms near Dhanmondi.",
              color: "from-blue-500 to-indigo-500",
            },
            {
              title: "Mirpur",
              desc: "Affordable shared apartments in Mirpur.",
              color: "from-green-500 to-emerald-500",
            },
            {
              title: "Banani",
              desc: "Comfortable single rooms in Banani.",
              color: "from-purple-500 to-pink-500",
            },
          ].map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3, duration: 0.8 }}
              className={`p-6 bg-gradient-to-r ${loc.color} text-white rounded-2xl shadow-lg hover:scale-105 transition`}
            >
              <h3 className="text-xl font-semibold mb-2">{loc.title}</h3>
              <p>{loc.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================== New Section 2: Why Choose Us ===================== */}
      <section className="mt-20 mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          💡 Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: "💸",
              title: "Affordable Rent",
              desc: "Best price guarantee with no hidden charges.",
            },
            {
              icon: "🔒",
              title: "Verified Rooms",
              desc: "Every listing is checked & verified for your safety.",
            },
            {
              icon: "⚡",
              title: "Easy Booking",
              desc: "Quick & hassle-free booking process online.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3, duration: 0.6 }}
              className="p-6 bg-base-200 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <span className="text-5xl">{item.icon}</span>
              <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
              <p className="mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
