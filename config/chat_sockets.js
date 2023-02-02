let Chat = require('../models/chat');
let Message = require('../models/message');
module.exports.chatSockets = function(socketServer){
    let users = [];
    let buffer =[];
    let io = require('socket.io')(socketServer,{
        cors:{
            origin:'*'
        }
    });
    io.use((socket, next) => {
        const username = socket.handshake.auth.uid;
        socket.uid = username;
        next();
      });
    io.sockets.on('connection',function(socket){
        users.push({
            uid:socket.uid,
            sid:socket.id
        });
        socket.on('disconnect',function(){
            console.log('socket disconnected');
        })

        socket.on('join_room',function(data){
            let sid = ""; 

            for (let user of users){
                if(String(user.uid)==String(data.to_user)){
                    sid = ""+user.sid;
                }
            }

            socket.join(String(data.chatRoom));
            data.to_user = socket.uid;
            io.to(sid).emit('invite',data);
            
        });

        socket.on('joined_room',function(data){
            socket.join(String(data.chatRoom));
        })

        socket.on('send-message',async function(data){
            let chat = await Chat.findById(data.chatRoom);
            let message = await Message.create({
                sender:data.from_user,
                message:data.message
            })
            chat.messages.push(message._id);
            chat.save();
            io.in(data.chatRoom).emit('receive-message',data);
        })


    })

}