/**
 * Esta classe fará o acesso ao DB. 
 * Retorna os dados vindos da query ou erro
 */

class LivroDao{
    constructor(db){
        this._db = db;
    }

    lista(callback){
        this._db.all(
            'SELECT * FROM livros', 
            (erro, resultados) => {
                callback(erro, resultados);
            }
        );
    }
}

module.exports = LivroDao;