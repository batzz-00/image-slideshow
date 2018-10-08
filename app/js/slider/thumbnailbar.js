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
        this.width = this.calculateWidth();
        this.clickHandler = new clickHandler(this.thumbnailBar,this, 5);
    }
    addImages(images){
        images.forEach( element => {
            this.create(element).then(() => this.thumbnails.push(element));
        });
    }
    calculateWidth(){
        console.log("what");
        this.thumbnails.forEach(element => {
            console.log(element);
            console.log($(element.imageClass));
        })
    }
    chClick(e){
        if(e.target.className == "thumbnail"){
            this.slider.setImage($(e.target).attr("rotation"));
        }
    }
    chDrag(e, xdiff, ydiff){
        this.thumbnailBar.find(".thumbnail").each((k, v) => {
            let num = 0;
            $(v).css({"transform": "translateX("+(-(this.offset + xdiff))+"px)"});
        });
    }
    chDrop(e, xdiff){
        console.log("dropped")
        this.offset = this.offset + xdiff;
    }
    create(element){
        return new Promise((resolve, reject) => {
            let width = (element.image.naturalWidth/element.image.naturalHeight) * this.height;
            this.thumbnailBar.append(createThumbnail(width, this.height, element.imageurl, element.rotation));
            resolve();
        }) 
    }
}
