

class ChatEngine{
    constructor(){
        this.socket = io('https://codeial.vercel.app:5000',{ autoConnect: false });
        this.start();
    }

    start(){
        let self = this;
        self.socket.connect();
        self.socket.auth = {'uid':$('#chat-List-Box').attr('my-id')}
        self.socket.on('connect',function(){
            console.log('Successfully connected to socket server');
        });

        

        self.socket.on('invite',function(data){
            self.socket.emit('joined_room',data);
        })
        self.socket.on('receive-message',function(data){
            self.openChatBox(data);
        })
    }

    openChatBox(datum){
        let userChatBox = chatRoom.find('#user-chat-box');
        let newNode = $('<div>');
        let subNode = $('<div>').addClass('message').text(datum.message);
        if(String(datum.to_user)!=String(my_id)){
            newNode.addClass('this-user');
        }else{
            newNode.addClass('other-user');
        }
        newNode.append(subNode);
        userChatBox.append(newNode);
    }


}
