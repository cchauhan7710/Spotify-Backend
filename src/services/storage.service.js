import ImageKit from '@imagekit/nodejs';


const musicPrivateKey = new  ImageKit({
    privateKey : "private_4laoD3WaSc0q67OJVUJGZgFI/tw="
})

async function musicUpload(buffer) {

    const musicResponse = await musicPrivateKey.files.upload({
        file:buffer.toString("base64"),
        fileName:"music"+ Date.now(),
        folder:"sportify/music"
    })
    return musicResponse
}
export default musicUpload;