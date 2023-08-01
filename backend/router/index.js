const express = require("express");
const app = express();
const {getVideos,getVideosById,postVideos,patchVideo,patchViews} = require("../controller/video.controller")

console.log("router")
const router = express.Router();

router.get("/videos",getVideos)
router.get("/videos/:videoId",getVideosById)
router.post("/videos",postVideos)
router.patch("/videos/:videoId/votes",patchVideo)
router.patch("/videos/:videoId/views",patchViews)


module.exports = router;
