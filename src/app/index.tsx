import {FC, ReactElement} from 'react';
import './index.scss';
import Home from "./pages/home";
import {RootStoreProvider} from "./stores";

const App: FC = (): ReactElement => {
    return (
        <>
            <RootStoreProvider>
                <Home/>
            </RootStoreProvider>
        </>
    )
}

export default App;

