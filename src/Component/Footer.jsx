import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {

  // Scroll top helper
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-gray-200 w-full mt-10">
      <div className="w-full px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Find RoomMate</h2>
          <p className="text-gray-400">
            Find the perfect roommate with ease. Add your room details or browse listings to connect with like-minded people and share your living space comfortably.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            {[
              { name: "Home", to: "/" },
              { name: "Add Room", to: "/addRoom" },
              { name: "Browse Listings", to: "/browseAll" },
              { name: "My Listings", to: "/myListing" }
            ].map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={scrollTop}
                  className="px-4 py-2 rounded-md transition duration-300 text-gray-300 hover:bg-primary hover:text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Contact</h2>
          <p className="text-gray-400">📧 Email: support@findroommate.com</p>
          <p className="text-gray-400">📞 Phone: +880 1234 567 890</p>
          <div className="flex gap-4 mt-4 text-gray-400">
            <a href="#" className="hover:text-white transition"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-white transition"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-white transition"><FaTwitter size={20} /></a>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-gray-500">
        &copy; {new Date().getFullYear()} Find RoomMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
