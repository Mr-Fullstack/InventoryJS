import HtmlObservableSlot from "./models/HtmlObservableSlot.js";
import Container from "./models/Container.js";
import State from "./models/State.js";

export const chestHTML = document.getElementById("chest");
export const inventoryHTML = document.getElementById("inventory");

export const chest = new Container('chest',chestHTML);
export const inventory = new Container('inventory',inventoryHTML);

export const containers= {
    chest,
    inventory
}

export const HtmlObserverSlot = new HtmlObservableSlot();

export const state = new State({
    chest:{
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
    inventory:{
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
            quantity:100,
            label:"item-24",
            src:'./images/13.png',
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
        "slot-5":{
            quantity:100,
            label:"item-39",
            src:'./images/2.png',
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
        "slot-6":{
            quantity:100,
            label:"item-52",
            src:'./images/21.png',
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
        "slot-7":{
            quantity:100,
            label:"item-87",
            src:'./images/18.png',
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
        "slot-8":{
            quantity:100,
            label:"item-95",
            src:'./images/14.png',
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
        "slot-9":{
            quantity:100,
            label:"item-41",
            src:'./images/15.png',
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
        "slot-10":{
            quantity:100,
            label:"item-97",
            src:'./images/32.png',
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
        "slot-11":{
            quantity:100,
            label:"item-23",
            src:'./images/26.png',
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
        "slot-12":{
            quantity:100,
            label:"item-12",
            src:'./images/29.png',
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
        "slot-13":{
            quantity:100,
            label:"item-7",
            src:'./images/31.png',
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
        "slot-14":{
            quantity:100,
            label:"item-5",
            src:'./images/4.png',
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
        }
    },
});


export const isScroll = () => {
    let body = document.body, html = document.documentElement;

    let docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

    let winHeight = window.innerHeight;

    if (docHeight < winHeight){
        return null;
    }
    
    return {
        value:docHeight - winHeight
    }
  
}