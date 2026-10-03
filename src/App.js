import './App.css';
import { useState } from 'react';

function App() {

  const [auditoria, setAuditoria] = useState(null);
  const [erro, setErro] = useState(null);

  const carregaAuditoria = async () => {

    try {

      const resposta = await fetch(
        "http://localhost:5000/api/produtos/auditoria"
      );

      const data = await resposta.json();

      console.log("PRODUTOS CARREGADOS:", data);

      setAuditoria(data);

    } catch (err) {

      console.log(
        `Erro ao buscar produtos no banco de dados: ${err.message}`
      );

      setErro("Erro ao carregar produtos");
    }
  };

  console.log("AUDITORIA:", auditoria);

  return (
    <div className="App">

      <button onClick={carregaAuditoria}>
        Carregar Auditoria
      </button>

      {erro && (
        <p>{erro}</p>
      )}

      {auditoria && (
        <div>

          <p>
            Produtos ativos:
            {auditoria.totalProdutosAtivos}
          </p>

          <p>
            Produtos sem estoque:
            {auditoria.produtosSemEstoque}
          </p>

          <p>
            Estoque baixo:
            {auditoria.estoqueBaixo}
          </p>

          <p>
            Estoque normal:
            {auditoria.estoqueNormal}
          </p>

        </div>
      )}

    </div>
  );
}

export default App;