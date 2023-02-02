const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const POSTS_PATH = path.join('/uploads/posts/photos');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    photos:[{
            type: String,
    }]
},{
    timestamps: true
});

let newstorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname, '..', POSTS_PATH));
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+'.png');
    } 

})

postSchema.statics.uploadedPhotos = multer({storage: newstorage}).array('photos',7);

postSchema.statics.postsPath = POSTS_PATH;

const Post = mongoose.model('Post', postSchema);
module.exports = Post;