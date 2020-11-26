import React, { useState, useEffect } from 'react'

import Template from '../../components/Template'
import api from '../../services/api'

import './criar.css'
import carne from '../../assets/carne.png'
import cerveja from '../../assets/cerveja.png'
import linguica from '../../assets/linguica.png'
import frango from '../../assets/frango.png'
import refrigerante from '../../assets/refrigerante.png'
import { useHistory } from 'react-router-dom'

export default function Criar() {
    const history = useHistory();
    const loggedUser = window.localStorage.getItem('user');
    const user = JSON.parse(loggedUser);
    const [name, setName] = useState();
    const [date, setDate] = useState();
    const [participantes, setParticipantes] = useState([]);
    const [qtdCarne, setCarne] = useState();
    const [qtdCerveja, setCerveja] = useState();
    const [qtdLinguica, setLinguica] = useState();
    const [qtdFrango, setFrango] = useState();
    const [qtdRefri, setRefri] = useState();
    const [amigos, setAmigos] = useState([]);
    var participante;


    useEffect(() => {
        try {
            api.get('amigos', {}).then(res => {
                setAmigos(res.data);
               // listaAmigos(res.data.friend);
            })
        } catch (error) {

        }
    }, [loggedUser]);

     //useEffect(() => {
    //     setParticipantes(participantesAux);
    //     console.log(participantes);
     //}, [participantes])

    function nomeAmigo(amigo){
        if(amigo.user1._id === user._id){
            return amigo.user2.name;
        }
        return amigo.user1.name;
    }

    function idAmigo(amigo){
        if(amigo.user1._id === user._id){
            return amigo.user2._id;
        }
        return amigo.user1._id;
    }

    function PegaItens(){
        let item = "Carne";
        let quantity = qtdCarne;
        var itensQuantity = [];

        itensQuantity.push({ item, quantity})

        item = "Cerveja";
        quantity = qtdCerveja;

        itensQuantity.push({ item, quantity})

        item = "Linguica";
        quantity = qtdLinguica;

        itensQuantity.push({ item, quantity})

        item = "Frango";
        quantity = qtdFrango;

        itensQuantity.push({ item, quantity})

        item = "Refrigerante";
        quantity = qtdRefri;

        itensQuantity.push({ item, quantity})

        return itensQuantity
    }

    async function handleSubmit(e) {
        e.preventDefault();

        let itensQuantity = PegaItens()
        console.log(participantes);
        const data = {
            name,
            date,
            participantes,
            itensQuantity
        }

        try {
            await api.post('churrascos/', data).then(res => {
                history.push(`/churrascos/${res.data.churrascos._id}`)
            });
        } catch (error) {
            
        }

        console.log(data)
    }

    function duplicarCampos(idOrigem, idDestino){
        var clone = document.getElementById(idOrigem).cloneNode(true);
        var destino = document.getElementById(idDestino);
        destino.appendChild (clone);
        
        var camposClonados = clone.getElementsByTagName('input');
        
        for(var i=0; i<camposClonados.length;i++){
            camposClonados[i].value = '';
            // camposClonados[i].onChange = e => {
            //     console.log(participantes)
            //     participantes[i] = (e.target.value)
            // };
        }
    }

    function removerCampos(idDestino){
        var node1 = document.getElementById(idDestino);

        var qtd = document.getElementById(idDestino).getElementsByTagName('input').length;
        //valida conteudo do input 
        if (qtd > 1) {
            var ultimo = node1.getElementsByTagName('input').length - 1;
            node1.removeChild(node1.childNodes[ultimo]);
        }
    }

    return (
        <Template>
            <div id="criar">
                <div id="header">
                    <h1 >CRIAR CHURRASCO</h1>
                </div>
                <div id="form-criar">
                    <form onSubmit={handleSubmit} className="create-churrasco">
                        <label>Nome</label>
                        <input
                            type="text"
                            id="name"
                            onChange={e => setName(e.target.value)}
                            //value={name}
                            required
                        />
                        <label>Data</label>
                        <input
                            type="date"
                            id="date"
                            onChange={e => setDate(e.target.value)}
                            //value={date}
                            required
                        />
                        <label>Participantes</label>
                        <div id="destino-participantes">
                            <div id="origem-participantes">
                                <input 
                                    id="inputParticipante"
                                    type="text"
                                    onChange={e => participante = e.target.value}
                                    list="amigos-list"
                                />
                                
                                <datalist id="amigos-list">
                                { 
                                    amigos.length !== 0 ? amigos.friend.map(amigo => (
                                        amigo.accept == true ?
                                        <option id="opcoes" key={amigo._id} value={idAmigo(amigo)}>
                                            {nomeAmigo(amigo)}
                                        </option>
                                        : null
                                    )) : null
                                }
                                </datalist>
                            </div>
                        </div>
                        <div className= "botoes">
                        <button type="button" id="botaoAdd" onClick={() => {
                                console.log(participante)
                                //participantesAux.push(participante);
                                //console.log(participantesAux)
                                setParticipantes(participantes => [ ...participantes, participante ]);
                                console.log(participantes)
                                document.getElementById("inputParticipante").value = '';
                            }
                        }> + </button>
                            {/* <button type="button" id="botaoAdd" onClick={() => duplicarCampos("origem-participantes", "destino-participantes")}> + </button>
                            <button type="button" id="botaoRem" onClick={() => removerCampos("destino-participantes")}> - </button> */}
                        </div>


                        <div id="arrumar-itens">
                        <label>Itens</label>

                        <div id="destino-itens">
                        <div >
                         <img id="carne" src={carne} alt="carne"/>
                            <div id="escrita-carne">
                                <h3> Quantidade: </h3>
                                <input 
                                    id="input-carne" 
                                    type="number" 
                                    placeholder="Quilos"
                                    onChange={e => setCarne(e.target.value)}
                                    />
                                <h3> Valor Total: </h3>
                            </div>
                        </div>

                        <div >
                            <img id="cerveja" src={cerveja} alt="cerveja"/>
                            <div id="escrita-cerveja">
                                <h3> Quantidade: </h3>
                                <input 
                                    id="input-cerveja" 
                                    type="number" 
                                    placeholder="Litros"
                                    onChange={e => setCerveja(e.target.value)}
                                    />
                                <h3> Valor Total: </h3>
                            </div>
                        </div>

                        <div >
                         <img id="linguica" src={linguica} alt="linguica"/>
                         <div id="escrita-linguica">
                                <h3> Quantidade: </h3>
                                <input 
                                    id="input-linguiça" 
                                    type="number" 
                                    placeholder="Quilos"
                                    onChange={e => setLinguica(e.target.value)}
                                />
                                <h3> Valor Total: </h3>
                            </div>
                        </div>

                        <div >
                            <img id="frango" src={frango} alt="frango"/>
                            <div id="escrita-frango">
                                <h3> Quantidade: </h3>
                                <input 
                                    id="input-frango" 
                                    type="number" 
                                    placeholder="Quilos"
                                    onChange={e => setFrango(e.target.value)}
                                />
                                <h3> Valor Total: </h3>
                            </div>
                        </div>

                        <div >
                            <img id="refrigerante" src={refrigerante} alt="refrigerante"/>
                            <div id="escrita-refrigerante">
                                <h3> Quantidade: </h3>
                                <input 
                                    id="input-refrigerante" 
                                    type="number" 
                                    placeholder="Litros"
                                    onChange={e => setRefri(e.target.value)}
                                />
                                <h3> Valor Total: </h3>
                            </div>
                        </div>
                       


                            {/*
                            <div id="origem-itens">
                                <input 
                                    type="text"
                                    id="itens"
                                    onChange={e => setItensQuantity(e.target.value)}
                                    value={itensQuantity}
                                    required
                                />
                            </div>
                        </div>
                        <div class="botoes">
                            <button onClick={() => duplicarCampos("origem-itens", "destino-itens")}>Adicionar</button>
                            <button id="botao" onClick={() => removerCampos("destino-itens")}>Remover</button>
                        </div>*/}
                        </div>
                        </div>
                            
                        <div id = "btn-criar">
                        <button id="botaoCriar" type="submit">Criar Churrasco!</button>
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
}