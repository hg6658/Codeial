const Post = require('../models/post');
const User = require('../models/user');



module.exports.home = async function(req, res){

    try{

        let friends = await User.findById(req.user.id).populate({
            path:'friendships',
            match: {
                from_user:{
                    $eq:req.user.id
                }
            }, 
            select:'to_user',
            populate:{
                path:'to_user',
                populate:{
                    path:'posts',
                    populate:[{
                        path: 'user',
                        model:'User'
                    },
                    {
                        path: 'comments',
                        populate:[{
                            path: 'user'
                        },
                        {
                            path: 'likes'
                        }],
                        model:'Comment'
                    },{
                     path:'likes',
                     model:'Like'
                    }]
                },
                }
                   
            }
        );
        friends = friends.friendships;

        let friends_1 = await User.findById(req.user.id).populate({
            path:'friendships',
            match: {
                to_user:{
                    $eq:req.user.id
                }
            }, 
            select:'from_user',
            populate:{
                path:'from_user',
                populate:{
                    path:'posts',
                    populate:[{
                        path: 'user',
                        model:'User'
                    },
                    {
                        path: 'comments',
                        populate:[{
                            path: 'user'
                        },
                        {
                            path: 'likes'
                        }],
                        model:'Comment'
                    },{
                     path:'likes',
                     model:'Like'
                    }]
                },
                }
                   
            }
        );

        friends.push(...friends_1.friendships);
        let setA = await User.find({});
        let setB = friends.map(function(friend){
            if(friend.to_user){
                return {
                    _id:friend.to_user._id,
                    name: friend.to_user.name
                }
            }else{
                return{
                    _id:friend.from_user._id,
                    name:friend.from_user.name
                } 
            }
        });
        setA = setA.filter(function(user){
            return user._id!=req.user.id;
        })
        setA = setA.map(function(user){
            return {
                _id:user._id,
                name: user.name
            }
        })

        let compare = function(A,B){
            return ""+A._id==""+B._id;
        }

        let peopleKnow = setA.filter(function(user){
            return !setB.some(function(otherUser){
                return compare(user,otherUser);
            })
        })


        return res.render('home', {
            title: "Codeial | Home",
            data: friends,
            peoplenotknow: peopleKnow
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
