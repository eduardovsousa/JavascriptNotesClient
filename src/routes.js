import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from '../src/assets/screens/home';
import RegisterScreen from '../src/assets/screens/auth/register'
import LoginScreen from '../src/assets/screens/auth/login'
import NotesScreen from '../src/assets/screens/notes/index'
import UserEditScreen from '../src/assets/screens/users/edit'
import PrivateRoute from './assets/components/auth/private_route';


const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route element={<PrivateRoute />} >
                <Route path='/notes' element={<NotesScreen />} />
                <Route path='/users/edit' element={<UserEditScreen />} />
            </Route>
        </Routes>
    </BrowserRouter>
)

export default Router