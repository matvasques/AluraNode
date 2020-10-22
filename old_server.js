const http = require('http');

//executa a função () => qd recebe uma requisição do client
//retorna a resp.end
const servidor = http.createServer( (req, resp) => {
    let html = '';
    if(req.url == '/'){
        html = 
        `
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Casa do Código </h1>
                </body>
            </html>
        `;
    }
    else if(req.url == '/livros'){
        html = 
        `
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Seção de Livros </h1>
                </body>
            </html>
        `;
    }
    
    resp.end(html);
});

servidor.listen(3000);