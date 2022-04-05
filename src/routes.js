import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from '../src/assets/screens/home';
import RegisterScreen from '../src/assets/screens/auth/register'
import LoginScreen from '../src/assets/screens/auth/login'
import NotesScreen from '../src/assets/screens/notes/index'
import UserEditScreen from '../src/assets/screens/users/edit'
import PrivateRoute from './assets/components/auth/private_route';


//Uma rota para devolver o BG da home
const Router = () => (
    <BrowserRouter>
        <Routes>
            {/* Rotas para cada página do site */}
            <Route path="/" element={<HomeScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            {/* Só acessaram quem estiver logado */}
            <Route element={<PrivateRoute />} >
                <Route path='/notes' element={<NotesScreen />} />
                <Route path='/users/edit' element={<UserEditScreen />} />
            </Route>
        </Routes>
    </BrowserRouter>
)

export default Router