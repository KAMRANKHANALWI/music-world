import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SetCurrentSong,
  SetCurrentSongIndex,
  SetSelectedPlaylist,
} from "../redux/userSlice";

function SongsList() {
  const { currentSong, selectedPlaylist, allSongs } = useSelector(
    (state) => state.user
  );
  const [songsToPlay, setSongsToPlay] = React.useState([]);
  const [searchKey, setSearchKey] = React.useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPlaylist) {
      if (
        selectedPlaylist.name === "All Songs" &&
        searchKey !== ""
      ) {
        const filteredSongs = selectedPlaylist.songs.filter((song) =>
          JSON.stringify(song).toLowerCase().includes(searchKey.toLowerCase())
        );
        setSongsToPlay(filteredSongs);
      } else {
        setSongsToPlay(selectedPlaylist?.songs);
      }
    }
  }, [selectedPlaylist, searchKey]);

  return (
    <div className="flex flex-col gap-4 bg-gray-900 p-4 rounded-lg shadow-lg h-full">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search Song, Artist, Album..."
          className="w-full py-2 pl-10 pr-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onFocus={() =>
            dispatch(
              SetSelectedPlaylist({
                name: "All Songs",
                songs: allSongs,
              })
            )
          }
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
      </div>

      {/* Songs List */}
      <div className="overflow-y-auto h-[54vh]">
        {songsToPlay.length > 0 ? (
          songsToPlay.map((song, index) => {
            const isPlaying = currentSong?._id === song._id;
            return (
              <div
                key={song._id}
                className={`flex justify-between items-center mb-4 p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-800 ${
                  isPlaying ? "bg-blue-700 text-white font-bold shadow-lg" : "bg-gray-800 text-gray-300"
                }`}
                onClick={() => {
                  dispatch(SetCurrentSong(song));
                  dispatch(SetCurrentSongIndex(index));
                }}
              >
                <div className="flex flex-col">
                  <h1 className="text-lg">{song.title}</h1>
                  <h2 className="text-sm text-gray-400">{song.artist} &middot; {song.album} ({song.year})</h2>
                </div>
                <div className="text-gray-400">
                  <h1>{song.duration}</h1>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-400 mt-6">No songs found</div>
        )}
      </div>
    </div>
  );
}

export default SongsList;
