import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  // TODO

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      id: '123',
      url: 'https://github.com/josepholiveira',
      title: 'Desafio ReactJS',
      techs: ['React', 'Node.js'],
    };

    const response = await api.post('repositories', newRepository);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter((repo) => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repo) => {
          return (
            <li key={repo.title}>
              <div>{repo.title}</div>
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
