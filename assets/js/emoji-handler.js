class emojiHandler{
    constructor(listElement){
        this.listElement = listElement;
        this.handler();
    }

    handler(){
        $(this.listElement).click(function(e){
            e.preventDefault();
            let self = this;
            let dataAttribute = $(self).attr('data-code');
            let inputText = $(self).parent().parent().parent().find('#comment');
            $(inputText).val($(inputText).val()+dataAttribute);
        });
    }
}