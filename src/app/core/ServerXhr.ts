import { BrowserXhr } from '@angular/common/esm2015/http';
import { Injectable } from '@angular/core';
import { XMLHttpRequest } from 'xmlhttprequest';
@Injectable()
export class ServerXhr {

    constructor() {

    }


    build() {
        //   let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
        return (new XMLHttpRequest());
    }
}