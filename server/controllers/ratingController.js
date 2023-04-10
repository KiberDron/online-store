const { Rating } = require("../models/models");
const ApiError = require("../error/ApiError");

class RatingController {
  async createRating(req, res, next) {
    try {
      const { userId, deviceId, rate } = req.body;
      const rating = await Rating.create({ userId, deviceId, rate });
      return res.json(rating);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateRating(req, res, next) {
    try {
      const { userId, deviceId, rate } = req.body;
      const rating = await Rating.update(
        { rate },
        { where: { userId, deviceId } }
      );
      return res.json(rating);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getUserRating(req, res) {
    const { id } = req.params;
    const { userId } = req.query;
    let rating = await Rating.findOne({ where: { userId, deviceId: id } });
    if (rating === null) {
      rating = { rate: 0 };
    }
    return res.json(rating);
  }

  async getRating(req, res) {
    const { id } = req.params;
    const { count, rows } = await Rating.findAndCountAll({
      where: { deviceId: id },
    });
    if (count === 0) {
      return res.json({ rating: 0, count });
    }
    let ratingSum = 0;
    rows.forEach((row) => {
      ratingSum += row.rate;
    });
    let rating = (ratingSum / count).toFixed(1);
    return res.json({ rating, count });
  }
}

module.exports = new RatingController();
