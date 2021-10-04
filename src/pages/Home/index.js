import React, { useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

function App(props) {
  const history = useHistory();
  const [ user, setUser ] = useState("");
  const [ error, setError ] = useState(false);
  
  function handleSearch() {
    axios.get(`https://api.github.com/users/${user}/repos`)
    .then(res => {
      const repositories = res.data;
      const repositoriesName = [];
      repositories.map((repository) => {
        repositoriesName.push(repository.name);
        
      });
      localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName))
      setError(false);
      history.push('repositories')
    })
    .catch(err => {
      setError(true);
    });
  }

  return (  
    <>  
    <Header /> 
    
    <S.HomeContainer>
    
    <S.Content> 
           
      <S.Input className="user-input" placeholder="Usuário" value={user} onChange={e => setUser(e.target.value)}/>
      <S.Button type="button" onClick={handleSearch} className="">Pesquisar</S.Button>      
    </S.Content>
    { error ? <S.ErrorMsg>Ocorreu um erro. Tente novamente.</S.ErrorMsg> : "" }
    </S.HomeContainer>
    
    <Footer />
    </>
  );
}

export default App;