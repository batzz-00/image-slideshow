import $ from 'jquery'

// NAMING CONVENTION FOR PARENT FUNCTIONS
// FIRST TWO CHARACTERS ARE NAME OF CLASS (CH), THEN WHETHER THE CLICK/ACTION IS ON GIVEN CLASS ( CHG FOR CLICKHANDLER GLOBAL) THEN THE ACTION, DRAG/DROP/MOUSEDOWN
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
            this.dragging = false;  
            let xdiff = this.clickPos.x - e.clientX;
            this.parent.chgDrop(e, xdiff);
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
        this.parent.chMove(e);
        
    }
    documentMove(e){
        // if (
        // if((e.target === this.ui[0]) || (e.target.offsetParent === this.ui[0])){
        if($(e.target).parents(this.ui).length){
            if(this.clicking){
                let xdiff = this.clickPos.x - e.clientX;
                let ydiff = this.clickPos.y - e.clientY;
                if(Math.abs(ydiff) > this.dragThreshold || Math.abs(xdiff) > this.dragThreshold){
                    this.dragging = true;
                    console.log("dragging");
                    this.parent.chDrag(e, xdiff);
                }   
            }
        }
    }
}