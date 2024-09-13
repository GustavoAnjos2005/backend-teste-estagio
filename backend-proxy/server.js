import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração de CORS para permitir apenas o frontend no GitHub Pages
const corsOptions = {
  origin: 'https://gustavoanjos2005.github.io', // Permitir apenas o frontend
  methods: 'GET', // Permitir apenas requisições GET
  optionsSuccessStatus: 200 // Para compatibilidade com navegadores mais antigos
};

app.use(cors(corsOptions));

// Rota raiz
app.get('/', (req, res) => {
  res.send('Servidor backend está funcionando!');
});

// Rota de verificação de saúde
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Servidor está saudável' });
});

// Rota para buscar produtos
app.get('/api/products', async (req, res) => {
  // Adicionando o cabeçalho CORS diretamente na resposta
  res.setHeader('Access-Control-Allow-Origin', 'https://gustavoanjos2005.github.io');
  
  try {
    const response = await fetch('https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
