const Video = require("../models/videoModel");

const getVideo = async (query) => {
  let videos = Video.find(query);
  return videos;
};

const getVideoById = async (id) => {
  let videos = Video.findById(id);
  return videos;
};

const patchVideos = async (videoId, update) => {
  const updatedVideo = await Video.findByIdAndUpdate(videoId, update);
  let videos = Video.findById(videoId);
  return videos;
};

const patchView = async (videoId, update) => {
  const updatedVideo = await Video.findByIdAndUpdate(videoId, update, { new: true });
  return updatedVideo;
}
module.exports = { getVideo, getVideoById, patchVideos,patchView };
