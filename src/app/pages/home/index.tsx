import {FC, ReactElement} from 'react';
import { observer } from 'mobx-react'
import Form from "../../components/form";
import {useGlobalStore} from "../../stores";
import Modal from "../../components/modal";

const Home: FC = observer((): ReactElement => {

    const {
        userData,
        setUserData,
        dataChangedModalVisible,
        setDataChangedModalVisible
    } = useGlobalStore()

    const onModalClose = () => setDataChangedModalVisible(false)

    return (
        <div className="main">
            <Modal open={dataChangedModalVisible} onDismiss={onModalClose}>
                {`Hello, ${userData.name} ${userData.surname}, your age is ${userData.age}`}
            </Modal>
            <Form
                schema={{
                    name: 'string',
                    surname: 'string',
                    age: 'number'
                }}
                initialValues={{
                    name: 'Firstname',
                    surname: 'Lastname',
                    age: 60,
                }}
                onSubmit={setUserData}
            />
        </div>
    );
})

export default Home;

