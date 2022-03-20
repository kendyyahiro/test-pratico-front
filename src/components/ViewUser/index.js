
import Modal from 'react-modal';
import { useState} from "react";
import './Style.scss';

export default function AddNewUser(props){
    let [modalIsOpen, setModalIsOpen] = useState(false);
    let [userSelected, setUserSelected] = useState([]);
    
    function viewUser(id){
        setModalIsOpen(true);
        userSelected = JSON.parse(sessionStorage.getItem('localStorageUsers')).filter((item) => item.id == id);
        setUserSelected(userSelected[0])
    }

    return(
        <>
            <td className="cursor-open-view-user" onClick={() => {viewUser(props.id_user)}}>{props.name_user}</td>
            
            <Modal isOpen={modalIsOpen} ariaHideApp={false}>
                <div className="margin-modal information-user">
                    <div className="emphasis-user">{userSelected.name}</div>
                    <h3>
                        Informações
                    </h3>
                    <hr></hr>
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

