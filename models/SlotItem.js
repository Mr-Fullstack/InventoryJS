import { isScroll, containers } from '../config.js';
import ItemDetail from './ItemDetail.js';

class SlotItem {

    img;
    quantity;
    figure;
    details;
    label;
    previewActive;
    preview;
    pressedCount=0;
    container;
    currentSlot;

    constructor(options)
    {   
        const { data, slot, container }= options; 

        this.figure = document.createElement('figure');
       
        if(data){

            this.img = document.createElement('img');
            this.img.src = data.src;
            this.figure.appendChild(this.img);
            if(data.quantity > 1){
                this.quantity= document.createElement('span');
                this.quantity.classList.add('slot-quantity');
                this.quantity.innerText = data.quantity;
                this.figure.appendChild(this.quantity);
            }
            this.details = new ItemDetail(data.details).render();
            this.label = data.label
        }
        this.currentSlot = slot;
        this.container = container;

        this.figure.addEventListener('mouseenter',(evt)=> {
          
             this.details.style.left = this.figure.getBoundingClientRect().left;
             this.details.style.top = this.figure.getBoundingClientRect().top;
            if(data){
                this.figure.appendChild(this.details);
                this.figure.addEventListener("mousemove",this.moveDetail);
            }
        })

        this.figure.addEventListener('mouseleave',(evt)=> {
            let removed = this.figure.querySelector(`.item-detail`);
            if(removed)
            {
                this.figure.removeChild(this.figure.querySelector(`.item-detail`));
            }
        })

        this.figure.addEventListener('contextmenu',(e)=> {

            e.preventDefault();
            
            const options = {
                nextContainer:this.getCorrectContainer(this.container),
                label:this.label,
                currentSlot : this.currentSlot,
                quantity:1,
            }

            this.moveSlot(options);

        })

        this.figure.addEventListener('click',(e)=> {
            const options = {
                nextContainer:this.getCorrectContainer(this.container),
                label:this.label,
                currentSlot : this.currentSlot
            }
            this.moveSlot(options);
        })
    }

    getCorrectContainer = (currentContainer)=> {
        const invertContainers= {
            chest:'inventory',
            inventory:'chest'
        }
        return invertContainers[currentContainer]
    }

    moveSlot = (options)=> containers[this.container].moveSlot(options);
    
    movePreview=(evt)=>{

        let mainOffsetLeft = Math.round(Math.abs( this.figure.getBoundingClientRect().width - this.figure.getBoundingClientRect().left) );
        let mainOffsetTop  = Math.round(Math.abs( this.figure.getBoundingClientRect().height - this.figure.getBoundingClientRect().top) );
       
        this.preview = this.figure.querySelector('.slot-preview');
        this.preview.style.left = `${ evt.clientX - mainOffsetLeft }px`;
        this.preview.style.top = `${  evt.clientY - mainOffsetTop }px`;
    }

    moveDetail = (evt)=>{

        this.details =  this.figure.querySelector('.item-detail');

        if(this.previewActive)
        {
            this.movePreview(evt);
        }
       
        let offsetFixLeft = 20;
        let offsetFixTop = 25

        let hasScroll = isScroll();
        
        if(hasScroll.value){
            offsetFixTop-=25;
            offsetFixLeft+=20;
        }

        this.details.style.left = `${ evt.clientX  + offsetFixLeft}px`;
        this.details.style.top = `${evt.clientY  + offsetFixTop }px`;
       
    }
    render = () => this.figure;
}

export default SlotItem;