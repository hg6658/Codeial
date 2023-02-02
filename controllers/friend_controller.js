const friendShip = require('../models/friendship');
const User  = require('../models/user');


module.exports.toggleFriend = async function(req,res){
    try{
        if(req.query.deleted=='wtrue'){
            let friend = await friendShip.create({
                from_user: req.query.from,
                to_user: req.query.to
            });



            let users = await User.find({$or:[{_id:req.query.from},{_id:req.query.to}]});
            users.forEach(function(user){
                user.friendships.push(friend._id);
                user.save();
            })

            return res.json(200,{
                message: 'operation successful',
                data:{
                    deleted: false, 
                }
            });

        }else{
            let friend = await friendShip.find({
                $or:[
                    {
                        from_user: req.query.from,
                        to_user: req.query.to
                    },
                    {
                        from_user: req.query.to,
                        to_user: req.query.from
                    }
                ]
        
            });
            friend[0].remove();
            let users = await User.find({$or:[{_id:req.query.from},{_id:req.query.to}]});

            users.forEach(function(user){
                user.friendships.pull(friend[0]._id);
                user.save();
            })
            return res.json(200,{
                message: 'operation successful',
                data:{
                    deleted: true, 
                }
            });

        }

    }catch(err){
        console.log(err);
        return res.json(500,{message:'Internal Server Error'});
    }
} 
