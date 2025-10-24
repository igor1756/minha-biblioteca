// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importe o componente Link
import { Button } from 'react-bootstrap';

function HomePage() {
  return (
    <div className="text-center mt-5">
      <div className='row d-flex align-items-center'>
        <div className='col'>
          <h1>Minha Biblioteca Pessoal</h1>
          <p className="lead">Gerencie sua coleção de livros de forma simples e eficaz.</p>
          <hr />
          {/*
        IMPORTANTE: Usamos <Link> em vez de <a href="...">.
        O <Link> garante que a navegação aconteça sem recarregar a página.
        */}
          <Link to="/livros">
            <Button variant="dark" size="lg">
              Ver minha coleção de livros
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;