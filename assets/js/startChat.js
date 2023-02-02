class startChat{
    constructor(chatee,chatEngine){
        this.socket = chatEngine.socket;
        this.chatElement = chatee;
        this.openChat();
    }

    openChat(){
        let self = this;
        $(self.chatElement).click(function(){
            //console.log('yippee');
            let to_user =$(self.chatElement).attr('sid');
            let from_user= my_id;
            $.ajax({
                type: 'GET',
                url: '../../chats/fetchnew/?to_user='+to_user+'&from_user='+from_user
            })
            .done(function(data) {
                if(data.type==0){
                let userChatBox = chatRoom.find('#user-chat-box');
                userChatBox.empty();
                data=data.data;
                for(let message of data.messages){
                    let newNode = $('<div>');
                    let subNode = $('<div>').addClass('message').text(message.message);
                        
                    if(String(message.sender._id)==String(my_id)){
                        newNode.addClass('this-user');
                    }else{
                        newNode.addClass('other-user');
                    }
                    newNode.append(subNode);
                    userChatBox.append(newNode);
                }
                
                chatRoom.css({'display':'block'});
                self.previewChat(data);
                }else{
                    chatRoom.css({'display':'block'});
                    self.previewChat(data.data);
                }
            }).fail(function(error){
                console.log("error");
            })
        })
    }


    previewChat(data) {
        let self = this;
        let submitButton = chatRoom.find('#submitButton').find('Button');
        self.socket.emit('join_room',{
            chatRoom: data._id,
            to_user: $(self.chatElement).attr('sid'),
        });
        
        submitButton.click(function(){
            console.log(data._id);
            let msg = chatRoom.find('#lower-panel').find('input').val();
            if(msg!=''){
                self.socket.emit('send-message',{
                    message: msg,
                    from_user: my_id,
                    to_user:$(self.chatElement).attr('sid'),
                    chatRoom:data._id
                });
            }
        })
    }
}