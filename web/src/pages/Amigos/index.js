import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {FiTrash2} from 'react-icons/fi'

import Template from '../../components/Template'
import api from '../../services/api'

import './amigos.css'


export default function Amigos() {

    const params = useParams();
    const [amigos, setAmigos] = useState([]);
    const [novoAmigo, setNovoAmigo] = useState();
    const [email, setEmail] = useState('');

    const loggedUser = window.localStorage.getItem('user');
    const user = JSON.parse(loggedUser);

    useEffect(() => {
        try {
            api.get('amigos/', {}).then(res => {
                setAmigos(res.data);
            })
        } catch (error) {
            
        }

    }, [loggedUser, params.id]);


    async function buscarAmigo(){
        try {
            //console.log(email)
            await api.get(`users/email/${email}`, {}).then(res => {
                setNovoAmigo(res.data);
            });
        } catch (error) {
            
        }
    }

    function teste(){
        console.log(novoAmigo)
    }

    function handleNovoAmigo(e){
        e.preventDefault();
        
        buscarAmigo()
        console.log(novoAmigo)

    }

    async function handleDelete(id){
        try {
            await api.delete(`amigos/${id}`);
            amigos.map(amigo => console.log(amigo._id))
            setAmigos(amigos.filter(amigo => amigo.friend._id !== id));
        } catch (error) {
            
        }
        
    }

    function nomeAmigo(amigo){
        if(amigo.user1._id === user._id){
            return amigo.user2.name;
        }
        return amigo.user1.name;
    }

    return (
        <Template>
            <div id="amigos">
                <div id="header">
                    <h1>AMIGOS</h1>
                </div>
                <div id="form-amigos">
                    <h2>Adicionar novo amigo</h2>
                    <form id="novoAmigo" action="" onSubmit={handleNovoAmigo}>
                        <label htmlFor="email">Email: </label>
                        <input 
                            type="email" 
                            onChange={e => setEmail(e.target.value)} 
                            value={email}
                            required
                        />
                        <button type="submit">Adicionar</button>
                    </form>
                    <button onClick={() => teste()}> teste </button>

                </div>
                <div id="lista-amigos">
                    <h2>Lista de amigos</h2>
                    <ul>
                    { amigos.length !== 0 ? amigos.friend.map(amigo => (
                        <li id="lista" key={amigo._id}>
                            <div>
                                <p>Nome: {nomeAmigo(amigo)}</p>
                                <button type="button" onClick={() => handleDelete(amigo._id)}><FiTrash2 size={20} color="a8a8b3"/></button>
                            </div>

                        </li>
                    )) : <p>carregando</p>
                    }
                    </ul>
                </div>

            </div>
        </Template>
    );
}