import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import Template from '../../components/Template' 

import api from '../../services/api'

import './detalhes.css'
import carne from '../../assets/carne.png'
import cerveja from '../../assets/cerveja.png'
import linguica from '../../assets/linguica.png'
import frango from '../../assets/frango.png'
import refrigerante from '../../assets/refrigerante.png'

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
                setChurrasco(res.data.churrasco);
            })
        } catch (error) {
            
        }
    }, [loggedUser, params.id]);

    function FormataData2(data){
        var dataFormatada = data.substr(8,2) + "/" + data.substr(5,2) + "/" + data.substr(0,4)
        return dataFormatada;
    }

    return (
        <Template>
            <div id="detalhes">
                {churrasco != null ?
                    <div>
                        <div id="header">
                            <h1 >Meus churrascos</h1>
                            <h2>{churrasco.name}</h2>
                            <h2>{FormataData2(churrasco.date)}</h2>
                        </div>

                        <div id="form-criar1">

                            <div id="caracteristica1">
                                <div id="nome">
                                        <label>Nome</label>                                  
                                        <p>{churrasco.name}</p><br></br>
                                </div>  

                                <div id="data">    
                                        <label>Data</label>
                                        <p>{churrasco.date}</p><br></br>
                                </div>
                                <div id="participantes">       
                                        <label>Participantes</label>
                                        <br></br>
                                       { churrasco.participantes.map(participante => (
                                        <li id="lista" key={participante._id}>
                                            <div>
                                                <p>{participante.name}</p>
                                            </div>
                                       </li>

                                       
                                        ))}
                                </div>  
                            </div>




                            <div id="arrumar-itens1">   
                                <label>Itens</label>

                                <div id="destino-itens">
                                    <div >
                                        <img id="carne" src={carne} alt="carne"/>

                                        <div id="escrita-carne">
                                            <h3> Quantidade: </h3>
                                            <h3> Valor Total: </h3>
                                        </div>         
                                    </div>

                                    <div >
                                        <img id="cerveja" src={cerveja} alt="cerveja"/>
                                        <div id="escrita-cerveja">
                                            <h3> Quantidade: </h3>
                                            <h3> Valor Total: </h3>
                                        </div>     
                                    </div>

                                    <div>
                                        <img id="linguica" src={linguica} alt="linguica"/>
                                        <div id="escrita-linguica">
                                            <h3> Quantidade: </h3>
                                            <h3> Valor Total: </h3>
                                        </div>
                                    </div>

                                    <div>
                                        <img id="frango" src={frango} alt="frango"/>
                                        <div id="escrita-frango">
                                            <h3> Quantidade: </h3>
                                            <h3> Valor Total: </h3>
                                        </div>
                                    </div>

                                    <div>
                                        <img id="refrigerante" src={refrigerante} alt="refrigerante"/>
                                        <div id="escrita-refrigerante">
                                            <h3> Quantidade: </h3>
                                            <h3> Valor Total: </h3>
                                        </div>
                                    </div>
                                 </div>
                            </div>
                         </div>           
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