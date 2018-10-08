import $ from 'jquery'

import sliderImage from './sliderImage.js'

class imageLoader {
    constructor(thumbnailBar, slider){
        this.p = [];
        this.images = [];
        this.thumbnailBar = thumbnailBar;
        this.slider = slider;

    }
    load(){
        this.slider.ui.find("a").each((a, b) => {
            let img = new sliderImage($(b), this.p.length);
            var promise = img.promise();
            this.p.push(promise);
            promise.then(( ) =>{this.images.push(img)});
        });
        this.complete().then(() => {
            this.images = this.images.sort((a, b) => {return a.getRotation() > b.getRotation()}); // sort images in array in order of rotation,incase some load faster than others
            this.thumbnailBar.addImages(this.images);
            this.slider.setImages(this.images);
            this.slider.setImage(0);
        });
    }
    complete(){
        return Promise.all(this.p);
    }
    getImages(){
        return this.images;
    }
}


module.exports = imageLoader;
