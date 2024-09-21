import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { SetAllSongs } from "../../redux/userSlice";

function AddEditSong() {
  const { allSongs, user } = useSelector((state) => state.user);
  const urlParams = new URLSearchParams(window.location.search);
  const songId = urlParams.get("id");
  const dispatch = useDispatch();
  const fileTypes = ["MP3"];
  const navigate = useNavigate();
  const [song, setSong] = React.useState({
    title: "",
    artist: "",
    album: "",
    year: "",
    duration: "",
    file: "",
  });

  const handleChange = (file) => {
    setSong({ ...song, file: file });
  };

  const onAdd = async () => {
    try {
      dispatch(ShowLoading());
      const formData = new FormData();
      Object.keys(song).forEach((key) => {
        formData.append(key, song[key]);
      });
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/admin/add-song`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success("Song added successfully");
        dispatch(SetAllSongs(response.data.data));
        navigate("/admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong");
    }
  };

  const onEdit = async () => {
    try {
      dispatch(ShowLoading());
      const formData = new FormData();
      Object.keys(song).forEach((key) => {
        formData.append(key, song[key]);
      });
      formData.append("_id", songId);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/admin/edit-song`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success("Song updated successfully");
        dispatch(SetAllSongs(response.data.data));
        navigate("/admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (songId && songId !== "") {
      const existingSong = allSongs.find((s) => s._id === songId);
      setSong(existingSong);
    }
  }, [allSongs]);

  useEffect(() => {
    if (user) {
      if (!user?.isAdmin) {
        navigate("/");
      }
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 rounded-xl">
      {/* Background Image */}
      <div
        className="w-full h-64 bg-cover bg-center relative rounded-xl"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1634564448238-2d954656bdb3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-70 flex justify-center items-center">
          <h1 className="text-5xl font-bold text-white shadow-md">
            {songId ? "Edit Song" : "Add Song"}
          </h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto p-10 flex flex-col md:flex-row items-center gap-12 mt-10">
        {/* Form */}
        <div className="w-full md:w-1/2 bg-gray-800 bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-10">
          <div className="flex flex-col gap-6">
            <input
              className="w-full p-4 bg-gray-900 bg-opacity-40 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              type="text"
              placeholder="Song Title"
              value={song.title}
              onChange={(e) => setSong({ ...song, title: e.target.value })}
            />
            <input
              className="w-full p-4 bg-gray-900 bg-opacity-40 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              type="text"
              placeholder="Artist"
              value={song.artist}
              onChange={(e) => setSong({ ...song, artist: e.target.value })}
            />
            <input
              className="w-full p-4 bg-gray-900 bg-opacity-40 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              type="text"
              placeholder="Album"
              value={song.album}
              onChange={(e) => setSong({ ...song, album: e.target.value })}
            />
            <input
              className="w-full p-4 bg-gray-900 bg-opacity-40 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              type="text"
              placeholder="Year"
              value={song.year}
              onChange={(e) => setSong({ ...song, year: e.target.value })}
            />
            <input
              className="w-full p-4 bg-gray-900 bg-opacity-40 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              type="text"
              placeholder="Duration"
              value={song.duration}
              onChange={(e) => setSong({ ...song, duration: e.target.value })}
            />
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              className="bg-gray-700 rounded"
            />
            {song.file && <p className="text-gray-400">{song.file.name}</p>}

            {/* Add/Edit Button */}
            <button
              className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all"
              onClick={songId ? onEdit : onAdd}
            >
              {songId ? "Update Song" : "Add Song"}
            </button>
          </div>
        </div>

        {/* Image Section
        <div className="w-full md:w-1/2">
          <img
            className="w-full h-auto rounded-lg shadow-lg transition-all hover:scale-105"
            src="https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Music"
          />
        </div> */}
      </div>
    </div>
  );
}

export default AddEditSong;
