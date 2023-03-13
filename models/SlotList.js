import { OBSERVER, STATE } from '../config.js';
import SlotItem from './SlotItem.js';

class SlotDataList {

    list;
    HTMLElement;
   
    constructor(stateList,HTMLElement){
        this.list = stateList;
        this.HTMLElement = HTMLElement
    }

    update = (options)=> { //  options = { destiny slot data }
        
        const { destiny:OPDestiny, slot, currentSlot,data, label, quantity} =  options;

        
        let destiny = !OPDestiny ? this.list : OPDestiny;

        if(slot)
        {
            if(Object.values(STATE[destiny][`slot${slot}`]).length == 0 )
            {
                if(!data.title && !data.quantity && !data.details)
                {
                    throw Error("O dados são invalidos!");
                }
                else
                {
                    STATE[destiny][`slot${slot}`] = {...STATE[destiny][`slot-${slot}`],...data};
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

           let chestKeys = this.getKeys(destiny);

            for(let i = 0; i<= chestKeys.length; i++)
            {
                
                if(!Object.keys(STATE[destiny][chestKeys[i]]).length && !quantity)
                {
                    // data.slot = chestKeys[i];
                    STATE[destiny][chestKeys[i]] = data;
                    STATE[this.list][currentSlot] = {};
                    this.delete(currentSlot);
                    OBSERVER.notify(destiny,data,chestKeys[i]);
                    // console.log("Achei! consegui mover!")
                    break;
                }
                else if((STATE[destiny][chestKeys[i]].label == label) && Object.keys(STATE[destiny][chestKeys[i]]).length && !quantity)
                {
                    // console.log('já tem é igual e move tudo de uma vez');

                    STATE[destiny][chestKeys[i]].quantity+= STATE[this.list][currentSlot].quantity;
                    STATE[this.list][currentSlot] = {};
                    this.delete(currentSlot);
                    OBSERVER.notify(destiny,STATE[destiny][chestKeys[i]],chestKeys[i]);
                    break;
                }
                else if(( STATE[destiny][chestKeys[i]].label == label) && Object.keys(STATE[destiny][chestKeys[i]]).length && quantity)
                {
                    // console.warn("Esta cheio é igual e move de quantidade em quantidade");
                    // console.log("movendo quantidade de :", quantity)
                    STATE[destiny][chestKeys[i]].quantity+= quantity;
                    STATE[this.list][currentSlot].quantity-=quantity;
                    OBSERVER.notify(destiny,STATE[destiny][chestKeys[i]],chestKeys[i]);
                    OBSERVER.notify(this.list,STATE[this.list][currentSlot],currentSlot);
                    if(STATE[this.list][currentSlot].quantity === 0){
                        this.delete(currentSlot);
                    }
                    break;
            
                }
                else if(!Object.keys(STATE[destiny][chestKeys[i]]).length && quantity )
                {

                    // console.warn("Está vazio! e move de quantidade em quantidade");
                    data.quantity = quantity;
                    STATE[destiny][chestKeys[i]] = data;
                    STATE[this.list][currentSlot].quantity-=quantity;
                    OBSERVER.notify(destiny,data,chestKeys[i]);
                    OBSERVER.notify(this.list,STATE[this.list][currentSlot],currentSlot);
                    break;
                }
            }
        }

        console.log(STATE);
    }

    moveSlot = (options)=>{

        const { destiny:OPDestiny, currentSlot, nextSlot, quantity, label } =  options;

        let destiny = !OPDestiny ? this.list : OPDestiny;

        if(typeof quantity === 'number' || typeof quantity === 'undefined' )
        {
            const updateObject = quantity ? { quantity }: {} ;

            this.update({   
                data: Object.assign(updateObject,STATE[this.list][currentSlot]),
                destiny,
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

        Object.values(STATE[this.list]).map((dataItem,index)=>{

            if( Object.keys(dataItem).length >= 1 )
            {
                const options = {
                    data:dataItem,
                    slot:`slot-${index+1}`,
                    parentId:this.HTMLElement.children[0].parentElement.id
                }
                let item = new SlotItem(options);
                let slot = document.createElement('div');
                slot.classList.add("slot")
                slot.setAttribute("data-slot",`slot-${index+1}`);
                slot.appendChild(item.render())
                this.HTMLElement.children[0].appendChild(slot);
            }
            else
            {
                let slot = document.createElement('div');
                slot.classList.add("slot")
                slot.setAttribute("data-slot",`slot-${index+1}`);
                this.HTMLElement.children[0].appendChild(slot);
            }
        })
    }

    delete = (slot)=> {
       let slotHTML = this.HTMLElement.children[0].querySelector(`[data-slot=${slot}]`);
       slotHTML.removeChild(slotHTML.children[0]);
    }   

    getKeys = (origin)=> Object.keys( origin ? STATE[origin] : STATE[this.list]);

    reRender = (origin,data,slot)=> {

        if( origin === this.list )
        {
            const options = {
                data,
                slot,
                parentId:this.HTMLElement.children[0].parentElement.id
            }
            let HTMLSlot =  this.HTMLElement.children[0].querySelector(`[data-slot=${slot}]`);
            let slotData = new SlotItem(options);
            HTMLSlot.innerHTML = '';
            HTMLSlot.appendChild(slotData.render())
        }
    }

}

export default SlotDataList;