import $ from 'jquery'

import sliderImage from './slider/sliderImage.js'
import thumbnailBar from './slider/thumbnailbar.js'
import imageLoader from './slider/imageLoader.js'
import { resolve } from 'url';

function getImage(images, rotation){
    for(let k in images){
        if(images[k].getRotation() == rotation){
            return images[k];
        }
    }
}

function createImage(img, ch){
    let rot = img.getRotation();
    let image = $("<div class='image' rotation="+rot+"></div>");
    let w = img.image.naturalWidth;
    let h = img.image.naturalHeight;
    let url = img.imageurl;
    if(ch > h){
        ch = h;
    }
    let px = ((w/h) * ch) + "px " + ch + "px"; 
    image.css({'background-image': 'url("'+url+'")',
                'width':  ((w/h) * ch),
                'height': ch,
                'background-size': px});
    return image
}

function aspectRatioHeight(){

}
function aspectRatioWidth(){

}
class slider {
    constructor(ui){
        this.ui = ui;
        this.thumbnailBar = new thumbnailBar(this.ui.find(".thumbnails"), this);
        this.loader = new imageLoader([this.thumbnailBar, this], this.ui.find("a"));
        this.imageContainer = this.ui.find(".imageContainer");
        this.imageContainer.css({"height": this.ui.height()-this.ui.find(".thumbnails").outerHeight() + "px"})
        this.activeImage = 0;
        this.thumbnailBar = null;
        this.images = [];
    }
    init(){
        this.loader.load()
    }
    draw(){
        
    }
    ilLoaded(images){
        this.setImages(images);
        this.setImage(0);
    }
    setImages(images){
        this.images = images;
        images.forEach((img) => {
            this.imageContainer.append(createImage(img, this.imageContainer.height()));
        })
    }
    setImage(index){        
        this.imageContainer.find(".active").removeClass("active");
        this.imageContainer.find(".image[rotation='"+index+"']").addClass("active");
    }
}

module.exports = slider;
