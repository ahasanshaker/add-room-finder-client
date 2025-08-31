import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const RoomDetails = () => {
  const { id } = useParams(); // URL থেকে room ID
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  // যদি user login না থাকে
  useEffect(() => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please login first",
        showConfirmButton: true
      }).then(() => navigate("/login"));
    }
  }, [user, navigate]);

  // Fetch room details
  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/rooms/${id}`)
      .then(res => res.json())
      .then(data => {
        setRoom(data);
        setLikeCount(data.likes || 0);
      })
      .catch(err => {
        console.error(err);
        Swal.fire("Error", "Failed to fetch room details", "error");
      });
  }, [id, user]);

  // Like button handler
  const handleLike = () => {
    if (!user) {
      Swal.fire("Warning", "Please login to like this room", "warning");
      return;
    }
    if (liked) return;

    fetch(`http://localhost:3000/rooms/${id}/like`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: user.email })
    })
      .then(res => res.json())
      .then(data => {
        setLikeCount(data.likes);
        setLiked(true);
        Swal.fire("Liked!", "You liked this room.", "success");
      })
      .catch(err => {
        console.error(err);
        Swal.fire("Error", "Failed to like this room", "error");
      });
  };

  if (!user || !room) {
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">{room.title}</h1>
      <img src={room.image || "https://via.placeholder.com/600"} alt={room.title} className="w-full h-80 object-cover rounded-xl mb-6" />

      <div className="space-y-3">
        <p><span className="font-semibold">Location:</span> {room.location}</p>
        <p><span className="font-semibold">Rent:</span> ৳{room.rent}</p>
        <p><span className="font-semibold">Room Type:</span> {room.roomType}</p>
        <p><span className="font-semibold">Contact:</span> {room.contact}</p>
        <p><span className="font-semibold">Posted By:</span> {room.userName}</p>
        <p><span className="font-semibold">Description:</span> {room.description}</p>
      </div>

      {/* Like Button */}
      <div className="flex items-center gap-4 mt-6">
        <button 
          className={`btn ${liked ? 'btn-success' : 'btn-primary'}`}
          onClick={handleLike}
          disabled={liked}
        >
          {liked ? "Liked ❤️" : "Like 👍"}
        </button>
        <span>{likeCount} Likes</span>
      </div>

      <button 
        className="btn btn-secondary mt-6"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default RoomDetails;
