import './App.css';
import { useEffect, useState } from 'react';
/**
    Usar async/await.
    Tratar erros com try/catch.
    Verificar se a resposta HTTP foi bem-sucedida.
    Exibir Carregando... enquanto a requisição estiver em andamento.
    Exibir uma mensagem caso a API falhe.
    Exibir os produtos quando a requisição terminar.
    A requisição deve acontecer quando o componente for montado.
 */
function App() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState(null);
  const [mensagem, setMensagem] = useState(true);

  useEffect(() => {
    async function carregaProdutos(){
      try {
        const response = await fetch('http://localhost:5000/api/produtos')

        if (!response.ok) {
          throw new Error(`Erro na requisição verifique se a url está correta ${response.status}`)  
        }
        const data = await response.json()
        setProdutos(data.produto)
        console.log(data)
      } catch (error) {
        console.error(`Não foi possível obter os produtos ${error}`)
      }finally{
        setMensagem(false)
      }
    }
    carregaProdutos()
  },[])
  if(mensagem){
    return <div>Carregando...</div>
  }
  return (
    <div className="App">
      {produtos.map((prod) => (
        <div>
          <span key={prod._id}>{prod.nome}</span>
        </div>
      ))}
    </div>
  );
}

export default App;