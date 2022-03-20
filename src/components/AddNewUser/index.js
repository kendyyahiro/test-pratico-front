
import Modal from 'react-modal';
import {useState} from "react";
import '../../App.scss';
import './Style.scss';

export default function AddNewUser(){
    let [modalIsOpen, setModalIsOpen] = useState(false);

    return(
        <>
            <button onClick={() => setModalIsOpen(true)}>Adicionar Novo</button>
            <div className="container-fake">
            <Modal isOpen={modalIsOpen}>
                <div className="container">
                    <form action="/action_page.php">
                    <div class="inline">
                        <div class="width-input-new-user">
                            <label>Nome:</label>
                            <input className="input-field"/>
                            <label>Telefone:</label>
                            <input className="input-field"/>
                        </div>
                        <div class="width-input-new-user">
                            <label>Email:</label>
                            <input className="input-field"/>
                            <label>Site:</label>
                            <input className="input-field"/>
                        </div>
                    </div>
                    <div className="space-between-save-cancel">
                        <div className="style-default-button space-top-new-user submit-new-user save-margin-right">
                            <button>Gravar</button>
                        </div>
                        <div className="style-default-button space-top-new-user cancel-new-user">
                            <button onClick={() => setModalIsOpen(false)}>Cancelar</button>
                        </div>
                    </div>
                    </form>
                </div>
            </Modal>
        </div>
        </>
    )
}

