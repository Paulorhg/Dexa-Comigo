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

    function FormataData2(data){
        var dataFormatada = data.substr(8,2) + "-" + data.substr(5,2) + "-" + data.substr(0,4)
        return dataFormatada;
    }

    return (
        <Template>
            <div id="detalhes">
            {churrasco != null ?
                <div id="header">
                    <h1 >Meus churrascos</h1>
                    <h2>{churrasco.churrasco.name}</h2>
                    <h2>{FormataData2(churrasco.churrasco.date)}</h2>
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