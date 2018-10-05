
import thumbnail from './thumbnail'

export default class thumbnailBar {
    constructor(thumbnailC){
        this.thumbnailBar = thumbnailC;
        this.width = thumbnailBar.clientWidth;
        this.height = thumbnailBar.clientHeight;
        this.thumbnails = [];
    }
    add(img){
        this.thumbnails.push(new thumbnail(img.height(), img.width(), this.height, this.width));
    }
}