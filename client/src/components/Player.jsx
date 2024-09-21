import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SetCurrentSong,
  SetCurrentSongIndex,
  SetCurrentTime,
  SetIsPlaying,
} from "../redux/userSlice";

function Player() {
  const [volume, setVolume] = useState(0.5);
  const [shuffleOn, setShuffleOn] = useState(false);
  const dispatch = useDispatch();
  const audioRef = React.createRef();
  const { currentSong, currentSongIndex, allSongs, isPlaying, currentTime } =
    useSelector((state) => state.user);

  const onPlay = () => {
    audioRef.current.play();
    dispatch(SetIsPlaying(true));
  };

  const onPause = () => {
    audioRef.current.pause();
    dispatch(SetIsPlaying(false));
  };

  const getRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * allSongs.length);
    dispatch(SetCurrentSongIndex(randomIndex));
    dispatch(SetCurrentSong(allSongs[randomIndex]));
  };

  const onPrev = () => {
    if (currentSongIndex !== 0 && !shuffleOn) {
      dispatch(SetCurrentSongIndex(currentSongIndex - 1));
      dispatch(SetCurrentSong(allSongs[currentSongIndex - 1]));
    } else {
      getRandomSong();
    }
  };

  const onNext = () => {
    if (currentSongIndex !== allSongs.length - 1 && !shuffleOn) {
      dispatch(SetCurrentSongIndex(currentSongIndex + 1));
      dispatch(SetCurrentSong(allSongs[currentSongIndex + 1]));
    } else {
      getRandomSong();
    }
  };

  // Handle auto-play when song ends
  const handleSongEnd = () => {
    if (shuffleOn) {
      getRandomSong();
    } else {
      onNext();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (!currentSong && allSongs.length > 0) {
      dispatch(SetCurrentSong(allSongs[0]));
    }
  }, [allSongs]);

  useEffect(() => {
    if (currentTime) {
      audioRef.current.currentTime = currentTime;
    }
  }, []);

  return (
    <div className="flex flex-col lg:flex-row mt-4 items-center justify-between bg-gray-900 p-4 rounded-lg shadow-lg">
      <div className="flex items-center gap-4 w-full lg:w-1/3">
        <img
          className="h-16 w-16 lg:h-24 lg:w-24 rounded-lg"
          src="https://images.unsplash.com/photo-1471029093449-ca61fffdc2af?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="text-white">
          <h1 className="text-lg lg:text-xl font-semibold">
            {currentSong?.title}
          </h1>
          <h2 className="text-sm lg:text-base">{currentSong?.artist}</h2>
          <h3 className="text-xs lg:text-sm">{currentSong?.album}</h3>
          <h4 className="text-xs lg:text-sm">{currentSong?.year}</h4>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 w-full lg:w-1/3">
        <audio
          src={currentSong?.src}
          ref={audioRef}
          onTimeUpdate={(e) => {
            dispatch(SetCurrentTime(e.target.currentTime));
          }}
          onEnded={handleSongEnd} // Auto-play when song ends
        />
        <div className="flex gap-5">
          <i
            className="ri-skip-back-line text-2xl text-white cursor-pointer"
            onClick={onPrev}
          ></i>

          {isPlaying ? (
            <i
              className="ri-pause-line text-2xl text-white cursor-pointer"
              onClick={onPause}
            ></i>
          ) : (
            <i
              className="ri-play-line text-2xl text-white cursor-pointer"
              onClick={onPlay}
            ></i>
          )}

          <i
            className="ri-skip-forward-line text-2xl text-white cursor-pointer"
            onClick={onNext}
          ></i>
        </div>

        <div className="flex items-center gap-3 w-full">
          <i
            className={`ri-shuffle-line text-lg ${
              shuffleOn ? "text-orange-500" : "text-white"
            } cursor-pointer`}
            onClick={() => setShuffleOn(!shuffleOn)}
          ></i>
          <h1 className="text-white">
            {Math.floor(currentTime / 60)}:
            {String(Math.floor(currentTime % 60)).padStart(2, "0")}
          </h1>
          <input
            type="range"
            className="flex-grow h-1 bg-gray-700 rounded-lg"
            min={0}
            max={Number(currentSong?.duration) * 60}
            value={currentTime}
            onChange={(e) => {
              audioRef.current.currentTime = e.target.value;
              dispatch(SetCurrentTime(e.target.value));
            }}
          />
          <h1 className="text-white">{currentSong?.duration}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full lg:w-1/3 justify-end">
        <i
          className="ri-volume-mute-line text-2xl text-white cursor-pointer"
          onClick={() => {
            setVolume(0);
            audioRef.current.volume = 0;
          }}
        ></i>
        <input
          type="range"
          className="h-1 bg-gray-700 rounded-lg w-24 lg:w-32"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={(e) => {
            audioRef.current.volume = e.target.value;
            setVolume(e.target.value);
          }}
        />
        <i
          className="ri-volume-down-line text-2xl text-white cursor-pointer"
          onClick={() => {
            setVolume(1);
            audioRef.current.volume = 1;
          }}
        ></i>
      </div>
    </div>
  );
}

export default Player;


// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   SetCurrentSong,
//   SetCurrentSongIndex,
//   SetCurrentTime,
//   SetIsPlaying,
// } from "../redux/userSlice";

// function Player() {
//   const [volume, setVolume] = useState(0.5);
//   const [shuffleOn, setShuffleOn] = useState(false);
//   const dispatch = useDispatch();
//   const audioRef = React.createRef();
//   const { currentSong, currentSongIndex, allSongs, isPlaying, currentTime } =
//     useSelector((state) => state.user);

//   const onPlay = () => {
//     audioRef.current.play();
//     dispatch(SetIsPlaying(true));
//   };

//   const onPause = () => {
//     audioRef.current.pause();
//     dispatch(SetIsPlaying(false));
//   };

//   const getRandomSong = () => {
//     const randomIndex = Math.floor(Math.random() * allSongs.length);
//     dispatch(SetCurrentSongIndex(randomIndex));
//     dispatch(SetCurrentSong(allSongs[randomIndex]));
//   };

//   const onPrev = () => {
//     if (currentSongIndex !== 0 && !shuffleOn) {
//       dispatch(SetCurrentSongIndex(currentSongIndex - 1));
//       dispatch(SetCurrentSong(allSongs[currentSongIndex - 1]));
//     } else {
//       getRandomSong();
//     }
//   };

//   const onNext = () => {
//     if (currentSongIndex !== allSongs.length - 1 && !shuffleOn) {
//       dispatch(SetCurrentSongIndex(currentSongIndex + 1));
//       dispatch(SetCurrentSong(allSongs[currentSongIndex + 1]));
//     } else {
//       getRandomSong();
//     }
//   };

//   useEffect(() => {
//     if (isPlaying) {
//       audioRef.current.pause();
//       audioRef.current.load();
//       audioRef.current.play();
//     }
//   }, [currentSong]);

//   useEffect(() => {
//     if (!currentSong && allSongs.length > 0) {
//       dispatch(SetCurrentSong(allSongs[0]));
//     }
//   }, [allSongs]);

//   useEffect(() => {
//     if (currentTime) {
//       audioRef.current.currentTime = currentTime;
//     }
//   }, []);

//   return (
//     <div className="flex flex-col lg:flex-row mt-4 items-center justify-between bg-gray-900 p-4 rounded-lg shadow-lg">
//       <div className="flex items-center gap-4 w-full lg:w-1/3">
//         <img
//           className="h-16 w-16 lg:h-24 lg:w-24 rounded-lg"
//           src="https://images.unsplash.com/photo-1471029093449-ca61fffdc2af?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           alt=""
//         />
//         <div className="text-white">
//           <h1 className="text-lg lg:text-xl font-semibold">
//             {currentSong?.title}
//           </h1>
//           <h2 className="text-sm lg:text-base">{currentSong?.artist}</h2>
//           <h3 className="text-xs lg:text-sm">{currentSong?.album}</h3>
//           <h4 className="text-xs lg:text-sm">{currentSong?.year}</h4>
//         </div>
//       </div>

//       <div className="flex flex-col items-center gap-4 w-full lg:w-1/3">
//         <audio
//           src={currentSong?.src}
//           ref={audioRef}
//           onTimeUpdate={(e) => {
//             dispatch(SetCurrentTime(e.target.currentTime));
//           }}
//         />
//         <div className="flex gap-5">
//           <i
//             className="ri-skip-back-line text-2xl text-white cursor-pointer"
//             onClick={onPrev}
//           ></i>

//           {isPlaying ? (
//             <i
//               className="ri-pause-line text-2xl text-white cursor-pointer"
//               onClick={onPause}
//             ></i>
//           ) : (
//             <i
//               className="ri-play-line text-2xl text-white cursor-pointer"
//               onClick={onPlay}
//             ></i>
//           )}

//           <i
//             className="ri-skip-forward-line text-2xl text-white cursor-pointer"
//             onClick={onNext}
//           ></i>
//         </div>

//         <div className="flex items-center gap-3 w-full">
//           <i
//             className={`ri-shuffle-line text-lg ${
//               shuffleOn ? "text-orange-500" : "text-white"
//             } cursor-pointer`}
//             onClick={() => setShuffleOn(!shuffleOn)}
//           ></i>
//           <h1 className="text-white">
//             {Math.floor(currentTime / 60)}:
//             {String(Math.floor(currentTime % 60)).padStart(2, "0")}
//           </h1>
//           <input
//             type="range"
//             className="flex-grow h-1 bg-gray-700 rounded-lg"
//             min={0}
//             max={Number(currentSong?.duration) * 60}
//             value={currentTime}
//             onChange={(e) => {
//               audioRef.current.currentTime = e.target.value;
//               dispatch(SetCurrentTime(e.target.value));
//             }}
//           />
//           <h1 className="text-white">{currentSong?.duration}</h1>
//         </div>
//       </div>

//       <div className="flex items-center gap-3 w-full lg:w-1/3 justify-end">
//         <i
//           className="ri-volume-mute-line text-2xl text-white cursor-pointer"
//           onClick={() => {
//             setVolume(0);
//             audioRef.current.volume = 0;
//           }}
//         ></i>
//         <input
//           type="range"
//           className="h-1 bg-gray-700 rounded-lg w-24 lg:w-32"
//           min={0}
//           max={1}
//           step={0.1}
//           value={volume}
//           onChange={(e) => {
//             audioRef.current.volume = e.target.value;
//             setVolume(e.target.value);
//           }}
//         />
//         <i
//           className="ri-volume-down-line text-2xl text-white cursor-pointer"
//           onClick={() => {
//             setVolume(1);
//             audioRef.current.volume = 1;
//           }}
//         ></i>
//       </div>
//     </div>
//   );
// }

// export default Player;

