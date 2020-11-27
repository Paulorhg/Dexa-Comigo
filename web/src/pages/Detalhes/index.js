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
    const participantesUsers = []


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
                console.log(res.data.churrasco.participantes)
                res.data.churrasco.participantes.map( participante => {
                    PegaUser(participante)
                 })
            
            })
        } catch (error) {
            
        }
    }, [loggedUser, params.id]);

    function FormataData2(data){
        var dataFormatada = data.substr(8,2) + "/" + data.substr(5,2) + "/" + data.substr(0,4)
        return dataFormatada;
    }

    async function PegaUser(id){
        // try {
        //     api.get(`users/${id}`, {}).then(res => {
        //         console.log(res.data)
        //         participantesUsers = res.data;
        //     })
        // } catch (error) { }
    } 

    function ValorTotal(){

        let total = 0;
        churrasco.itensquantity.forEach(item => {
            if(item.quantity != null && item.price != null){
                total += item.quantity * item.price;
            }
        });

        return total;
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
                                        <p>{FormataData2(churrasco.date)}</p><br></br>
                                </div>
                                <div id="participantes">       
                                        <label>Participantes</label>
                                        <br></br>
                                        { participantesUsers.map(participante => (
                                                                                        
                                        <li id="lista" key={participante._id}>
                                            <div>
                                                <p>{participante}</p>
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
                                            {
                                                churrasco.itensquantity[0].quantity != undefined ? 
                                                 
                                                <div>
                                                <p>{churrasco.itensquantity[0].quantity} Kg</p><br></br>
                                                <h3> Valor Total: </h3>
                                                <p>R${ churrasco.itensquantity[0].quantity * churrasco.itensquantity[0].price}</p>
                                                </div>
                                                : <div><p>0 Kg</p><br></br>
                                                <h3> Valor Total: </h3>
                                                <p>0</p>
                                                </div>
                                            }
                                            
                                            
                                        </div>         
                                    </div>

                                    <div >
                                        <img id="cerveja" src={cerveja} alt="cerveja"/>
                                        <div id="escrita-cerveja">
                                            <h3> Quantidade: </h3>
                                            {
                                                churrasco.itensquantity[1].quantity != undefined ? 
                                                <div>
                                                <p>{churrasco.itensquantity[1].quantity} Kg</p><br></br>
                                                <h3> Valor Total: </h3>
                                                <p>R$ { churrasco.itensquantity[1].quantity * churrasco.itensquantity[1].price}</p>
                                                </div>
                                                
                                                : <div><p>0 Kg</p><br></br>
                                                <h3> Valor Total: </h3>
                                                <p>0</p>
                                                </div>
                                            }
                                            
                                        </div>     
                                    </div>

                                    <div>
                                        <img id="linguica" src={linguica} alt="linguica"/>
                                        <div id="escrita-linguica">
                                            <h3> Quantidade: </h3>
                                            {
                                                churrasco.itensquantity[2].quantity != undefined ? 
                                                <div>
                                                <p>{churrasco.itensquantity[2].quantity} Kg</p><br></br>
                                                <h3> Valor Total: </h3>
                                                <p>R$ { churrasco.itensquantity[2].quantity * churrasco.itensquantity[2].price}</p>
                                                </div>
                                                : <div><p>0 Kg</p><br></br>
                                                <h3> Valor Total: </h3>
                                                <p>0</p>
                                                </div>
                                            }
                                            
                                        </div>
                                    </div>

                                    <div>
                                        <img id="frango" src={frango} alt="frango"/>
                                        <div id="escrita-frango">
                                            <h3> Quantidade: </h3>
                                            {
                                                churrasco.itensquantity[3].quantity != undefined ? 
                                                <div>
                                                <p>{churrasco.itensquantity[3].quantity} Kg</p><br></br>
                                                <h3> Valor Total: </h3>
                                                <p>R$ { churrasco.itensquantity[3].quantity * churrasco.itensquantity[3].price}</p>
                                                </div>
                                                : <div><p>0 Kg</p><br></br>
                                                <h3> Valor Total: </h3>
                                                <p>0</p>
                                                </div>
                                            }
                                            
                                        </div>
                                    </div>

                                    <div>
                                        <img id="refrigerante" src={refrigerante} alt="refrigerante"/>
                                        <div id="escrita-refrigerante">
                                            <h3> Quantidade: </h3>
                                            {
                                                churrasco.itensquantity[4].quantity != undefined ? 
                                                <div>
                                                <p>{churrasco.itensquantity[4].quantity} Kg</p><br></br>
                                                <h3> Valor Total: </h3>
                                                <p>R$ { churrasco.itensquantity[4].quantity * churrasco.itensquantity[4].price}</p>
                                                </div>
                                                : <div><p>0 Kg</p><br></br>
                                                <h3> Valor Total: </h3>
                                                <p>0</p>
                                                </div>
                                            }
                                            
                                        </div>
                                    </div>
                                 </div>
                            </div>
                            <div>
                                <h3>Valor Total</h3>
                                <p>{ValorTotal()}</p>
                                <br/>
                                <h3>Valor por Pessoa</h3>
                                <p>{ValorTotal() / churrasco.participantes.length}</p>
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