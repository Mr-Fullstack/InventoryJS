import { HtmlObserverSlot, STATE } from '../config.js';
import SlotItem from './SlotItem.js';

class Container {

    container;
    containerHTML;
   
    constructor(stateList,HTMLElement){
        this.container = stateList;
        this.containerHTML = HTMLElement.children[0];
    }

    update = (options)=> { //  options = { container slot data }
        
        let { nextContainer:container, slot, currentSlot, data, label, quantity} =  options;
       
        let nextContainer = !container ? this.container : container;
        if(slot)
        {
            if(Object.values(STATE[nextContainer][`slot${slot}`]).length == 0 )
            {
                if(!data.title && !data.quantity && !data.details)
                {
                    throw Error("O dados são invalidos!");
                }
                else
                {
                    STATE[nextContainer][`slot${slot}`] = {...STATE[nextContainer][`slot-${slot}`],...data};
                }
            }
            else
            {
                console.warn("slot já tem dados! faça algo aqui!");
            }  
        }
        else
        {
            
           //console.warn("Procurando...  um  slot vazio para colocar o item");

           let slotList = this.getSlotID(container);
           
            for(let slotID = 0; slotID <= slotList.length-1; slotID++)
            {
               
                if(STATE[nextContainer][slotList[slotID]]){
                    
                    if( !Object.keys(STATE[nextContainer][slotList[slotID]]).length && !quantity  )
                    {   
                        
                        STATE[nextContainer][slotList[slotID]] = data;
                        STATE[this.container][currentSlot] = {};
    
                        this.delete(currentSlot);
                       
                        let updatecontainer = {
                            container:container,
                            data:data,
                            slot:slotList[slotID]
                        }

                        // console.log(container);
    
                        HtmlObserverSlot.update([updatecontainer]);
    
                        break;
                    }
                    else if((STATE[nextContainer][slotList[slotID]].label == label) && Object.keys(STATE[nextContainer][slotList[slotID]]).length && !quantity)
                    {
                        // console.log('já tem é igual e move tudo de uma vez');
                       
                        STATE[nextContainer][slotList[slotID]].quantity+= STATE[this.container][currentSlot].quantity;
                        STATE[this.container][currentSlot] = {};
    
                        this.delete(currentSlot);
    
                        let updatecontainer = {
                            container:container,
                            data:STATE[nextContainer][slotList[slotID]],
                            slot:slotList[slotID]
                        }
                        
                        HtmlObserverSlot.update([updatecontainer]);
    
                        break;
                    }
                    else if(( STATE[nextContainer][slotList[slotID]].label == label) && Object.keys(STATE[nextContainer][slotList[slotID]]).length && quantity)
                    {
                        // console.warn("Esta cheio é igual e move de quantidade em quantidade");
    
                        if( STATE[this.container][currentSlot].quantity > 0){
    
                            STATE[nextContainer][slotList[slotID]].quantity+= quantity;
                            STATE[this.container][currentSlot].quantity-= quantity;
                           
                            let updatecontainer={
                                container:container,
                                data: STATE[nextContainer][slotList[slotID]],
                                slot:slotList[slotID]
                            }
                            
                            let updateOrigin={
                                container:this.container,
                                data:STATE[this.container][currentSlot],
                                slot:currentSlot
                            }
        
                            HtmlObserverSlot.update([updatecontainer,updateOrigin]);
        
                            if(STATE[this.container][currentSlot].quantity === 0){
                                this.delete(currentSlot);
                            }
                        }
                        
                        break;
                
                    }
                    else if(!Object.keys(STATE[nextContainer][slotList[slotID]]).length && quantity )
                    {
                        // console.warn("Está vazio! e move de quantidade em quantidade");
    
                        let nextSlot = slotList[slotID];
    
                        if( Object.keys(STATE[nextContainer][slotList[slotID+1]]).length  )
                        {
                            
                            if(STATE[nextContainer][slotList[slotID+1]].label == label)
                            {
                                // console.warn("próximo slot não esta vazio! e é igual");
                                nextSlot= slotList[slotID+1];
                                STATE[nextContainer][slotList[slotID+1]].quantity = STATE[nextContainer][slotList[slotID+1]].quantity;
                                STATE[nextContainer][slotList[slotID+1]].quantity+=quantity;
                            }
                        } 
                        else
                        {
                            data.quantity = quantity;
                            STATE[nextContainer][nextSlot] = data;
                            console.log(data)
                        }
    
                        STATE[this.container][currentSlot].quantity-=quantity;
    
                        let updatecontainer={
                            container:container,
                            data:data,
                            slot:nextSlot
                        }
    
                        let updateOrigin={
                            container:this.container,
                            data:STATE[this.container][currentSlot],
                            slot:currentSlot
                        }
    
                        HtmlObserverSlot.update([updatecontainer,updateOrigin]);
    
                        if(STATE[this.container][currentSlot].quantity === 0){
                            this.delete(currentSlot);
                        }
    
                        break;
                    }
                }
            }
        }

        console.log(STATE);
    }

    moveSlot = (options)=>{

        const { nextContainer, currentSlot, nextSlot, quantity, label } =  options;

        let container = nextContainer ? nextContainer : this.container;
        
        if(typeof quantity === 'number' || typeof quantity === 'undefined' )
        {
            const updateObject = quantity ? { quantity }: {} ;

            this.update({   
                data: Object.assign(updateObject,STATE[this.container][currentSlot]),
                nextContainer:container,
                slot: nextSlot,
                label:label,
                currentSlot:currentSlot,
                quantity:quantity
            }) 
        }
        else
        {
            throw Error("propiedade quantity, pode ser número inteiro ou undefined!");   
        }
    }

    generateSlots = ()=> {

        Object.values(STATE[this.container]).map((dataItem,index)=>{

            if( Object.keys(dataItem).length >= 1 && dataItem.quantity>0 )
            {
                const options = {
                    data:dataItem,
                    slot:`slot-${index+1}`,
                    container:this.containerHTML.parentElement.id
                }
                let item = new SlotItem(options);
                let slot = document.createElement('div');
                slot.classList.add("slot")
                slot.setAttribute("data-slot",`slot-${index+1}`);
                slot.appendChild(item.render())
                this.containerHTML.appendChild(slot);
            }
            else
            {
                let slot = document.createElement('div');
                slot.classList.add("slot")
                slot.setAttribute("data-slot",`slot-${index+1}`);
                this.containerHTML.appendChild(slot);
            }
        })
    }

    delete = (slot)=> {
       let slotHTML = this.containerHTML.querySelector(`[data-slot=${slot}]`);
       slotHTML.removeChild(slotHTML.children[0]);
    }   

    getSlotID = (origin)=> Object.keys( origin ? STATE[origin] : STATE[this.container]);

    getSlotHTML = (slot)=> {
        return this.containerHTML.querySelector(`[data-slot=${slot}]`);
    }

    reRender = (options)=> {

        const { container, data, slot } = options;

        if( container === this.container )
        {
            const options = {
                data,
                slot,
                container:this.containerHTML.parentElement.id
            }
            
            let slotHTML = this.getSlotHTML(slot);
            let slotData = new SlotItem(options);
            slotHTML.innerHTML = '';
            slotHTML.appendChild( slotData.render() )
              
        }
    }

}

export default Container;