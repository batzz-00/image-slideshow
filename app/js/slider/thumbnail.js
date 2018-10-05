export default class thumbnail {
    constructor(height, width, barHeight, barWidth){
        console.log(barHeight);
        this.width = (height/width) * barWidth;
        this.height = (width/height) * barHeight;
        console.log(this.width);
        console.log(this.height);
    }
}