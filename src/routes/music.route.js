import express from "express"
import multer from "multer";
import { createMusic , createAlbum , getAllMusic , getAllAlbum , getAlbumById } from "../controllers/music.controller.js"
import {authArtist,authUser} from "../middleware/authArtist.middleware.js";

const router = express.Router()

const upload = multer({
    storage:multer.memoryStorage()
})

router.post("/create-music",authArtist,upload.single("music"),createMusic)
router.post("/create-album",authArtist,createAlbum)
router.get("/",authUser ,getAllMusic)
router.get("/album",authUser ,getAllAlbum)
router.get("/album/:albumId",authUser,getAlbumById)



export default router;