import SlotDataList from './models/SlotList.js';
import { CHEST, INVENTORY, OBSERVER } from './config.js';

export const chest = new SlotDataList('chestItems',CHEST);
export const inventory = new SlotDataList('inventoryItems',INVENTORY);


export const App = {

    init : ()=> { 
        inventory.generateSlots();
        chest.generateSlots();
        OBSERVER.subscribe(inventory.reRender);
        OBSERVER.subscribe(chest.reRender);
    }
}

App.init();

