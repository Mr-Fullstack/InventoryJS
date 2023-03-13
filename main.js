
import { chest, HtmlObserverSlot, inventory } from './config.js';


export const App = {

    init : ()=> { 
        chest.generateSlots();
        inventory.generateSlots();
        HtmlObserverSlot.subscribe(inventory.reRender);
        HtmlObserverSlot.subscribe(chest.reRender);
    }
}

App.init();

