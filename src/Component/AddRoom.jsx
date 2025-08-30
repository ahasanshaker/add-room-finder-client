import React from 'react';

const AddRoom = () => {
  // Example user data (replace with actual auth data)
  const user = {
    name: "Ahasan Shaker",
    email: "shaker@example.com"
  };
  const handleRoomSubmit=(e)=>{
    e.preventDefault();
    const form= e.target;
    const formData = new FormData(form);
    const newRoom = Object.fromEntries(formData.entries());
    console.log(newRoom);

    // Send room data to the db
    fetch('http://localhost:3000/rooms',{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(newRoom)
    })
    
    .then(res=>res.json())
    .then(data=>{
        console.log('after adding coffee to db' ,data)
    })
  }

  return (
    <div className="mt-6 max-w-4xl mx-auto">
      {/* Title + Description */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary">
          Add Your Room And Find Roommate
        </h1>
        <p className="text-center text-gray-600 mt-4 px-6">
          Find the perfect roommate with ease. Add your room details or browse
          listings to connect with like-minded people and share your living
          space comfortably.
        </p>
      </div>

      {/* Form */}
      <div className="mt-10 bg-base-100 shadow-lg p-8 rounded-2xl">
        <form onSubmit={handleRoomSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Room Title */}
          <div className="form-control">
            <label className="label font-semibold">Room Title</label>
            <input 
              type="text" name='title'
              placeholder="e.g. Spacious 2BHK near Dhanmondi"
              className="input input-bordered w-full"
            />
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="label font-semibold">Location</label>
            <input
              type="text" name='location'
              placeholder="Enter your location"
              className="input input-bordered w-full"
            />
          </div>

          {/* Rent */}
          <div className="form-control">
            <label className="label font-semibold">Monthly Rent (৳)</label>
            <input
              type="number" name='rent'
              placeholder="Enter rent amount"
              className="input input-bordered w-full"
            />
          </div>

          {/* Room Type */}
          <div className="form-control">
  <label className="label font-semibold">Room Type</label>
  <input
    type="text" name='roomType'
    placeholder="e.g. Single Room, Shared Room, Apartment"
    className="input input-bordered w-full"
  />
</div>


          {/* Lifestyle */}
          <div className="form-control md:col-span-2">
            <label className="label font-semibold">Lifestyle (Pets / Smoking / Night Owl...)</label>
            <input
              type="text" name='lifeStyle'
              placeholder="e.g. No pets, Non-smoker, Early riser"
              className="input input-bordered w-full"
            />
          </div>

          {/* Contact Info */}
          <div className="form-control">
            <label className="label font-semibold">Contact Info</label>
            <input
              type="tel" name='contact'
              placeholder="e.g. 01XXXXXXXXX"
              className="input input-bordered w-full"
            />
          </div>

          {/* Availability Date */}
          <div className="form-control">
            <label className="label font-semibold">Available From</label>
            <input type="date" name='available' className="input input-bordered w-full" />
          </div>

          {/* Image URL */}
          <div className="form-control md:col-span-2">
            <label className="label font-semibold">Room Image URL</label>
            <input
              type="text" name='image'
              placeholder="Paste your image URL here"
              className="input input-bordered w-full"
            />
          </div>

          {/* User Name (read-only) */}
          <div className="form-control">
            <label className="label font-semibold">User Name</label>
            <input
              type="text"
              value={user.name} name='userName'
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* User Email (read-only) */}
          <div className="form-control">
            <label className="label font-semibold">User Email</label>
            <input
              type="email" name='userEmail'
              value={user.email}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Description (all fields er niche) */}
          <div className="form-control md:col-span-2">
            <label  className="label font-semibold">Description</label>
            <textarea name='description'
              className="textarea textarea-bordered h-28"
              placeholder="Write details about your room..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center mt-4">
           <input className="btn btn-primary px-10" type="submit" value="Add Room" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
