import mongoose from "mongoose";
import { nanoid } from "nanoid";
import Url from "../models/Url.js";

export const shortURL = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).json({ message: "Please provide a valid URL" });
    }

    const shortCode = nanoid(6);
    const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

    const url = new Url({
      originalUrl,
      shortUrl,
    });

    await url.save();

    res.status(201).json({ originalUrl, shortUrl });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};

export const redirectURL = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const fullUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

    const url = await Url.findOne({ shortUrl: fullUrl });

    if (!url) {
      return res.status(404).send("URL not found");
    }

    if (url) {
      res.redirect(url.originalUrl);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};
