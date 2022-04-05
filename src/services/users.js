//Concentrando todas as chamadas do endpoint para os users
import Api from "./api";

const UsersService = {
    register: (params) => Api.post('/users/register', params),
    //Guardar as informações do usuário no browser que voltam da API e rodam no TOKEN, para chamar endpoints protegidos
    login: async (params) => {
        const response = await Api.post('/users/login', params)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
    },
    //Para fazer o logout, apagar o user e token
    logout: () => {
        localStorage.removeItem('user', null)
        localStorage.removeItem('token', null)
    },
    //Atualizar o usuário
    update: async (params) => {
        const response = await Api.put("/users", params, {
            headers: { 'x-access-token': localStorage.getItem('token') }
        })
        localStorage.setItem('user', JSON.stringify(response.data));
    },
    //Atualizar Senha
    updatePassword: async (params) => {
        await Api.put("/users/password", params, {
            headers: { 'x-access-token': localStorage.getItem('token') }
        })
    },
    //Deletar usuário
    delete: async () => {
        await Api.delete("/users", {
            headers: { 'x-access-token': localStorage.getItem('token') }
        })
        localStorage.removeItem('user', null);
        localStorage.removeItem('token', null);
    }
}

export default UsersService