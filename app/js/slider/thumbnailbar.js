import $ from 'jquery'
import clickHandler from '../event_handlers/clickHandler.js'

function createThumbnail(w, h, img, rot, pad){
    let image = $("<div class='thumbnail' rotation="+rot+"><div class='image' ></div></div>");
    image.find(".image").css({'background-image': 'url("'+img+'")'});
    console.log( );
    image.css({
        'padding': pad + "px 0px "+ pad + "px "+ pad + "px",
        'width': w,
        'height': h});
    return image
}
export default class thumbnailBar {

    constructor(thumbnailC, slider, pad=5){
        this.thumbnailBar = thumbnailC;
        this.width = this.thumbnailBar.width();
        this.height = this.thumbnailBar.innerHeight();
        this.padding = pad;
        this.slider = slider;
        this.thumbnails = [];
        this.overflow = 0;
        this.clickHandler = new clickHandler(this.thumbnailBar,this, 5);
    }
    
    ilLoaded(images){
        this.createThumbnails(images).then(() => {
            this.calculateOverflow();
        });
    }
    createThumbnails(images){
        return new Promise((resolve, reject) => {
            images.forEach( element => {
                this.create(element).then(() => this.thumbnails.push(element));
            });
            resolve();
        })
    }
    calculateOverflow(){

        // FIX HARDCODING ON THIS
        this.thumbnailBar.find(".thumbnail").each((a, b)=> {
           this.width += $(b).outerWidth() + 5; // CHANGE 5
        });
        this.width -= this.thumbnailBar.width()+ 5;
    }
    chClick(e){
        console.log(this);
        if($(e.target).parents(".thumbnail")){
            this.slider.setImage($(e.target).parents(".thumbnail").attr("rotation"));
        }
    }
    chDrag(e, xdiff, ydiff){
        this.thumbnailBar.scrollLeft(this.thumbnailBar.scrollLeft() + (xdiff/3));
    }
    chgDrop(e, xdiff){
        this.offset = this.offset + xdiff;
    }
    create(element){
        return new Promise((resolve, reject) => {
            console.log(this.height);   
            let width = (element.image.naturalWidth/element.image.naturalHeight) * (this.height-this.padding);
            this.thumbnailBar.append(createThumbnail(width, (this.height), element.imageurl, element.rotation, this.padding));
            resolve();
        }) 
    }   
}
