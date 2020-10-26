const db = require('../config/database');

//Importando a classe criada
const LivroDao = require('./infra/livro-dao');

//instanciando a classe
const livroDao = new LivroDao(db);

module.exports = (app) =>{
    app.get('/', (req, resp) => {
        resp.send(`
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Casa do Código </h1>
                </body>
            </html>
        `)
    });
    
    app.get('/livros', (req, resp)=>{
        //segundo param da função marko é enviado na variavel data
        livroDao.lista((erro, resultados) => {
            resp.marko(
                require('./views/livros/lista/lista.marko'),
                {
                    livros: resultados
                }
            );
        });
    });   
}
