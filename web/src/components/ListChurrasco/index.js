import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom';

import api from '../../services/api'

import './listChurrasco.css'
//import fundo_churrasco from '../../assets/fundo_churrasco.jpg'

export default function listChurrasco(churrascos) {


    function FormataData2(data){
        var dataFormatada = data.substr(8,2) + "/" + data.substr(5,2) + "/" + data.substr(0,4)
        return dataFormatada;
    }

    return (
        <div id="lista">
            <ul>
                { churrascos.churrascos.length !=0 ? churrascos.churrascos.churrascos.map(churrasco => (
                    <li key={churrasco._id}>
                        <Link to={`/churrasco/${churrasco._id}`}>
                            <div id="link">
                            <strong><center><u><font face="New Century Schoolbook"> NOME DO CHURRASCO </font></u></center></strong>
                                <center><p>{churrasco.name}</p></center>
                                <strong><center><u>DATA</u></center></strong>
                                <center><p>{FormataData2(churrasco.date)}</p></center>
                                
                            </div>
                        </Link>
                    </li>
                )) : <p>Carregando...</p>
                }
            </ul>
        </div>
    );
}