import $ from 'jquery'
import { resolve } from 'url';

export default class thumbnail {
    constructor(image, barHeight, barWidth, slider){
        this.width = (image.image.naturalWidth/image.image.naturalHeight) * barHeight;
        this.height = barHeight;
        this.image = image;
        console.log(slider);
        this.slider=  slider;
        this.create().then(()=> {
            this.element.on("click", this.click);
        });
    }
    click(){
        console.log(this.slider);
        this.slider.setImage(this.image);
    }
  
    getElement(){
        return this.element;
    }
}