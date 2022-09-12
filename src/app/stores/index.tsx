import {createContext, ReactElement, ReactNode, useContext, useState} from 'react';
import { RootStore } from './rootStore';

const StoreContext = createContext({} as RootStore);


export const RootStoreProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const [rootStore] = useState(new RootStore());
    return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
};


export const useGlobalStore = () => {
    const rootStore: RootStore = useContext<RootStore>(StoreContext);
    const { globalStore } = rootStore;
    return globalStore || {};
};

