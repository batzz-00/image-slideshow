import $ from 'jquery'
export default class clickHandler {
    constructor(ui, obj,dragThreshold = 5){
        this.ui = ui;
        this.inContainer = false;
        this.clicking = false;
        this.parent = obj;
        this.dragThreshold = dragThreshold;
        this.dragging = false;
        this.clickPos = {x:0, y:0};
        $(document).on('mousedown', this.documentClick.bind(this));
        $(document).on('mouseup',this.documentMouseUp.bind(this));
        $(document).on('mousemove', this.documentMove.bind(this));
        this.ui.on('dragstart', (e)=> e.preventDefault()); // stops drag event from taking over?
        this.ui.on("mousedown", this.mouseDown.bind(this));
    }
    documentClick(e){
        this.clickPos.y = e.clientY;
        this.clickPos.x = e.clientX;
    }
    documentMouseUp(e){
        if(this.dragging){
            let xdiff = this.clickPos.x - e.clientX;
            this.parent.chDrop(e, xdiff);
        }
        this.clicking = false;
    }
    mouseDown(e){
        this.clicking = true;
        this.clickPos.y = e.clientY;
        this.clickPos.x = e.clientX;
        this.parent.chClick(e);
    }
    mouseMove(e){
        
    }
    documentMove(e){
        if((e.target === this.ui[0]) || (e.target.offsetParent === this.ui[0])){
            if(this.clicking){
                let xdiff = this.clickPos.x - e.clientX;
                let ydiff = this.clickPos.y - e.clientY;
                if(Math.abs(ydiff) > this.dragThreshold || Math.abs(xdiff) > this.dragThreshold){
                    this.dragging = true;
                    this.parent.chDrag(e, xdiff);
                }   
            }
        }
    }
}