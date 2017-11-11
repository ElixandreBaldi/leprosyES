function Pergunta (enunc, tip, resposta = [], url = null, status = true) {
    this.newSimNao = function () {        
        this.resposta.push('Sim');
        this.resposta.push('Não');
    }

    this.newRadio = function (respostas) {
        for(let i = 0; i < respostas.length; i++){
            this.resposta.push(respostas[i]);
        }
    }

    this.newCheck = function (respostas) {
        for(let i = 0; i < respostas.length; i++){
            this.resposta.push(respostas[i]);
        }
    }

    this.setClass = function() {
        if(this.enunciado == 'Onde?') {
            this.class = 'perguntas col-md-10 offset-md-2';
            this.classRespostas = 'col-md-10';
        } else {            
            this.class = 'perguntas col-md-10 offset-md-1';
        }        
    }

    this.enunciado = enunc;
    this.tipo = tip;// 1 = texto, 2 == radiobox, 3 = sim ou não, 4 = checkbox, 5 = com imagem
    this.resposta = resposta;    
    this.url = url;
    this.status = status;
    this.class = null;
    this.classRespostas = 'col-md-6';
    this.setClass();
};