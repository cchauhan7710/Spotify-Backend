import musicModel from "../models/music.model.js";
import jwt from "jsonwebtoken";
import musicUpload from "../services/storage.service.js";
import albumModel from "../models/album.model.js";

async function createAlbum(req, res) {

    const { title, music } = req.body;
    const album = await albumModel.create({
        title,
        artist: req.user.id,
        music: music

    })



    res.status(201).json({
        message: "Album created successfully",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            music: album.music
        }

    })


}

async function createMusic(req, res) {

    const { title } = req.body;

    const file = req.file
    console.log(file)


    //uploading the music file to imageKit and getting the url of the uploaded file
    const result = await musicUpload(file.buffer.toString("base64"))
    console.log("result value is :", result)


    const createArtist = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
    })

    res.status(200).json({
        message: "Music Created SuccessFully !",
        music: {
            id: createArtist._id,
            uri: createArtist.uri,
            title: createArtist.title,
            artist: createArtist.artist

        }
    })


}

async function getAllMusic(req, res) {
    const music = await musicModel.
    find()
    // .skip(0)
    // .limit(2)
    .populate("artist","userName  email" )
    res.status(200).json({
        message: "All music fetched successfully",
        music: music
    })
}

async function getAllAlbum(req,res) {

    
        const album = await albumModel.find().populate("artist","userName email")
        res.status(200).json({
            message:"All Album featched Successfully !",
            album:album})
    
}

async function getAlbumById(req,res)
{
    const albumId = req.params.albumId

    const album = await albumModel.findById(albumId).populate("artist" , "userName,email").populate("music")

       return res.status(404).json({
            message:"not found !",
            album:album

        })
    
}


export { createMusic, createAlbum, getAllMusic,getAllAlbum,getAlbumById }
