import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import Template from '../../components/Template' 

import api from '../../services/api'

import './detalhes.css'

export default function Detalhes() {

    const history = useHistory();
    const params = useParams();
    const [ churrasco, setChurrasco ] = useState();

    const loggedUser = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('jwt_token');

    useEffect(() => {
        if (!token || !loggedUser) {
            history.push('/logar');
            return;
        }
    }, []);

    useEffect(() => {
        try {
            api.get(`churrascos/${params.id}`, {}).then(res => {
                setChurrasco(res.data);
            })
        } catch (error) {
            
        }
    }, [loggedUser, params.id]);

    return (
        <Template>
            <div id="detalhes">
            {churrasco != null ?
                <div id="header">
                    <h1 >Meus churrascos</h1>
                    <h2>{churrasco.churrasco.name}</h2>
                    <h2>{churrasco.churrasco.date}</h2>
                </div>
               : 
               <div id="header">
                   <h1 >Meus churrascos</h1>
                   <h2>Carregando...</h2>
               </div>
            }
            </div>
        </Template>
    );
}