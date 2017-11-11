function Formulario () {
    this.perguntas = [];    

    this.novaPergunta = function(enunciado, tipo, resposta, url = null, status = true){        
        if(tipo == 1 || tipo == 2 || tipo == 4) {            
            perg = new Pergunta(enunciado, tipo, resposta, url, status);                        
        } else if(tipo == 3) {
            perg = new Pergunta(enunciado, tipo, [], url, status);
            perg.newSimNao();
        } else if(tipo == 5) {
            perg = new Pergunta(enunciado, tipo, resposta, url, status);
        }

        this.perguntas.push(perg);
    }

    this.getPerguntas = function () {
        return this.perguntas;
    }

    this.run = function () {        
        this.novaPergunta('Nome do Paciente:', 1);
        this.novaPergunta('Idade:', 1);
        this.novaPergunta('Sexo:', 2, ['Masculino','Feminino']);        
        this.novaPergunta('Apresenta lesões no corpo?', 3);
        this.novaPergunta('Onde?', 4, ['face','orelha','nádegas','braços','pernas','costas'], null, false);

        this.novaPergunta('Apresenta dormencia no Corpo?', 3);        
        
        return this.getPerguntas();
    }    

    this.ativeStatusImg = function () {
        console.log(this.getPerguntas());
    }
};

// this.novaPergunta('O paciente apresenta algum desses sintomas?', 4, ['Manchas','Dormencia nos Nervos Perifericos','Placas','Inatividade de determinado nervo']);
//this.novaPergunta('Quais?', 5, ['Mancha', 'Placa', 'Nódulo', 'Infiltração'], ['img/imgMancha.png','img/imgPlaca.png','img/imgNodulo.png','img/imgInfiltracao.png'], false);