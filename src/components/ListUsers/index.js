import { useEffect, useState} from "react"
import api from '../../api/';
import AddNewUser from "../AddNewUser";
import ViewUser from "../ViewUser";
import '../../App.scss';
import './Style.scss';

export default function ListUsers(){
    let [userList, setUserList] = useState([]);
    
    useEffect(() => {
        // Procurar para ver se existe uma maneira de verificar se o sessionStorage foi já gerado
        // Vendo se o tamanho é maior que zero e/ou comparar com nulo não funciona.
        api.get('/users')
        .then(function (response) {
            setUserList(response.data)

            sessionStorage.setItem('localStorageUsers', JSON.stringify(response.data));
            userList = JSON.parse(sessionStorage.getItem('localStorageUsers'))
        })
        .catch(function (error) {
            console.log(error);
        })
            
    }, []);

    function deleteUser(id){
        api.delete(`/users/${id}`)
        .then(function (response) {
            userList = userList.filter((item) => item.id !== id);
            sessionStorage.setItem('localStorageUsers', JSON.stringify(userList));
            userList = JSON.parse(sessionStorage.getItem('localStorageUsers'))
            
            setUserList(userList)

        })
        .catch(function (error) {
            console.log(error);
        })
    }
    
    return (
        <>
            <div className="container-fake">
                <h1>
                    Tabela de Usuários
                </h1>
                <table className="border-list">
                    <tbody>
                        <tr className="color-column-title">
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Opções</th>
                        </tr>
                        {userList.map(function(user, index) {
                            return (
                                <tr key={user.id}>
                                    <ViewUser id_user={user.id} name_user={user.name}></ViewUser>
                                    <td>{user.email}</td>
                                    <td className="display-center">
                                        <button onClick={() => deleteUser(user.id)} className="style-button">Excluir</button>
                                    </td>
                                </tr>
                            )
                            
                        })}
                    </tbody>
                </table>
                <div className="space-top-new-user style-default-button">
                    <AddNewUser></AddNewUser>
                </div>
            </div>
        </>
    )
}

