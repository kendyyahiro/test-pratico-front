import Modal from 'react-modal';
import api from '../../api/';
import {useState} from "react";
import './Style.scss';
import { useForm } from "react-hook-form";
import validator from 'validator'

export default function AddNewUser({setUserList}){
    let [modalIsOpen, setModalIsOpen] = useState(false);
    let { register, handleSubmit, reset } = useForm();
    let [emailError, setEmailError] = useState('')

    function saveUser(dataForm){
        api.post(`/users`, dataForm)
        .then(function (response) {
            let userListJson = sessionStorage.getItem('localStorageUsers');
            let json = JSON.parse(userListJson);

            if(validator.isEmail(dataForm.email)){
                if(json.length > 0){
                    const higherUserId = json.reduce(function(prev, current) {
                        return (prev.id > current.id) ? prev : current
                    })
                
                    dataForm.id = higherUserId.id + 1
                    json.push(dataForm);
                } else {
                    json = [];
                    dataForm.id = 1;
                    json.push(dataForm);
                }
                sessionStorage.setItem('localStorageUsers', JSON.stringify(json));
                setUserList(json)
                setModalIsOpen(false);
                reset();
            }
            else {
                setEmailError('Email inválido!')
            }
        })
    }

    function returnList(){
        setModalIsOpen(false);
        setEmailError('');
        reset();

    }
    return(
        <>
            <button onClick={() => setModalIsOpen(true)}>Adicionar Novo</button>
            <div className="container-fake">
            <Modal isOpen={modalIsOpen} ariaHideApp={false}>
                <div className="container">
                    <h2>Novo Usuário</h2>
                    <hr></hr>
                    <ol className="breadcrumb">
                        <li>Usuários</li>
                        <li className="active">
                            <strong>                        
                                Cadastrar Usuário
                            </strong>
                        </li>
                    </ol>
                    <form onSubmit={handleSubmit((dataForm) => saveUser(dataForm))}>
                        <div className="inline">
                            <div className="width-input-new-user">
                                <label>Nome:</label>
                                <input required {...register("name")} className="input-field"/>
                                <label>Telefone:</label>
                                <input {...register("phone")} className="input-field"/>
                            </div>
                            <div className="width-input-new-user">
                                <div className="">
                                    <label>Email:</label>
                                    <span style={{
                                    color: 'red',
                                    }}>{emailError}</span>
                                </div>
                                <input required {...register("email")} className="input-field"/>
                                <label>Site:</label>
                                <input {...register("website")} className="input-field"/>
                            </div>
                        </div>
                        <div className="space-between-save-cancel">
                            <div className="style-default-button space-top-new-user submit-new-user save-margin-right">
                                <input type="submit" value={"Gravar"}/>
                            </div>
                            <div className="style-default-button space-top-new-user cancel-new-user">
                                <button onClick={() => returnList()}>Cancelar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
        </>
    )
}



