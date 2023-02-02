const mongoose = require('mongoose'); 

const chatSchema = new mongoose.Schema({
  part1:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  part2:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  messages:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Message'
    }
  ],  
},{
    timestamps: true
});

const Chat = mongoose.model('Chat',chatSchema);

module.exports = Chat;