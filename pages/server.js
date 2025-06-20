const express = require("express");
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const cp = require('child_process');
const path = require('path');
const app = express();

app.use(express.static('public')); // Pasta para meu front-end
app.use(express.json());

// Rota pra baixar e converter o vídeo
app.get('/download', async (req, res) => {
    const url = req.query.url;
    const format = req.query.format || 'mp4';
    if (!ytdl.validateURL(url)) {
        return res.status(400).send('URL inválida');
    }

    res.header('Content-Disposition', `attachment; filename="video.${format}"`);
    
    if (format === 'mp3') {
        ytdl(url, { filter: 'audioonly' }).pipe(res);
    } else {
        ytdl(url, { quality: 'highest'}).pipe(res);
    }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));