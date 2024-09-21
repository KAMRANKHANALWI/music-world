import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import {
  SetSelectedPlaylist,
  SetSelectedPlaylistForEdit,
  SetUser,
} from "../redux/userSlice";

function Playlists() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, allSongs, selectedPlaylist } = useSelector(
    (state) => state.user
  );

  const allPlaylists = [
    {
      name: "All Songs",
      songs: allSongs,
    },
    ...user.playlists,
  ];

  const onDelete = async (name) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/songs/delete-playlist`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success("Playlist deleted successfully");
        dispatch(
          SetSelectedPlaylist({
            name: "All Songs",
            songs: allSongs,
          })
        );
        dispatch(SetUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!selectedPlaylist && allSongs.length > 0) {
      dispatch(SetSelectedPlaylist(allPlaylists[0]));
    }
  }, [selectedPlaylist, allSongs]);

  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-col lg:flex-row">
        <h1 className="text-2xl text-white font-bold">Your Playlists</h1>
        <button
          className="text-blue-500 underline hover:text-blue-300 transition mt-4 lg:mt-0"
          onClick={() => navigate("/create-edit-playlist")}
        >
          Create Playlist
        </button>
      </div>

      {/* Playlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allPlaylists?.map((playlist, index) => {
          const isSelected = playlist?.name === selectedPlaylist?.name;
          return (
            <div
              key={index}
              className={`flex flex-col justify-between p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "bg-blue-700 text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => dispatch(SetSelectedPlaylist(playlist))}
            >
              <div>
                <h3 className="text-lg font-semibold">{playlist?.name}</h3>
                <p className="text-sm">{playlist?.songs?.length} songs</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  className="text-red-500 hover:text-red-300"
                  onClick={() => onDelete(playlist.name)}
                >
                  <i className="ri-delete-bin-line text-2xl"></i>
                </button>
                <button
                  className="text-yellow-500 hover:text-yellow-300"
                  onClick={() => {
                    dispatch(SetSelectedPlaylistForEdit(playlist));
                    navigate("/create-edit-playlist");
                  }}
                >
                  <i className="ri-pencil-line text-2xl"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Playlists;
