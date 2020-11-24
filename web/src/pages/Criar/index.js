import React, { useState, useEffect, createElement } from 'react'

import Template from '../../components/Template'
import api from '../../services/api'

import './criar.css'

export default function Criar() {

    const loggedUser = window.localStorage.getItem('user');
    const user = JSON.parse(loggedUser);
    const [itens, setItens] = useState([]);
    const [name, setName] = useState();
    const [date, setDate] = useState();
    const [participantes, setParticipantes] = useState([]);
    const [itensQuantity, setItensQuantity] = useState([]);
    let amigos;

    useEffect(() => {
        try {
            api.get('itens', {}).then(res => {
                setItens(res.data);
            })
        } catch (error) {

        }
    }, [loggedUser]);

    useEffect(() => {
        try {
            api.get('amigos', {}).then(res => {
                console.log("1")
                amigos = res.data;
                console.log("2")
                console.log(amigos);
                listaAmigos(res.data.friend);
            })
        } catch (error) {

        }
    }, [loggedUser]);

    function nomeAmigo(amigo){
        if(amigo.user1._id === user._id){
            return amigo.user2.name;
        }
        return amigo.user1.name;
    }

    function listaAmigos(amigos){
        console.log(amigos);
        var lista = document.getElementById("amigos-list");

        amigos.forEach(amigo => {
        
            var option = createElement('option');
            // option.innerHTML = nomeAmigo(amigo);
            // option.nodeValue = amigo._id;
            // lista.appendChild(option)
        })
        
    }

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            name,
            date,
            participantes,
            itensQuantity
        }
    }

    function duplicarCampos(idOrigem, idDestino){
        var clone = document.getElementById(idOrigem).cloneNode(true);
        var destino = document.getElementById(idDestino);
        destino.appendChild (clone);
        
        var camposClonados = clone.getElementsByTagName('input');
        
        for(var i=0; i<camposClonados.length;i++){
            camposClonados[i].value = '';
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

    // function controleBotao(){

    //     //cria um event listener que escuta mudanças no input
    //     document.getElementById("destino-teste").addEventListener("destino-teste", function(event){
    //     //busca conteúdo do input
    //         var qtd = document.getElementById("destino-teste").getElementsByTagName('input').length;

    //         //valida conteudo do input 
    //         if (qtd > 1) {
    //         //habilita o botão
    //         document.getElementById("botao").disabled = false;
    //     });
    // }

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
                            value={name}
                            required
                        />
                        <label>Data</label>
                        <input
                            type="date"
                            id="date"
                            onChange={e => setDate(e.target.value)}
                            value={date}
                            required
                        />
                        <label>Participantes</label>
                        <div id="destino-participantes">
                            <div id="origem-participantes">
                                <input 
                                    type="text"
                                    id="participantes"
                                    onChange={e => setParticipantes(e.target.value)}
                                    value={participantes}
                                    list="amigos-list"
                                    required
                                />
                                
                                <datalist id="amigos-list">
                                </datalist>
                            </div>
                        </div>
                        <div class= "botoes">
                            <button onClick={() => duplicarCampos("origem-participantes", "destino-participantes")}>Adicionar</button>
                            <button id="botao" onClick={() => removerCampos("destino-participantes")}>Remover</button>
                        </div>
                        <div id="arrumar-itens">
                        <label>Itens</label>
                        <div id="destino-itens">
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
                        </div>
                        </div>
                        <button type="submit">Criar Churrasco!</button>
                    </form>
                </div>
            </div>
        </Template>
    );
}