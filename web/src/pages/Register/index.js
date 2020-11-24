import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'

import api from '../../services/api'

import './register.css'
import churrasqueira from '../../assets/churrasqueira.jpg'  

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    const { addToast } = useToasts();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            password
        };

        await api.post('auth/register', data)
            .then(resp => resp.data)
            .then(resp => {
                console.info(resp);
                window.localStorage.setItem('jwt_token', resp.token);
                window.localStorage.setItem('user', JSON.stringify(resp.user));
                api.defaults.headers.common['Authorization'] = 'Bearer ' + resp.token;
                history.push('/churrascos');
            })
            .catch(error => {
                console.error(error);
                addToast(error.message, { appearance: 'error' });
            });
    }
    
    useEffect(() => {
        const jwtToken = window.localStorage.getItem('jwt_token');
        if (jwtToken) {
            history.push('/churrascos');
        }
    }, []);

    return (
        <div id="cadastrar">
            <header>
                DEIXA COMIGO
            </header>
            <div> 
                <h1>SUA ÚNICA PREOCUPAÇÃO SERÁ A DIVERSÃO</h1>

                <section>
                    <form id="cadastro" action="" method="post" onSubmit={handleRegister}>
                        <legend>CADASTRE-SE AQUI</legend>
                        <label htmlFor="name">Nome Completo</label>
                        <input 
                            type="text" 
                            id="name" 
                            onChange={e => setName(e.target.value)} 
                            value={name}
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            onChange={e => setEmail(e.target.value)} 
                            value={email}
                            required
                        />
                        <label htmlFor="senha">Senha</label>
                        <input 
                            type="password" 
                            id="senha" 
                            onChange={e => setPassword(e.target.value)} 
                            value={password}
                            required
                        />
                        <button type="submit">Cadastre-se</button>
                        <Link className="logar" to="/logar">Já possui um cadastro? Clique aqui</Link>
                    </form>

                    <img id="churrasqueira" src={churrasqueira} alt="churrasqueira"/>
                </section>
            </div>
        </div>
    );
}