import $ from 'jquery'
export default class sliderImage {
    constructor(ui, rotation){
        this.imageClass = ui;       
        // TODO : do checks to see if properties exist
        this.caption = this.imageClass.attr("data-caption");
        this.imageurl = this.imageClass.attr("href");
        this.image = new Image();
        this.rotation = rotation;
        this.image.src = this.imageurl;
    }
    getRotation(){
        return this.rotation;
    }
    setRotation(rot){
        this.rotation = rot;
    }
    promise(){
        return new Promise((resolve, reject) => {
            this.image.onload = function(){
                resolve();
            }
        })
    }
    width(){
        return this.image.width;
    }
    height(){
        return this.image.height;
    }

}
