class executePixel{
    constructor(postPhotos){
        this.postPhotos = postPhotos;
        this.prevButton = $(postPhotos).find('.prevButton').find('Button');
        this.nextButton = $(postPhotos).find('.nextButton').find('Button');
        this.postSlide = $(postPhotos).find('.postSlide > div');
        this.handler();
    }

    handler(){
        let self = this;
        let cnt =0;
        self.prevButton.click(function(e){
            e.preventDefault();
            $(self.postSlide[cnt]).toggleClass('animator');
            cnt--;
            if(cnt<0){
                cnt=self.postSlide.length-1;
            }
            $(self.postSlide[cnt]).toggleClass('animator');

        })
        self.nextButton.click(function(e){
            e.preventDefault();
            $(self.postSlide[cnt]).toggleClass('animator');
            cnt++;
            cnt=cnt%self.postSlide.length;
            $(self.postSlide[cnt]).toggleClass('animator');
        })
    }

}

