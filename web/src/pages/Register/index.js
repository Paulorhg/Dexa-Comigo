import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'

import api from '../../services/api'

import './register.css'
import happyGuy from '../../assets/happy-guy.jpg'

export default function Register() {

    const history = useHistory();
    const { addToast } = useToasts();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const jwtToken = window.localStorage.getItem('jwt_token');
        if (jwtToken) {
            history.push('/lançamentos');
        }
    }, []);


    const onSubmit = e => {
        e.preventDefault();
        
        const data = {
            name,
            email,
            password
        }

        api.post('/api/user', data)
            .then(resp => resp.data)
            .then(resp => {
                console.info(resp);
                addToast(
                    "Cadastro realizado com sucesso! Faça login para continuar.", 
                    { appearance: 'success' }
                );
                history.push('/logar');
            })
            .catch(error => {
                console.error(error);
                addToast(error.message, { appearance: 'error' });
            });
    }

    return (
        <div id="cadastrar">
            <header>
                MINHAS CONTAS
            </header>
            <body id="cadastrar"> 
                <h1>ALCANCE SEUS OBJETIVOS CONOSCO</h1>

                <section>
                    <form id="cadastro" action="" method="post" onSubmit={onSubmit}>
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

                    <img id="happyGuy" src={happyGuy} alt="happy guy"/>
                </section>
            </body>
        </div>
    );
}