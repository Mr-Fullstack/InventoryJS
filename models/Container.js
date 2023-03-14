import { HtmlObserverSlot, state } from '../config.js';
import SlotItem from './SlotItem.js';
class Container 
{

    constructor(stateList,HTMLElement)
    {
        this.container = stateList;
        this.containerHTML = HTMLElement.children[0];
    }

    update = (options)=> {
        
        let { nextContainer:container, slot, currentSlot, data, label, quantity } =  options;
       
        let nextContainer = !container ? this.container : container;

        if(slot)
        {
            if(Object.values(state.data[nextContainer][`slot${slot}`]).length == 0 )
            {
                if(!data.title && !data.quantity && !data.details)
                {
                    throw Error("O dados são invalidos!");
                }

                else
                {
                    state.data[nextContainer][slot] = {...state.data[nextContainer][slot],...data};
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
           let findedSlotEqual = false;

            for(let slotEqualID = 0; slotEqualID <= slotList.length-1; slotEqualID++)
           {
                let keyUpdateNextSlot = `${container}>${slotList[slotEqualID]}`;
                let keyUpdateOldSlot = `${this.container}>${currentSlot}`;

                if(state.data[nextContainer][slotList[slotEqualID]].label == label && slotEqualID <= slotList.length-1 && quantity )
                {
                    findedSlotEqual = true;
                    // console.log("tem um igual já");
                               
                    state.updateForEach([
                        {
                            key:`${nextContainer}>${slotList[slotEqualID]}`,
                            data:{
                                quantity: state.getDataSlotValueOf(`${nextContainer}>${slotList[slotEqualID]}`).quantity+=quantity
                            }
                        },
                        {
                            key:`${this.container}>${currentSlot}`,
                            data:{
                                quantity:state.getDataSlotValueOf(`${this.container}>${currentSlot}`).quantity-=quantity
                            }
                        }
                    ])

                    let nextContainerSlotUpdateHTML={
                        key:keyUpdateNextSlot,
                    }
    
                    let oldContainerSlotUpdateHTML={
                        key:keyUpdateOldSlot
                    }

                    HtmlObserverSlot.update([
                        nextContainerSlotUpdateHTML,
                        oldContainerSlotUpdateHTML
                    ]);

                    if(state.data[this.container][currentSlot].quantity === 0){
                        this.deleteSlotHTML(currentSlot);
                        state.update(
                            {
                                key:`${this.container}>${currentSlot}`,
                                data:null
                            }
                        )
                    }

                    break;
                }
                else if(state.data[nextContainer][slotList[slotEqualID]].label == label && slotEqualID <= slotList.length-1)
                {
                    findedSlotEqual = true;

                    state.updateForEach([
                        {
                            key:`${nextContainer}>${slotList[slotEqualID]}`,
                            data:{
                                quantity: state.getDataSlotValueOf(`${nextContainer}>${slotList[slotEqualID]}`).quantity+=state.getDataSlotValueOf(`${this.container}>${currentSlot}`).quantity
                            }
                        },
                        {
                            key:`${this.container}>${currentSlot}`,
                            data:null
                        }
                    ])

                    let nextContainerSlotUpdateHTML={
                        key:keyUpdateNextSlot,
                    }

                    HtmlObserverSlot.update([
                        nextContainerSlotUpdateHTML
                    ]);

                    this.deleteSlotHTML(currentSlot);

                    break;
                }
            }

            if(!findedSlotEqual){
                for(let slotID = 0; slotID <= slotList.length-1; slotID++)
                {
    
                    let keyUpdateNextSlot = `${container}>${slotList[slotID]}`;
                    let keyUpdateOldSlot = `${this.container}>${currentSlot}`;
    
                    if(state.data[nextContainer][slotList[slotID]]){
                        
                        if(  quantity  )
                        {
                            // console.log("movendo por quantidade");
    
                            if(Object.keys(state.data[nextContainer][slotList[slotID]]).length)
                            {
                                // console.log("já tem"); 
                                
                                if(state.data[nextContainer][slotList[slotID]].label == label){
    
                                    // console.log("é igual ");
                                        
                                    state.updateForEach([
                                        {
                                            key:`${nextContainer}>${slotList[slotID]}`,
                                            data:{
                                                quantity: state.getDataSlotValueOf(`${nextContainer}>${slotList[slotID]}`).quantity+=quantity
                                            }
                                        },
                                        {
                                            key:`${this.container}>${currentSlot}`,
                                            data:{
                                                quantity:state.getDataSlotValueOf(`${this.container}>${currentSlot}`).quantity-=quantity
                                            }
                                        }
                                    ])
    
                                    let nextContainerSlotUpdateHTML={
                                        key:keyUpdateNextSlot,
                                    }
                    
                                    let oldContainerSlotUpdateHTML={
                                        key:keyUpdateOldSlot
                                    }
    
                                    HtmlObserverSlot.update([
                                        nextContainerSlotUpdateHTML,
                                        oldContainerSlotUpdateHTML
                                    ]);
                
                                    if(state.data[this.container][currentSlot].quantity === 0){
                                        this.deleteSlotHTML(currentSlot);
                                        state.update(
                                            {
                                                key:`${this.container}>${currentSlot}`,
                                                data:null
                                            }
                                        )
                                    }
    
                                }
                                else
                                {
                                    continue;
                                }
                            }
    
                            else if(!Object.keys(state.data[nextContainer][slotList[slotID]]).length )
                            {
                                // console.log("esta vazio!");
    
                                let nextSlot = slotList[slotID];
    
                                data.quantity = quantity;
                                state.update(
                                    {
                                        key:`${nextContainer}>${nextSlot}`,
                                        data:data
                                    },
                                    {
                                        key:`${this.container}>${currentSlot}`,
                                        data:{
                                            ...state.getDataSlotValueOf(`${this.container}>${currentSlot}`),
                                            quantity:state.getDataSlotValueOf(`${this.container}>${currentSlot}`).quantity-=quantity
                                        }
                                    }
                                )

                                let nextContainerSlotUpdateHTML={
                                    key:`${nextContainer}>${nextSlot}`
                                }
            
                                let oldContainerSlotUpdateHTML={
                                    key:keyUpdateOldSlot
                                }
                                
                                HtmlObserverSlot.update([nextContainerSlotUpdateHTML,oldContainerSlotUpdateHTML]);
            
                                if(state.getDataSlotValueOf(`${this.container}>${currentSlot}`).quantity === 0){
                                    this.deleteSlotHTML(currentSlot);
                                    state.update(
                                        {
                                            key:`${this.container}>${currentSlot}`,
                                            data:null
                                        }
                                    )
                                }
            
                                break;
                            }
                            
                            break;
                        }
    
                        else
                        {
                            // console.log("movendo tudo");

                            if( !Object.keys(state.data[nextContainer][slotList[slotID]]).length)
                            {   
                                state.updateForEach([
                                    {
                                        key:`${nextContainer}>${slotList[slotID]}`,
                                        data:data
                                    },
                                    {
                                        key:`${this.container}>${currentSlot}`,
                                        data:null
                                    }
                                ])
    
                                this.deleteSlotHTML(currentSlot);
    
                                let nextContainerSlotUpdateHTML = {
                                    key:keyUpdateNextSlot,
                                }
            
                                HtmlObserverSlot.update([
                                    nextContainerSlotUpdateHTML
                                ]);
            
                                break;
                            }
                            else if( Object.keys(state.data[nextContainer][slotList[slotID]]).length && state.data[nextContainer][slotList[slotID]].label == label )
                            {   
                                // console.log("é igual")
    
                                state.updateForEach([
                                    {
                                        key:`${nextContainer}>${slotList[slotID]}`,
                                        data:{
                                            quantity: state.getDataSlotValueOf(`${nextContainer}>${slotList[slotID]}`).quantity+=state.getDataSlotValueOf(`${this.container}>${currentSlot}`).quantity
                                        }
                                    },
                                    {
                                        key:`${this.container}>${currentSlot}`,
                                        data:null
                                    }
                                ])
    
                                this.deleteSlotHTML(currentSlot);
    
                                let nextContainerSlotUpdateHTML = {
                                    key:keyUpdateNextSlot,
                                }
            
                                HtmlObserverSlot.update([
                                    nextContainerSlotUpdateHTML
                                ]);
            
                                break;
                            }
                        }
                    }
                }
            }    
        }
       // console.log(state);
    }

    moveSlot = (options)=>{

        const { nextContainer, currentSlot, nextSlot, quantity, label } =  options;

        // console.warn(`MovingSlot to container:${nextContainer}`,options);

        let container = nextContainer ? nextContainer : this.container;
        
        if(typeof quantity === 'number' || typeof quantity === 'undefined' )
        {
            const updateObject = quantity ? { quantity }: {} ;

            this.update({   
                data: Object.assign(updateObject,state.getDataSlotValueOf(`${this.container}>${currentSlot}`)),
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

        state.getDataValueOf(this.container).map((dataItem,index)=>{

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

    deleteSlotHTML = (slot)=> {
       let slotHTML = this.containerHTML.querySelector(`[data-slot=${slot}]`);
       slotHTML.removeChild(slotHTML.children[0]);
    } 

    getSlotID = (origin)=> Object.keys( origin ? state.data[origin] : state.data[this.container]);

    getSlotHTML = (slot)=> {
        return this.containerHTML.querySelector(`[data-slot=${slot}]`);
    }

    reRender = (payload)=> {

        let [ container, slot ] = payload.key.split('>').map(value=> value.trim());

        if( container === this.container )
        {
            const options = {
                data:state.getDataSlotValueOf(`${container}>${slot}`),
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