import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import {FiTrash2} from 'react-icons/fi'
import {ImCheckmark} from 'react-icons/im'

import Template from '../../components/Template'
import api from '../../services/api'

import './amigos.css'


export default function Amigos() {

    const params = useParams();
    const history = useHistory();
    const [amigos, setAmigos] = useState([]);
    //const [user2, setUser2] = useState();
    //const [novoAmigo, setNovoAmigo] = useState();
    const [email, setEmail] = useState('');

    const loggedUser = window.localStorage.getItem('user');
    const user = JSON.parse(loggedUser);

    useEffect(() => {
        try {
            api.get('amigos/', {}).then(res => {
                //console.log(res.data)
                setAmigos(res.data);
            })
        } catch (error) {
            
        }

    }, [loggedUser, params.id]);

    // async function buscarAmigo(){
        
    // }

    // function teste(){
    //     console.log(novoAmigo)
    // }

    async function handleNovoAmigo(e){
        e.preventDefault();
        
        try {
            //console.log(email)
            await api.get(`users/email/${email}`, {}).then(res => {
                //setNovoAmigo(res.data);
                console.log(res.data)
                if(res.data != null){
                    console.log("1")
                    PostAmigo(res.data.user._id)
                }

            });
        } catch (error) {
        }
    }

    async function PostAmigo(id){
        
        const user2 = id;
        console.log("2")
        const data = {
            user2
        }
        console.log("3")
        try {
            console.log("5")
            await api.post('amigos/', data).then(res => {
                
            });
            history.push('/amigos')
        } catch (error) {
            
        }
    }

    async function handleDelete(id){
        try {
            await api.delete(`amigos/${id}`);
            amigos.map(amigo => console.log(amigo._id))
            history.push('/amigos')
        } catch (error) {
            
        }
        
    }

    function nomeAmigo(amigo){
        if(amigo.user1._id === user._id){
            return amigo.user2.name;
        }
        return amigo.user1.name;
    }

    async function handleAccept(amigo){
        try {

            const accept = true;

            const data = {
                accept
            }
            await api.put(`amigos/${amigo._id}`, data).then(res => {
                console.log(res.data);
                amigos.friend.map(amigoAlterado => {
                    if(amigoAlterado._id === amigo._id){
                        amigo.accept = true;
                        console.log(amigoAlterado);
                    }
                    setAmigos(amigos);
                })
            });
            
        } catch (error) {
            
        }
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
                </div>
                <div id="lista-amigos">
                    <h2>Lista de amigos</h2>
                    <ul id="confirmados">
                    { amigos.length !== 0 ? amigos.friend.map(amigo => (
                        amigo.accept == true ?
                        <li id="lista" key={amigo._id}>
                            <div>
                                <p>Nome: {nomeAmigo(amigo)}</p>
                                <button type="button" onClick={() => handleDelete(amigo._id)}><FiTrash2 size={20} color="a8a8b3"/></button>
                            </div>
                        </li>
                        : null
                    )) : <p>carregando</p>
                    }
                    </ul>
                    <h2>Amigos Pendentes</h2>
                    <ul id="pendentes">
                    { amigos.length !== 0 ? amigos.friend.map(amigo => (
                        amigo.accept == false ?
                        <li id="lista" key={amigo._id}>
                            <div>
                                <p>Nome: {nomeAmigo(amigo)}</p>
                                {amigo.user2._id == user._id ? 
                                    <button id="aceitar" onClick={() => handleAccept(amigo)}><ImCheckmark size={20} color="" /></button>
                                    : null
                                }
                                <button id="deletar" type="button" onClick={() => handleDelete(amigo._id)}><FiTrash2 size={20} color="a8a8b3"/></button>
                            </div>
                        </li>
                        : null
                    )) : <p>carregando</p>
                    }
                    </ul>
                </div>

            </div>
        </Template>
    );
}