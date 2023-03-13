import ObservableSlot from "./models/ObservableSlot.js";

export const CHEST = document.getElementById("chest");
export const INVENTORY = document.getElementById("inventory");
console.log(CHEST,INVENTORY)
export const OBSERVER = new ObservableSlot();
export const STATE = {
    prepareMovimentItem:false,
    chestItems:{
        "slot-1":{
         
        },
        "slot-2":{
           
        },
        "slot-3":{
           
        },
        "slot-4":{

        },
        "slot-5":{

        },
        "slot-6":{

        },
        "slot-7":{

        },
        
        "slot-8":{

        },
        "slot-9":{

        },
        "slot-10":{

        },
        "slot-11":{

        },
        "slot-12":{

        },
        
        "slot-13":{

        },
        "slot-14":{

        },
        "slot-15":{

        },
        "slot-16":{

        },
        "slot-17":{

        },
        "slot-18":{

        },
        "slot-19":{

        },
        "slot-20":{

        },
        "slot-21":{

        },
    },
    inventoryItems:{
        "slot-1":{
            quantity:10,
            label:"item-02",
            src:'./images/9.png',
            details:{
                title:"Helmet Steel",
                subTitle:"made of a resistant material",
                descriptions:[
                    {
                        value:18,
                        label:"Resistance"
                    },
                    {
                        value:-4,
                        label:"Velocity"
                    }
                ]
            }
        },
        "slot-2":{
            quantity:100,
            label:"item-32",
            src:'./images/11.png',
            details:{
                title:"Wooden Shield",
                subTitle:"made of wood pieces",
                descriptions:[
                    {
                        value:9,
                        label:"Protection"
                    },
                    {
                        value:-2,
                        label:"Velocity"
                    }
                ]
            }
        },
        "slot-3":{
            quantity:100,
            label:"item-75",
            src:'./images/33.png',
            details:{
                title:"Bloody Sword",
                subTitle:"forged with elf bloods",
                descriptions:[
                    {
                        value:28,
                        label:"Attack"
                    },
                    {
                        value:2,
                        label:"Velocity"
                    }
                ]
            }
        },
        "slot-4":{

        },
        "slot-5":{

        },
        "slot-6":{

        },
        "slot-7":{

        },
        
        "slot-8":{

        },
        "slot-9":{

        },
        "slot-10":{

        },
        "slot-11":{

        },
        "slot-12":{

        },
        
        "slot-13":{

        },
        "slot-14":{

        }
    },
    itemToMove:{
    }
}
