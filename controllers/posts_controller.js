const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const Like = require('../models/like');
const path = require('path');

module.exports.create = async function(req, res){
    try{

        let PostsPath = [];
        let user = await User.findById(req.user._id);
        Post.uploadedPhotos(req, res, async function(err){
            if (err) {console.log('*****Multer Error:******* ', err)};
            
            for(let file of req.files) {
                PostsPath.push(path.join(Post.postsPath,file.filename));
            }
            let Content  = req.body.content;
            let post = await Post.create({
                content: Content,
                user: user._id,
                photos:PostsPath
            });
            user.posts.push(post._id);
            user.save();
    
        });


        
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }
  
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){

            // CHANGE :: delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});
            let user = await User.findById(post.user);
            user.posts.pull(post._id);
            user.save();

            post.remove();

            await Comment.deleteMany({post: req.params.id});


            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}