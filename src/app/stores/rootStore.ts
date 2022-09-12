import { makeAutoObservable } from 'mobx';
import { GlobalStore } from './globalStore';

export class RootStore {
    globalStore

    constructor() {
        this.globalStore = new GlobalStore(this);

        makeAutoObservable(this);
    }

}
