import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom';

import api from '../../services/api'
import {AiOutlineRollback} from 'react-icons/ai'

import './login.css'


export default function Accounts() {

    const history = useHistory();
    const { addToast } = useToasts();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email,
            password
        }

        api.post('/api/login', data)
            .then(resp => resp.data)
            .then(resp => {
                window.localStorage.setItem('jwt_token', resp.access_token);
                window.localStorage.setItem('user', JSON.stringify(resp.user));
                api.defaults.headers.common['Authorization'] = 'Bearer ' + resp.access_token;
                history.push('/lançamentos');
            })
            .catch(error => {
                console.error(error);
                addToast('Senha incorreta ou usuário inexistente', { appearance: 'error' });
            })
    }

    return (
        <div id="login">
            <form id="logar" action="" onSubmit={handleSubmit}>
                <legend>Fazer Login</legend>
                <label htmlFor="email">Email do Usuario</label>
                <input 
                    id="email" 
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                    required
                />
                <label htmlFor="senha">Senha</label>
                <input 
                    id="senha" 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)} 
                    required
                />
                <button type="submit">Entrar</button>
                <Link className="voltar" to="/">
                    <AiOutlineRollback size={16}/>
                    Voltar
                </Link>
            </form>
        </div>
    );
}