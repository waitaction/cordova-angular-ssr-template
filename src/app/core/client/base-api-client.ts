import { Observable } from 'rxjs';

export class BaseApiClient {
    constructor() {

    }
}

export function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            observer.next(JSON.stringify(blob));
            observer.complete();
        }
    });
}
