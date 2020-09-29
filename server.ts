import 'zone.js/dist/zone-node';
import './server/main';
export * from './src/main.server';
import { XMLHttpRequest } from 'xmlhttprequest';

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
