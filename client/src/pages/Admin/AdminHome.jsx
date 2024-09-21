import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const [selectedSongForEdit, setSelectedSongForEdit] = React.useState(null);
  const { allSongs, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (!user?.isAdmin) {
        navigate("/");
      }
    }
  }, [user]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">All Songs</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-lg shadow-md transition-all duration-200"
          onClick={() => {
            navigate("/admin/add-edit-song");
          }}
        >
          Add Song
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full bg-gray-800 text-left">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6">Title</th>
              <th className="py-3 px-6">Artist</th>
              <th className="py-3 px-6">Album</th>
              <th className="py-3 px-6">Year</th>
              <th className="py-3 px-6">Duration</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm">
            {allSongs.map((song) => (
              <tr
                key={song.id}
                className="border-b border-gray-700 hover:bg-gray-700"
              >
                <td className="py-3 px-6">{song.title}</td>
                <td className="py-3 px-6">{song.artist}</td>
                <td className="py-3 px-6">{song.album}</td>
                <td className="py-3 px-6">{song.year}</td>
                <td className="py-3 px-6">{song.duration}</td>
                <td className="py-3 px-6">
                  <i
                    className="ri-pencil-line text-xl text-blue-400 cursor-pointer hover:text-blue-500"
                    onClick={() => {
                      navigate("/admin/add-edit-song/?id=" + song._id);
                    }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Songs Message */}
      {allSongs.length === 0 && (
        <p className="text-center text-gray-400 mt-6">No songs available.</p>
      )}
    </div>
  );
}

export default AdminHome;
