# Conversor de Vídeo YouTube

Um conversor de vídeos do YouTube que permite baixar vídeos em formato MP4 ou MP3.

## 🚀 Como usar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o servidor:**
   ```bash
   npm start
   ```

3. **Acessar a aplicação:**
   - Abra seu navegador e vá para `http://localhost:3000`
   - Cole a URL do vídeo do YouTube
   - Escolha o formato (MP4 ou MP3)
   - Clique em "Baixar"

## 📦 Dependências

- `express`: Servidor web
- `@distube/ytdl-core`: Biblioteca principal para download (mais estável)
- `ytdl-core`: Biblioteca de fallback
- `ffmpeg-static`: Conversão de vídeo

## 🛠️ Estrutura do Projeto

```
conversor-de-video-YT/
├── pages/
│   └── server.js          # Servidor Express
├── public/
│   ├── index.html         # Interface do usuário
│   └── styles.css         # Estilos CSS
├── package.json           # Dependências e scripts
└── README.md             # Este arquivo
```