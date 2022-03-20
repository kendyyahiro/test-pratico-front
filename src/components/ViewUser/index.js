
import Modal from 'react-modal';
import { useState} from "react";
import '../../App.scss';
import './Style.scss';

export default function AddNewUser(props){
    let [modalIsOpen, setModalIsOpen] = useState(false);
    let [userSelected, setUserSelected] = useState([]);
    
    function viewUser(id){
        userSelected = JSON.parse(sessionStorage.getItem('localStorageUsers')).filter((item) => item.id == id);
        setUserSelected(userSelected[0])
        console.log(userSelected)
    }

    return(
        <>
            <td className="cursor-open-view-user" onClick={() => {setModalIsOpen(true);viewUser(props.id_user)}}>{props.name_user}</td>
            
            <Modal isOpen={modalIsOpen}>
                <div className="margin-modal information-user">
                    <div className="emphasis-user">{userSelected.name}</div>
                    <div className="d-flex-information">
                        <div>Email: </div>
                        <div>{userSelected.email}</div>
                    </div>
                    
                    <div className="d-flex-information">
                        <div>Telefone: </div>
                        <div>{userSelected.phone}</div>
                    </div>
                    
                    <div className="d-flex-information">
                        <div>Site: </div>
                        <div>{userSelected.website}</div>
                    </div>
                    
                    <div className="style-default-button space-top-new-user cancel-new-user back-button">
                        <button onClick={() => setModalIsOpen(false)}>Voltar</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

