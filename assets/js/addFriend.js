class FriendAdd{
    constructor(buttonClicked){
        this.buttonElement = buttonClicked;
        this.friendAdd();
    }

    friendAdd(){
        let self = this.buttonElement;
        $.ajax({
            type: 'POST',
            url: "../../"+$(this.buttonElement).attr('add-link')+$(this.buttonElement).attr('deleted')
        }).done(function(data){
            if(data.data.deleted==true){
                $(self).html('+ Add Friend');
                $(self).attr('deleted',"true");
            }else{
                $(self).html('- Remove Friend');
                $(self).attr('deleted',"false");
            }

        }).fail(function (errData){
            console.log('Error in sending or receiving request');
        })
    }
}