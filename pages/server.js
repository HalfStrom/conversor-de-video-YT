const express = require("express");
const ytdl = require('ytdl-core');
const distubeYtdl = require('@distube/ytdl-core');
const ffmpeg = require('ffmpeg-static');
const cp = require('child_process');
const path = require('path');
const app = express();

app.use(express.static('public')); // Pasta para meu front-end
app.use(express.json());

// Função para baixar vídeo usando @distube/ytdl-core (principal) e ytdl-core (fallback)
async function downloadVideo(url, format) {
    try {
        
        if (format === 'mp3') {
            return distubeYtdl(url, { filter: 'audioonly' });
        } else {
            return distubeYtdl(url, { quality: 'highest' });
        }
    } catch (error) {
        console.log('@distube/ytdl-core falhou, tentando ytdl-core como fallback...');
        
        if (format === 'mp3') {
            return ytdl(url, { filter: 'audioonly' });
        } else {
            return ytdl(url, { quality: 'highest' });
        }
    }
}

// Rota pra baixar e converter o vídeo
app.get('/download', async (req, res) => {
    try {
        const url = req.query.url;
        const format = req.query.format || 'mp4';
        
        // Validar URL com @distube/ytdl-core primeiro
        if (!distubeYtdl.validateURL(url)) {
            // Fallback para ytdl-core
            if (!ytdl.validateURL(url)) {
                return res.status(400).send('URL inválida');
            }
        }

        res.header('Content-Disposition', `attachment; filename="video.${format}"`);
        
        const stream = await downloadVideo(url, format);
        stream.pipe(res);
        
        // Tratamento de erro no stream
        stream.on('error', (error) => {
            console.error('Erro no stream:', error);
            if (!res.headersSent) {
                res.status(500).send('Erro ao processar o vídeo');
            }
        });
        
    } catch (error) {
        console.error('Erro ao processar download:', error);
        if (!res.headersSent) {
            res.status(500).send('Erro interno do servidor');
        }
    }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));