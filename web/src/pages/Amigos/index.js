import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import Template from '../../components/Template'
import api from '../../services/api'

import './amigos.css'


export default function Amigos() {

    const history = useHistory();
    const params = useParams();
    const [amigos, setAmigos] = useState([]);

    const loggedUser = window.localStorage.getItem('user');

    useEffect(() => {
        try {
            api.get('amigos/', {}).then(res => {
                setAmigos(res.data);
            })
        } catch (error) {
            
        }
    }, [loggedUser, params.id]);


    return (
        <Template>
            <div id="amigos">
                <div id="header">
                    <h1>AMIGOS</h1>
                </div>
                <div>
                    <form>

                    </form>

                </div>
                <div id="lista-amigos">

                </div>

            </div>
        </Template>
    );
}