import 'zone.js/dist/zone-node';
import './server/main';
import { XMLHttpRequest } from 'xmlhttprequest';
export * from './src/main.server';


(function fixedUniversal() {
    if (!((typeof window != 'undefined') && window)) {
        global.getComputedStyle = function () {
            return null;
        };
    }
    if ((typeof global != 'undefined') && global) {
        global.XMLHttpRequest = XMLHttpRequest;
    }
})();
