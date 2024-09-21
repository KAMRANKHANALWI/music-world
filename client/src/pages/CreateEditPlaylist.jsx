import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Player from "../components/Player";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import {
  SetSelectedPlaylist,
  SetSelectedPlaylistForEdit,
  SetUser,
} from "../redux/userSlice";

function CreateEditPlaylist() {
  const dispatch = useDispatch();
  const [name, setName] = React.useState("");
  const [selectedSongs, setSelectedSongs] = React.useState([]);
  const { allSongs, selectedPlaylistForEdit } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const selectUnselectSong = (song) => {
    if (selectedSongs.find((s) => s._id === song._id)) {
      setSelectedSongs(selectedSongs.filter((s) => s._id !== song._id));
    } else {
      setSelectedSongs([...selectedSongs, song]);
    }
  };

  const onAdd = async () => {
    if (name.trim().length === 0 || selectedSongs.length === 0) {
      toast.error("Please fill all fields");
    } else {
      try {
        dispatch(ShowLoading());
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/songs/add-playlist`,
          { name, songs: selectedSongs },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(HideLoading());
        if (response.data.success) {
          toast.success("Playlist created successfully");
          dispatch(SetUser(response.data.data));
          setName("");
          setSelectedSongs([]);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        toast.error("Something went wrong");
      }
    }
  };

  const onEdit = async () => {
    if (name.trim().length === 0 || selectedSongs.length === 0) {
      toast.error("Please fill all fields");
    } else {
      try {
        dispatch(ShowLoading());
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/songs/update-playlist`,
          { name, songs: selectedSongs },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(HideLoading());
        if (response.data.success) {
          toast.success("Playlist updated successfully");
          dispatch(SetUser(response.data.data));
          dispatch(SetSelectedPlaylistForEdit(null));
          dispatch(SetSelectedPlaylist({ name: "All Songs", songs: allSongs }));
          setName("");
          setSelectedSongs([]);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (selectedPlaylistForEdit) {
      setName(selectedPlaylistForEdit.name);
      setSelectedSongs(selectedPlaylistForEdit.songs);
    }
  }, []);

  return (
    <div
      className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w mx-auto "
      style={{ minHeight: "calc(100vh - 240px)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <i
          className="ri-arrow-left-line text-3xl cursor-pointer hover:text-gray-400 transition"
          onClick={() => navigate("/")}
        ></i>
        <h1 className="text-3xl font-bold">
          {selectedPlaylistForEdit ? "Edit" : "Create"} Playlist
        </h1>
      </div>

      {/* Form */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
        <input
          className="w-full lg:w-1/2 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Playlist name"
          value={name}
          disabled={!!selectedPlaylistForEdit}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="w-full lg:w-auto bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-lg transition"
          onClick={selectedPlaylistForEdit ? onEdit : onAdd}
        >
          {selectedPlaylistForEdit ? "Update" : "Save"} Playlist
        </button>
      </div>

      {/* Selected Songs Count */}
      <h2 className="text-xl font-semibold mb-4">
        Selected Songs: {selectedSongs.length}
      </h2>

      {/* Songs List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allSongs.map((song, index) => {
          const isSelected = selectedSongs.some((s) => s._id === song._id);
          return (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "bg-blue-600 border-2 border-blue-400"
                  : "bg-gray-800"
              } hover:bg-gray-700`}
              onClick={() => selectUnselectSong(song)}
            >
              <h3 className="font-semibold">{song.title}</h3>
              <p className="text-sm text-gray-400">{`${song.artist} - ${song.album} - ${song.year}`}</p>
            </div>
          );
        })}
      </div>
      {/* Music Player */}
      <div className="mt-48">
        <Player />
      </div>
    </div>
  );
}

export default CreateEditPlaylist;
