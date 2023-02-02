let minimizedList = $('#minimized-list');
let chatListbox = $('#chat-List-Box');

minimizedList.find('Button').click(function(){
    minimizedList.css({'display':'none'});
    chatListbox.css({'display':'block'});
})

chatListbox.find('Button').click(function(){
    minimizedList.css({'display':'grid'});
    chatListbox.css({'display':'none'});
})

minimizedList.find('Button').one('click', function(){
    $.ajax({
        type: 'POST',
        url: "../../chats/fetchall"
    }).done(function(data){
        for(let chat of data.chats){
            let sender = "";
            let receiver="";
            if(""+data.my_id==""+chat.part1._id){
                sender = "part2";
                receiver = "part1";
            }else{
                sender = "part1";
                receiver = "part2";
            }
            let chatList = chatListbox.find('#chatList');
            let chatListItem = $('<div>').addClass('chatListItem').attr({'chat-id':chat._id});
            let photo = $('<div>').addClass('Img-chatList');
            let image = $('<img>').attr('src',chat[sender].avatar);
            photo.append(image);
            let usernameChatList = $('<div>').addClass('username-chatList').attr({"sid":chat[sender]._id}).attr({"rid":chat[receiver]._id}).text(chat[sender].name);
            let messageChatList = $('<div>').addClass('message-chatList').text(chat.messages[0].message);
            chatListItem.append(photo);
            chatListItem.append(usernameChatList);
            chatListItem.append(messageChatList);
            chatList.append(chatListItem);

        }
        $('.chatListItem').each(function(){
            let user = this;
            new chatBox(user,chatEngine.socket); 
        })
    }).fail(function (errData){
        console.log('Error in receiving messages');
    })
})