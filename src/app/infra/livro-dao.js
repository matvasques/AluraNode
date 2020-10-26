/**
 * Esta classe fará o acesso ao DB. 
 * Retorna os dados vindos da query ou erro
 */

class LivroDao{
    constructor(db){
        this._db = db;
    }

    /**
     * Modifiquei o codigo para usar Promises. AGora o metodo lista envia o retorno para a funcao then() -> lista().then()
     * lista recebe a Promise resolve se der tudo certo, que contem o retorno do DB (resultados = lista dos livros)
     * e executa uma função de callback lá em routes.js 
     */
    lista(){
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => {
                    if(erro){
                        return reject('Não foi possível listar os livros!');
                    }else
                        return resolve(resultados); 
                }
            );
        });
    }
    //metodo para add o livro. Fizemos uma promise porém o resolve() não retorna nada, ja que a função
    //insert no banco de dados não possui retorno, apenas traz um erro caso ele ocorra.
    //a funcao run() do obj db recebe 3 params, a query do banco de dados, o array com osd ados q vamos inserir e uma funcao de callback para ser executada ao final da query
    adiciona(livro){
        return new Promise((resolve, reject) => {
            this._db.run(
                'INSERT INTO livros (titulo, preco, descricao)values(?, ?, ?)',
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                (err) => {
                    if(err){
                        console.log(err);
                        return reject('Não foi possível adicionar o livro');
                    }
                    resolve();
                }
            );
        });
    }
    buscaId(id){
        return new Promise((resolve, reject) => {
            this._db.get(
                'SELECT * FROM livros WHERE id = ?',
                [id],
                (err, livro) => {
                    if(err){
                        console.log(err);
                        return reject('Não foi possível encontrar o livro');
                    }
                    resolve(livro);
                }
            );
        });
    }

    atualiza(livro){
        return new Promise((resolve, reject) => {
            this._db.run(
                'UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?',
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ],
                err => {
                    if(err){
                        return reject('Nao foi possivel atualizar o livro');
                    }
                    resolve();
                }
            );
        });
    }

    remove(id){
        return new Promise((resolve, reject) => {
            this._db.run(
                'DELETE FROM livros WHERE id = ?',
                [id],
                (err) => {
                    if(err){
                        console.log(err);
                        return reject('Não foi possível encontrar o livro');
                    }
                    resolve();
                }
            );
        });
    }
}

module.exports = LivroDao;