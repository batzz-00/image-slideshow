import $ from 'jquery'
import clickHandler from './../clickHandler.js'

function createThumbnail(w, h, img, rot){
    let image = $("<div class='thumbnail' rotation="+rot+"></div>");
    image.css({'background-image': 'url("'+img+'")',
                'width': w,
                'height': h});
    return image
}
export default class thumbnailBar {

    constructor(thumbnailC, slider){
        this.thumbnailBar = thumbnailC;
        this.width = this.thumbnailBar.width();
        this.height = this.thumbnailBar.height();
        this.slider = slider;
        this.offset = 0;
        this.thumbnails = [];
        this.clickHandler = new clickHandler(this.thumbnailBar,this, 5);
    }
    addImages(images){
        images.forEach( element => {
            this.create(element).then(() => this.thumbnails.push(element));
        });
    }
    chClick(e){
        if(e.target.className == "thumbnail"){
            this.slider.setImage($(e.target).attr("rotation"));
        }
    }
    chDrag(e, xdiff, ydiff){
        this.thumbnailBar.find(".thumbnail").each((k, v) => {
            let num = 0;
            if( $(v).css('transform') != "none"){
                let currTrans = $(v).css('transform').split(/[()]/)[1];
                let posx = parseInt(currTrans.split(',')[4]);
                num = posx - xdiff;
                console.log(posx);
                console.log("--")
                console.log(xdiff);
            }
            this.offset = 
            $(v).css({"transform": "translateX("+(xdiff)+"px)"});
        });
        
        console.log("-")
    }
    create(element){
        return new Promise((resolve, reject) => {
            let width = (element.image.naturalWidth/element.image.naturalHeight) * this.height;
            this.thumbnailBar.append(createThumbnail(width, this.height, element.imageurl, element.rotation));
            resolve();
        }) 
    }
}
