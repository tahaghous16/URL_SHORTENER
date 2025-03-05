import {
  postShortener,
  getShortener,
  redirectToShortenerId,
} from "../controller/postUrl.controller.js";
import express from "express";

const router = express.Router();

router.get("/", getShortener);

router.post("/", postShortener);

router.get("/:shortCode", redirectToShortenerId);

export const shortenerUrlRoutes = router;
