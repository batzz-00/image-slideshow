import $ from 'jquery'

import sliderImage from './sliderImage.js'

class imageLoader {
    constructor(callbacks, unloaded){
        this.p = [];
        this.unloadedImages = unloaded;
        this.images = [];
        this.callbacks = callbacks;
    }
    load(){
        this.unloadedImages.each((a, b) => {
            let img = new sliderImage($(b), this.p.length);
            var promise = img.promise();
            this.p.push(promise);
            promise.then(( ) =>{this.images.push(img)});
        });
        this.complete().then(() => {
            this.images = this.images.sort((a, b) => {return a.getRotation() > b.getRotation()}); // sort images in array in order of rotation,incase some load faster than others
            this.callbacks.forEach( callback => {
                callback.ilLoaded(this.images);
            });
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
