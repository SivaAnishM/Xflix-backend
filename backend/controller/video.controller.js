const { getVideo, getVideoById,patchVideos,patchView } = require("../services/video.service");
const Video = require("../models/videoModel");

const getVideos = async (req, res) => {
  const { title, genres, contentRating, sortBy } = req.query;
  let query = {};
  if (title) query.title = {'$regex': title,$options:'i'}
  if (genres) query.genre = { $in: genres.split(',') };
  if (contentRating) query.contentRating = contentRating;

  let videos = await getVideo(query );

  if (sortBy === 'releaseDate') {
    videos = videos.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  }
  res.status(200).json({ videos });
};

const getVideosById = async (req, res) => {
  const videos = await getVideoById(req.params.videoId);
  // console.log(videos);
  if (!videos) {
    return res.status(404).json({ message: "Video not found" });
  }
  res.status(200).json(videos);
};

const postVideos = async (req, res) => {
  try {
    const newVideo = await Video.create(req.body);
    res.status(201).json(newVideo);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const patchVideo = async(req,res) => {
  try {
    const { videoId } = req.params;
    const { vote, change } = req.body;

    if (!['upVote', 'downVote'].includes(vote) || !['increase', 'decrease'].includes(change)) {
      return res.status(400).json({ message: 'Invalid vote or change value' });
    }

    const update = { $inc: { [`votes.${vote}s`]: change === 'increase' ? 1 : -1 } };
    const updatedVideo = await patchVideos(videoId,update)
    console.log(updatedVideo)
    if (!updatedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(204).json(updatedVideo).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

const patchViews = async(req,res) => {
  try {
    const { videoId } = req.params;
    const update = { $inc: { viewCount: 1 } };
    const updatedVideo = await patchView(videoId,update)

    if (!updatedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getVideos, getVideosById, postVideos,patchVideo,patchViews };
