import $ from 'jquery'

import sliderImage from './slider/image.js'
import thumbnailBar from './slider/thumbnailbar'

class slider {
    constructor(sliderC){
        this.images = [];
        this.sliderClass = sliderC;
        this.thumbnailBar = new thumbnailBar(sliderC.find(".thumbnail"));
    }
    init(){
        
    }
    add(anchorClass){
        let img = new sliderImage(anchorClass);
        img.loadImage().then(function(){
            this.images.push(img);
            this.thumbnailBar.add(img);
        }.bind(this))
    }
    build(){
    }
    redraw(){
        
    }
}

module.exports = slider;
