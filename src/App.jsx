import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [listaPersonagens, setListaPersonagens] = useState();
  const [personagemPesquisa, setPersonagemPesquisa] = useState();

  async function carregarPagina() {
    const { data } = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    setListaPersonagens(data.results);
  }

  useEffect(()=> {
    filtrarPersonagem()
  },[personagemPesquisa])

  useEffect(() => {
    carregarPagina();
  }, []);

  async function filtrarPersonagem() {
    const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?name=${personagemPesquisa}`);
    setListaPersonagens(data.results)
  }
  return (
    <>
      <h1>Projeto Rick and Morty</h1>
      <input
        type="text"
        id="pesquisa"
        name="pesquisa"
        placeholder="Digite um personagem"
        className="pesquisa"
        onChange={(e) => setPersonagemPesquisa(e.target.value)}
      />
      <section className="container">
        {listaPersonagens &&
          listaPersonagens.map((element) => (
            <div key={element.id} className="card">
              <img
                className="foto"
                src={element.image}
                alt="Foto do personagem"
              />
              <h2>Nome: {element.name}</h2>
              <p>Espécie: {element.especies}</p>
              <p>Status: {element.status}</p>
              <p>Localização: {element.location.name}</p>
            </div>
          ))}
      </section>
    </>
  );
}

export default App;
