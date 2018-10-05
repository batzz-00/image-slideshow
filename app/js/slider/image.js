import $ from 'jquery'
export default class sliderImage {
    constructor(anchor){
        this.anchorClass = anchor;       
        // TODO : do checks to see if properties exist
        this.caption = this.anchorClass.attr("data-caption");
        this.imageurl = this.anchorClass.attr("href");
        this.loadImage()
    }
    loadImage(){
        return new Promise(( res, rej) => {
            this.image = new Image();
            this.image.src = this.imageurl;
            this.image.onload = function(){
                res();
            };
        });
    }
    width(){
        return this.image.naturalWidth;
    }
    height(){
        return this.image.naturalHeight;
    }

}
