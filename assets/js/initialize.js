let closeButtons = $('#close');
let chatRoom = $('#chat-room');
let minimizedChat = $('#minimized-chat');
let my_id = $('#home-container').attr('user-id');        
        closeButtons.find('#minimize-chat').click(function(){
            chatRoom.css({'display':'none'});
            minimizedChat.css({'display':'grid'})
        })
        
        minimizedChat.find('#minimized-open').click(function(){
            chatRoom.css({'display':'block'});
            minimizedChat.css({'display':'none'})
        })
        
        minimizedChat.find('#minimized-close').click(function(){
            chatRoom.css({'display':'none'})
            minimizedChat.css({'display':'none'})
        })
        
        chatRoom.find('#close-chat').click(function(){
            chatRoom.css({'display':'none'})
            minimizedChat.css({'display':'none'})
        })