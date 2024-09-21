const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middlewares/authMiddleware");
const { cloudinary } = require("../cloudinary");
const Song = require("../models/songModel");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/add-song",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      cloudinary.v2.uploader.upload(
        req.file.path,
        {
          folder: "music-world",
          use_filename: true,
          resource_type: "raw",
        },
        async (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Something went wrong" });
          } else {
            const newsong = new Song({
              title: req.body.title,
              artist: req.body.artist,
              src: result.url,
              album: req.body.album,
              duration: req.body.duration,
              year: req.body.year,
            });
            await newsong.save();
            const allSongs = await Song.find();
            res.status(200).send({
              message: "Song added successfully",
              success: true,
              data: allSongs,
            });
          }
        }
      );
    } catch (error) {
      res.status(500).send({
        message: "Error adding song",
        success: false,
        data: error,
      });
    }
  }
);

router.post(
  "/edit-song",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      let response = null;
      if (req.file) {
        response = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "sheymusic-udmey",
          use_filename: true,
          resource_type: "raw",
        });
      }
      await Song.findByIdAndUpdate(req.body._id, {
        title: req.body.title,
        artist: req.body.artist,
        src: response ? response.url : req.body.src,
        album: req.body.album,
        duration: req.body.duration,
        year: req.body.year,
      });
      const allSongs = await Song.find();
      res.status(200).send({
        message: "Song edited successfully",
        success: true,
        data: allSongs,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error adding song",
        success: false,
        data: error,
      });
    }
  }
);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const authMiddleware = require("../middlewares/authMiddleware");
// const { cloudinary } = require("../cloudinary");
// const Song = require("../models/songModel");

// // Use multer memory storage to store file in memory instead of disk
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// console.log( "Cloudinart: ", cloudinary); // Add this line for debugging


// router.post(
//   "/add-song",
//   authMiddleware,
//   upload.single("file"),
//   async (req, res) => {
//     try {
//       // Ensure req.file is available before attempting to upload
//       if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded" });
//       }

//       // Upload the file to Cloudinary using upload_stream
//       const stream = cloudinary.uploader.upload_stream(
//         {
//           folder: "music-world",
//           use_filename: true,
//           resource_type: "raw",
//         },
//         async (err, result) => {
//           if (err) {
//             console.error(err); // Log error for debugging
//             return res.status(500).json({ message: "Something went wrong with Cloudinary" });
//           }

//           // Create a new song entry
//           const newsong = new Song({
//             title: req.body.title,
//             artist: req.body.artist,
//             src: result.url,
//             album: req.body.album,
//             duration: req.body.duration,
//             year: req.body.year,
//           });

//           await newsong.save();
//           const allSongs = await Song.find();
//           res.status(200).send({
//             message: "Song added successfully",
//             success: true,
//             data: allSongs,
//           });
//         }
//       );

//       stream.end(req.file.buffer); // End the stream with the buffer
//     } catch (error) {
//       console.error(error); // Log error for debugging
//       res.status(500).send({
//         message: "Error adding song",
//         success: false,
//         data: error,
//       });
//     }
//   }
// );

// router.post(
//   "/edit-song",
//   authMiddleware,
//   upload.single("file"),
//   async (req, res) => {
//     try {
//       let response = null;

//       if (req.file) {
//         response = await new Promise((resolve, reject) => {
//           const stream = cloudinary.uploader.upload_stream(
//             {
//               folder: "music-world",
//               use_filename: true,
//               resource_type: "raw",
//             },
//             (error, result) => {
//               if (error) return reject(error);
//               resolve(result);
//             }
//           );
//           stream.end(req.file.buffer); // End the stream with the buffer
//         });
//       }

//       await Song.findByIdAndUpdate(req.body._id, {
//         title: req.body.title,
//         artist: req.body.artist,
//         src: response ? response.url : req.body.src,
//         album: req.body.album,
//         duration: req.body.duration,
//         year: req.body.year,
//       });

//       const allSongs = await Song.find();
//       res.status(200).send({
//         message: "Song edited successfully",
//         success: true,
//         data: allSongs,
//       });
//     } catch (error) {
//       console.error(error); // Log error for debugging
//       res.status(500).send({
//         message: "Error editing song",
//         success: false,
//         data: error,
//       });
//     }
//   }
// );

// module.exports = router;
