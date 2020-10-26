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
        livroDao.lista().then(livros =>
            resp.marko(
                require('./views/livros/lista/lista.marko'),
                {
                    livros: livros
                }
            ))
            .catch(erro => console.log(erro))
    });

    //rota para o form
    app.get('/livros/form', (req, resp) => {
        resp.marko(require('./views/livros/form/form.marko'))
    });

    //rota para envio dos dados via metodo post
    app.post('/livros', (req, resp) => {
        livroDao.adiciona(req.body).then(resp.redirect('/livros'))
                                    .catch(erro => console.log(erro));
    });

    app.get('/busca', (req, resp) => {
        livroDao.buscaId(req.header).then(livros => {
            resp.marko(
                require('./views/livros/busca/busca.marko'),
                {
                    livros: livros
                }
            )
        })
        .catch(erro => console.log(erro))
    })
}
