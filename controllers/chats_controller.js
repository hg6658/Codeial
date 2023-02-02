const User = require('../models/user');
const Chat = require('../models/chat');
const Message = require('../models/message');
module.exports.fetchall = async function(req,res){
    let messages = await User.findById(req.user.id).populate({
        path:'chats',
        model:'Chat',
        populate:[{
            path:'messages',
            model:'Message',
    
            perDocumentLimit:1,
            sort:{
                createdAt:-1
            },
            populate:{
                path:'sender',
                model:'User',
                select:'name'
            }

        },{
            path:'part1',
            model:'User',
            select:'name avatar'
        },
       {
            path:'part2',
            model:'User',
            select:'name avatar'
        }]
    });


    return res.status(200).json({
        chats:messages.chats,
        my_id: req.user.id
    });

}


module.exports.fetchOne = async function(req,res){

    let messages = await User.findById(req.user.id).populate({
        path:'chats',
        model:'Chat',
        match:{
            _id:req.params.id
        },
        populate:{
            path:'messages',
            model:'Message',
            populate:{
                path:'sender',
                model:'User',
                select:'name'
            }
        }

    })
    
    messages = messages.chats[0].messages;
    
    return res.status(200).json({ 
        messages,
        my_id: req.user.id
    });
}


module.exports.fetchNew = async function(req, res){
    let chat = await Chat.findOne({$or:[
        {
            part1:req.query.to_user,
            part2:req.query.from_user
        },{
            part1:req.query.from_user,
            part2:req.query.to_user
        }
    ]}).populate({
        path:'messages',
        model:'Message',
        populate:{
            path:'sender',
            model:'User',
            select:'name'
        }
    })
    ;

    if(chat==null){
        let newChat = await Chat.create({
            part1:req.query.to_user,
            part2:req.query.from_user
        })
        let user1 = await User.findById(req.query.to_user);
        let user2 = await User.findById(req.query.from_user);
        user1.chats.push(newChat._id);
        user2.chats.push(newChat._id);
        user1.save();
        user2.save();
        return res.status(200).json({
            data: newChat._id,
            type:1
        })
    }else{
        return res.status(200).json({
            data: chat,
            type:0
        })
    }

    
}