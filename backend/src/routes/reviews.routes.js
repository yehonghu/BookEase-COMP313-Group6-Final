const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");

const reviewController = require("../controllers/reviews.controller");
router.get("/feed", reviewController.getReviewFeed); 

router.post("/", protect, reviewController.createReview);
router.get("/provider/:providerId", reviewController.getReviewsByProvider);
router.get("/me", protect, reviewController.getMyReviews);
router.patch("/:id/reply", protect, reviewController.replyReview);
router.delete("/:id", protect, reviewController.deleteReview);
module.exports = router;