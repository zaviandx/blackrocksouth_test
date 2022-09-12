import {action, makeAutoObservable, observable, reaction} from 'mobx';
import {RootStore} from "./rootStore";

type UserData = {
    name?: string;
    surname?: string;
    age?: number;
}

export class GlobalStore {
    root: RootStore

    @observable userData: UserData = {}
    @observable dataChangedModalVisible: boolean = false


    constructor(root: RootStore) {
        this.setUserData = this.setUserData.bind(this)
        this.setDataChangedModalVisible = this.setDataChangedModalVisible.bind(this)

        makeAutoObservable(this);

        this.root = root;

        reaction(
            () => this.userData,
            () => {
                console.log('setDataChangedModalVisible ')
                this.setDataChangedModalVisible(true)
            },
        );
    }

    @action
    setUserData = (userData: UserData) => {
        console.log('userData', userData)
        this.userData = userData
    }

    @action
    setDataChangedModalVisible = (dataChangedModalVisible: boolean) => {
        this.dataChangedModalVisible = dataChangedModalVisible
    }

}
