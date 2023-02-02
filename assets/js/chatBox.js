class chatBox{
    constructor(ListItem,chatEngine){
        this.user = ListItem;
        this.closeButtons = $('#close');
        this.chatRoom = $('#chat-room');
        this.minimizedChat = $('#minimized-chat');
        this.socket = chatEngine;
        this.initialize();
    }

    

    initialize(){
        let self  = this;
        $(self.user).click(function(){
            $.ajax({
                type: 'POST',
                url: '../../chats/fetchone/'+$(self.user).attr('chat-id'),
            })
            .done(function(data) {
                let userChatBox = self.chatRoom.find('#user-chat-box');
                userChatBox.empty();
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
                
                self.chatRoom.css({'display':'block'});
                self.startChat();
            })
            .fail(function(errData) {
                
            });
        })


    }

    startChat() {
        let self = this;
        let submitButton = self.chatRoom.find('#submitButton').find('Button');
        self.socket.emit('join_room',{
            chatRoom: $(self.user).attr('chat-id'),
            to_user: $(self.user).find('.username-chatList').attr('sid'),
        });
        
        submitButton.click(function(){
            let msg = self.chatRoom.find('#lower-panel').find('input').val();
            if(msg!=''){
                self.socket.emit('send-message',{
                    message: msg,
                    from_user: $(self.user).find('.username-chatList').attr('rid'),
                    to_user:$(self.user).find('.username-chatList').attr('sid'),
                    chatRoom:$(self.user).attr('chat-id')
                });
            }
        })
    }
    
    

}



