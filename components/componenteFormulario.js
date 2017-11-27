// noinspection LightningSingletonTags
Vue.component('componenteFormulario', {

    template: `        
            <div class="col-md-12">                
                <div class="inicial col-md-10 offset-md-1" v-show="exameInicial">                    
                    <legend>
                        <h1> Sistema Especialista de Apoio ao Diagnósico a Hanseníase <b-button class="btn btn-info" @click="sobre()"> Sobre </b-button></h1>

                    </legend>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label class="label-control">
                                Nome do Paciente:
                            </label>                
                            <input type="text" class="form-control" @keyup="tratarNome">                
                        </div>
                        <div class="form-group col-md-6">
                            <label class="label-control">
                                Idade do Paciente:
                            </label>
                            <input type="number" class="form-control" @keyup="tratarIdade">                
                        </div>     
                    </div>   
                    <div class="row">                                                 
                        <div class="form-group col-md-12">                       
                            <label class="label-control">
                                Sexo:
                            </label>
                            <div class="row">
                                <div class="input-group col-md-6">
                                    <span class="input-group-addon">
                                        <input type="radio" name="sexo" v-on:click="tratarSexo('Masculino')">                            
                                    </span>
                                    <input type="text" class="form-control" value="Masculino" readonly>
                                </div>                                                
                                <div class="input-group col-md-6">
                                    <span class="input-group-addon">
                                        <input type="radio" name="sexo" v-on:click="tratarSexo('Feminino')">                            
                                    </span>
                                    <input type="text" class="form-control" value="Feminino" readonly>
                                </div>  
                            </div>                    
                        </div> 
                    </div>                    
                    <div v-show="flagExame">
                        <div class="row container-exames"  v-for="segmento in segmentos" v-show="contManchas == segmento.id">                        
                            <legend>Mancha {{ segmento.id + 1 }}</legend>
                            
                            <select class="form-control" @change="atualizarLocalSegmento">
                                <option v-for="mancha in partesCorpo" :data-foo="mancha.id" :data-fo="segmento.id">{{ mancha.value }}</option>
                            </select>
                            <legend>Selecione o resultado dos respectivos exames:</legend>                        
                            <div class="col-md-4">
                                <label class="label-control">Resultado do Exame Tátil</label>
                                <select class="form-control" @change="atualizarExameTatil">
                                    <option v-for="cod in codigoMapeamento" :data-foo="cod.id" :data-fo="segmento.id">{{ cod.codigo }}</option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label class="label-control">Resultado do Exame de Temperatura</label> 
                                <select class="form-control" @change="atualizarExameTemperatura">
                                    <option v-for="cod in codigoTemperatura" :data-foo="cod.id" :data-fo="segmento.id">{{ cod.value }}</option>
                                </select>                                         
                            </div>                        
                            <div class="col-md-4">
                                <label class="label-control">Resultado do Exame de Dor</label>
                                <select class="form-control" @change="atualizarExameDor">
                                    <option v-for="cod in codigoDor" :data-foo="cod.id" :data-fo="segmento.id">{{ cod.value }}</option>
                                </select>
                            </div>  
                            <div class="col-md-4" style="margin-top: 10px;" v-if="segmento.id > 0">
                                <button class="btn btn-warning btn-block" @click="segmentoAnterior">Mancha Anterior</button>
                            </div>  
                            <div class="col-md-4" style="margin-top: 10px;" v-else-if="segmento.id >= 0">
                                
                            </div>  
                            <div class="col-md-4" style="margin-top: 10px;">
                                <button class="btn btn-success btn-block" @click="finalizarExame">Finalizar Exame</button>
                            </div>                            
                            <div class="col-md-4" style="margin-top: 10px;" v-if="segmento.id < segmentos.length - 1">
                                <button class="btn btn-info btn-block" @click="proximoSegmento">Próxima Mancha</button>
                            </div>  
                            <div class="col-md-4" style="margin-top: 10px;" v-else-if="segmento.id < segmentos.length">
                                <button class="btn btn-info btn-block" @click="novoSegmento">Nova Mancha</button>
                            </div>
                        </div>
                    </div>
                    <div v-show="!flagExame">
                        <div class="col-md-12">
                            <br>
                            <h5> Resultados - Mancha Selecionada: {{ manchaSelecionada + 1 }}</h5>
                            <legend> {{nome}}, {{idade}} - {{sexo}} </legend>
                            <table class="table" style="text-align: center;">
                                <thead>
                                    <tr>                                        
                                        <th style="text-align: center;">
                                            Local
                                        </th>
                                        <th style="text-align: center;">
                                            Resultado Exame Tátil
                                        </th>
                                        <th style="text-align: center;">
                                            Resultado Exame de Temperatura
                                        </th>
                                        <th style="text-align: center;">
                                            Resultado Exame Dolorosa
                                        </th>                                        
                                        <th style="text-align: center;">
                                            Soma
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>                                        
                                        <td>
                                            {{ getLocal }}
                                        </td>
                                        <td>
                                            <img :src="getUrl" width="30px"> <br>
                                            {{ getTatil }}
                                        </td>
                                        <td>
                                            {{ getTemperatura }}
                                        </td>                                                                                                              
                                        <td>
                                            {{ getDor }}
                                        </td>    
                                        <td>
                                            {{ getSoma }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>                                            
                                        </td>
                                        <td>                                            
                                        </td>
                                        <td>                                            
                                        </td>
                                        <th>
                                            Resultado do Exame:
                                        </th>
                                        <th>
                                            <button class="btn btn-success" v-show="conclusaoExame == 0">Baixa Suspeita</button>
                                            <button class="btn btn-warning" v-show="conclusaoExame == 1">Media Suspeita</button>
                                            <button class="btn btn-danger" v-show="conclusaoExame == 2">Alta Suspeita</button>
                                        </th>
                                    </tr>                                                            
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div v-if="!legenda">
                        <button class="btn btn-info" style="margin-top:10px;" @click="inverterLegenda">Ver Legenda de Pesos</button>
                    </div>
                    <div v-else-if="legenda">
                        <button class="btn btn-info" style="margin-top:10px;" @click="inverterLegenda">Esconder Legenda de Pesos</button>                        
                        <div class="col-md-12 row" style="margin-top: 10px;">
                            <div class="col-md-4">
                                <legend>Pesos para cálculos do exame de temperatura:</legend>                            
                                <table class="table" style="text-align: center;">
                                    <thead>
                                        <tr>
                                            <th>
                                                Classificações Possíveis
                                            </th>
                                            <th>
                                                Pesos
                                            </th>                                    
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="codigo in codigoTemperatura" v-show="codigo.id > 0">
                                            <th>
                                                {{ codigo.value }}
                                            </th>
                                            <td>
                                                {{ codigo.pesoSoma }}
                                            </td>
                                        </tr>                                                           
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-4">
                                    <legend>Pesos para cálculos do exame Dolorosa:</legend><br>                                
                                <table class="table" style="text-align: center;">
                                    <thead>
                                        <tr>
                                            <th>
                                                Classificações Possíveis
                                            </th>
                                            <th>
                                                Pesos
                                            </th>                                    
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="codigo in codigoDor" v-show="codigo.id > 0">
                                            <th>
                                                {{ codigo.value }}
                                            </th>
                                            <td>
                                                {{ codigo.pesoSoma }}
                                            </td>
                                        </tr>                                                             
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-4">
                                    <legend>Pesos para cálculos do exame Monofilamento:</legend>
                                <table class="table" style="text-align: center;">
                                    <thead>
                                        <tr>
                                            <th>
                                                Classificações Possíveis
                                            </th>
                                            <th>
                                                Pesos
                                            </th>                                    
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="cod in codigoMapeamento" v-show="cod.id > 0 && cod.id < codigoMapeamento.length - 1">
                                            <th>
                                                <img :src="cod.url" width="30px"> {{ cod.codigo }}
                                            </th>
                                            <td>
                                                {{ cod.pesoSoma }}
                                            </td>
                                        </tr>                     
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <b-modal ref="myModalRef" hide-footer size="lg" title="Sistema Especialista de Apoio ao Diagnósico a Hanseníase">
                    <div class="row">
                        <div class="col-md-10 offset-md-1">
                            <p style="text-align:justify;">                            
                                O sistema desenvolvido cumpre o papel estabelecido pela equipe em conjunto com o médico especialista Dr. Hirofumi Uyeda e a professora de Inteligência Artificial Dra. Claudia Brandelero Rizzi. Um ponto levantado é que por se tratar de vários médicos que utilizaram o sistema é necessário que haja um treinamento de como utilizar o sistema, e como realizar os exames necessários para a detecção da doença. Porém após feito este treinamento inicial, acredita - se que o sistema pode auxiliar no controle da doença hanseníase.
                                Para mais informações acesse: <a href="https://github.com/ElixandreBaldi/leprosyES/readme"> https://github.com/ElixandreBaldi/leprosyES/readme </a>
                            </p>
                                <b-btn @click="fecharSobre" class="btn btn-default">Ok</b-btn>
                            </h6>
                        </div>
                    </div>
                </b-modal>
            </div>    
        `,
    
    data: function () {        
        return {
            perguntas: [],
            form: new Formulario(),            
            flagSegmentos: this.flagSegmentos,
            segmentos: this.segmentos,
            partesCorpo: this.partesCorpo,
            selected: this.selected,
            exameTatilSimples: this.exameTatil,
            exameMonofilamento: this.exameMonofilamento,
            exameInicial: this.exameInicial,
            exameTemperatura: this.exameTemperatura,            
            gerarResultados: this.gerarResultados,     
            contManchas: this.contManchas,
            codigoMapeamento: this.codigoMapeamento,
            codigoTatil: this.codigoTatil,
            codigoTemperatura: this.codigoTemperatura,
            codigoDor: this.codigoDor,
            nome: this.nome,
            sexo: this.sexo,
            idade: this.idade,
            flagExame: this.flagExame,
            manchaSelecionada: this.manchaSelecionada,
            getLocal: this.getLocal,
            getUrl: this.getUrl,         
            getTatil: this.getTatil,
            getTemperatura: this.getTemperatura,
            getDor: this.getDor,
            getSoma: this.getSoma,
            legenda: this.legenda,
            conclusaoExame: this.conclusaoExame
        };
    },
    methods: {
        imgBack(url) {
            return 'background-image:url('+url+');';
        },
        gerarValorLimiar () {
            let qtdManchas = this.segmentos.length;
            let soma = 0;
            for(let i = 0; i < qtdManchas; i++)
                soma += this.segmentos[i].somador;

            return soma/qtdManchas;
        },   
        verificaPesoTempF(tempF) {
            if(tempF == this.codigoTemperaturaF[1]){
                return 1;
            }

            return 0;                        
        },
        verificaPesoTat(tat) {
            if(tat == this.codigoTatil[0])
                return 6;
            else if(tat == this.codigoTatil[1])
                return 2;
            else if(tat == this.codigoTatil[2])
                return 1;
            return 0;
        },
        verificaPesoMono(mono){            
            for(let i = 0; i < this.codigoMapeamento.length; i++) {                
                if(mono == this.codigoMapeamento[i].codigo) {                   
                    return i;
                }
            }
            return 0;
        },
        verificaPesoTempQ(tempQ) {            
            if(tempQ == this.codigoTemperaturaQ[1]){
                return 1;
            } else
                return 0;                        
        },
        somaPesosMancha(temperaturaF, temperaturaQ, tatil, monofilamento, id) {
            let tempF = 0, tempQ = 0, tat = 0, mono = 0, soma = 0;
            tempF += this.verificaPesoTempF(temperaturaF);
            tempQ += this.verificaPesoTempQ(temperaturaQ);
            tat += this.verificaPesoTat(tatil);
            mono += this.verificaPesoMono(monofilamento);
            if(mono > 0)
                tat = 0;

            soma += tempF + tempQ + tat + mono;                     
            this.segmentos[id].somador = soma;            
            return soma;
        },
        existeManchas() {
            let size = this.segmentos.length;
            if(size > 0)
                return true;
           return false;
        },
        tratarSexo(sexo) {
            this.sexo = sexo;
        },
        tratarNome(e) {
            this.nome = e.target.value;
        },
        tratarIdade(e) {
            this.idade = e.target.value;
        },        
        atualizarMonofilamento(e) {
            if(e.target.options.selectedIndex > -1) {                
                let id = e.target.options[e.target.options.selectedIndex].dataset.fo;
                this.segmentos[id].classificacaoMonofilamento = e.target.options[e.target.options.selectedIndex].dataset.foo;
                this.segmentos[id].classificacaoMonofilamentoUrl = e.target.options[e.target.options.selectedIndex].dataset.fooo;
            }
        },
        atualizarExameTatil(e) {
            if(e.target.options.selectedIndex > -1) {                
                let id = e.target.options[e.target.options.selectedIndex].dataset.fo;                
                this.segmentos[id].classificacaoTatil = e.target.options[e.target.options.selectedIndex].dataset.foo;                
            }            
        },
        incrementarContManchas() {
            if(this.contManchas < this.segmentos.length - 1)
                this.contManchas++;
            else {
                this.contManchas = 0;
                this.irInicial();
            }
        },
        segmentoAnterior () {
            this.contManchas--;
        },
        proximoSegmento () {
            this.contManchas++;
        },
        validarFim() {
            for(let i = 0; i < this.segmentos.length; i++){
                if(!this.segmentos[i].classificacaoDor || !this.segmentos[i].classificacaoMonofilamento || !this.segmentos[i].classificacaoTemperatura || !this.segmentos[i].local || this.nome == '..' || this.idade == '..' || this.sexo == '..')
                    return false;
            }
            return true;
        },
        finalizarExame() {   
            if(this.validarFim()){            
                let maior = -4;
                let index;
                for(let i = 0; i < this.segmentos.length; i++){                     
                    let scoreMancha = this.codigoMapeamento[parseInt(this.segmentos[i].classificacaoMonofilamento, 10)].pesoSoma + this.codigoTemperatura[parseInt(this.segmentos[i].classificacaoTemperatura, 10)].pesoSoma + this.codigoDor[parseInt(this.segmentos[i].classificacaoDor, 10)].pesoSoma;
                    console.log(scoreMancha);
                    if(scoreMancha > maior) {                    
                        maior = scoreMancha;
                        index = i;
                    }                
                }    
                this.manchaSelecionada = index;
                this.segmentos[this.manchaSelecionada].pesoSoma = maior;            
                
                this.getLocal = this.partesCorpo[this.segmentos[this.manchaSelecionada].local].value;      
                this.getUrl = this.codigoMapeamento[this.segmentos[this.manchaSelecionada].classificacaoMonofilamento].url;        
                this.getTatil = this.codigoMapeamento[this.segmentos[this.manchaSelecionada].classificacaoMonofilamento].codigo;        
                this.getTemperatura = this.codigoTemperatura[this.segmentos[this.manchaSelecionada].classificacaoTemperatura].value;                
                this.getDor = this.codigoDor[this.segmentos[this.manchaSelecionada].classificacaoDor].value;

                this.getSoma = this.segmentos[this.manchaSelecionada].pesoSoma;

                if(this.getSoma < 6)
                    this.conclusaoExame = 0;
                else if(this.getSoma < 10)
                    this.conclusaoExame = 1;
                else
                    this.conclusaoExame = 2;

                this.flagExame = false;
            } else {
                alert('Favor preencher todos os campos de cada mancha');
            }
        },
        irInicial() {            
            this.exameInicial = true;
            this.exameTemperatura = false;
            this.exameTatilSimples = false;
            this.exameMonofilamento = false;
            this.gerarResultados = false;
        },
        irExameTatilSimples() {
            this.exameInicial = false;
            this.exameTemperatura = false;
            this.exameTatilSimples = true;
            this.exameMonofilamento = false;
            this.gerarResultados = false;
        },
        irGerarResultados() {
            this.exameInicial = false;
            this.exameTemperatura = false;
            this.exameTatilSimples = false;
            this.exameMonofilamento = false;
            this.gerarResultados = true;
        },
        irExameMonofilamento() {
            this.exameInicial = false;
            this.exameTemperatura = false;
            this.exameTatilSimples = false;
            this.exameMonofilamento = true;
            this.gerarResultados = false;
        },
        irExameTemperatura() {
            this.exameInicial = false;
            this.exameTemperatura = true;
            this.exameTatilSimples = false;
            this.exameMonofilamento = false;
            this.gerarResultados = false;
        },
        tratarFlagSegmentos(value) {            
            if(value == 'S')
                this.flagSegmentos = true;
            else
                this.flagSegmentos = false;
        },
        sobre() {
            this.$refs.myModalRef.show();
        },
        fecharSobre() {
            this.hideModal();            
        },
        hideModal() {
            this.$refs.myModalRef.hide();
        },
        validarNovoSegmento() {
            let index = this.segmentos.length - 1;
            if(!this.segmentos[index].local || !this.segmentos[index].classificacaoDor || !this.segmentos[index].classificacaoMonofilamento || !this.segmentos[index].classificacaoTemperatura)
                return false;

            if(this.segmentos[index].classificacaoTemperatura == 1) {
                if(this.segmentos[index].classificacaoDor == 2 || (this.segmentos[index].classificacaoMonofilamento > 3 && this.segmentos[index].classificacaoMonofilamento < 8))
                    return false;
            }else if(this.segmentos[index].classificacaoTemperatura == 2) {
                if(this.segmentos[index].classificacaoDor == 1 || this.segmentos[index].classificacaoMonofilamento < 4)
                    return false;
            } else if(this.segmentos[index].classificacaoTemperatura == 3) {
                if((this.segmentos[index].classificacaoDor == 1 && this.segmentos[index].classificacaoMonofilamento > 3) || (this.segmentos[index].classificacaoDor == 2 && this.segmentos[index].classificacaoMonofilamento < 4))
                    return false;
            }

            return true;
        },
        novoSegmento() {
            if(this.validarNovoSegmento()) {            
                let novo = {
                    id: this.segmentos.length,
                    value: 'Mancha '+this.segmentos.length,
                    local: null,
                    classificacaoMonofilamento: null,                                
                    classificacaoTemperatura: null,
                    classificacaoDor: null
                };
                this.contManchas++;
                this.segmentos.push(novo);
            } else {
                alert('* Favor preencher todos os dados da mancha. \n* Caso você já preencheu todos os campos, refaça o teste pois apresentam dados não coerentes.')
            }
        },        
        excluirSegmento(id) {            
            if(this.segmentos.length > 1) {
                this.segmentos.splice(id,1);
                for(let i = id; i < this.segmentos.length; i++)
                    this.segmentos[i].id = i;
            }
        },
        atualizarSegmento($event, id){
            this.segmentos[id].value = $event.target.value; 
        },
        atualizarLocalSegmento(e) {
            if(e.target.options.selectedIndex > -1) {                
                let parte = e.target.options[e.target.options.selectedIndex].dataset.foo;
                this.segmentos.local = parte;                
                let id = e.target.options[e.target.options.selectedIndex].dataset.fo;
                
                this.segmentos[id].local = parte;                                
            }                                  
        },
        atualizarExameTatil(e) {
            if(e.target.options.selectedIndex > -1) {                
                let conclusao = e.target.options[e.target.options.selectedIndex].dataset.foo;                
                let id = e.target.options[e.target.options.selectedIndex].dataset.fo;                
                this.segmentos[id].classificacaoMonofilamento = conclusao;                                
            }                                  
        },
        atualizarExameTemperatura(e) {
            if(e.target.options.selectedIndex > -1) {                
                let conclusao = e.target.options[e.target.options.selectedIndex].dataset.foo;                       
                let id = e.target.options[e.target.options.selectedIndex].dataset.fo;                
                this.segmentos[id].classificacaoTemperatura = conclusao;                                
            }                                  
        },
        atualizarExameDor(e) {
            if(e.target.options.selectedIndex > -1) {                
                let conclusao = e.target.options[e.target.options.selectedIndex].dataset.foo;                              
                let id = e.target.options[e.target.options.selectedIndex].dataset.fo;                
                this.segmentos[id].classificacaoDor = conclusao;                                
            }                                        
        },  
        inverterLegenda() {
            this.legenda = !this.legenda;
        }
    }, mounted () {        
        this.perguntas = this.form.getPerguntas();   
        this.flagSegmentos = false; 
        

        this.selected = {};        
        this.partesCorpo = [
            {
                value: 'Selecione o Local da Mancha:',
                id: 0
            },
            {
                value: 'Face',
                id: 1
            },
            { 
                value: 'Orelhas',
                id: 2
            },
            {
                value: 'Braços',
                id: 3
            },
            {
                value: 'Pernas',
                id: 4
            },
            {
                value: 'Abdomem',
                id: 5
            },
            { 
                value: 'Costas',
                id: 6
            },
            {
                value: 'Pés',
                id: 7
            },
            {
                value: 'Mãos',
                id: 8
            },
            {
                value: 'Nadegas',
                id: 9
            }
        ];
        this.exameTatilSimples = false;
        this.exameMonofilamento = false;
        this.gerarResultados = false;
        this.exameInicial = true;
        this.exameTemperatura = false;
        this.flagExameMonofilamento = 0;
        this.contManchas = 0;
        this.codigoMapeamento = [
            {
                id: 0,
                codigo: 'Selecione...'
            },
            {
                id: 1,
                peso: '0,05g',
                interpretacao: 'Sensibilidade "Normal" para mão e pé.',
                codigo: 'Bolinha Verde',
                url: 'icons/bolinhaVerde.png',
                pesoSoma: -1
            },
            {
                id: 2,
                peso: '0,2g',
                interpretacao: 'Sensibilidade diminuída na mão, com dificuldade quanto à discriminação fina. (dentro do "normal" para o pé).',
                codigo: 'Bolinha Azul',
                url: 'icons/bolinhaAzul.png',
                pesoSoma: 1
            },
            {
                id: 3,
                peso: '2,0g',
                interpretacao: 'Sensibilidade protetora para a mão diminuída, permanecendo o suficiente para prevenir lesões. Dificuldades com a discriminação de forma e temperatura.',
                codigo: 'Bolinha Roxa',
                url: 'icons/bolinhaRoxa.png',
                pesoSoma: 2
            },
            {
                id: 4,
                peso: '4,0g',
                interpretacao: 'Perda de sensação protetora para a mão, e as vezes, para o pé. Vulnerável a lesões. Perda de discriminação quente/frio.',
                codigo: 'Bolinha Vermelha',
                url: 'icons/bolinhaVermelha.png',
                pesoSoma: 3
            },
            {
                id: 5,
                peso: '10,0g',
                interpretacao: 'Perda de sensação protetora para o pé ainda podendo sentir pressão profunda e dor.',
                codigo: 'Círculo Vermelho com "X"',
                url: 'icons/bolinhaCirculoVermelhoX.png',
                pesoSoma: 4
            },
            {
                id: 6,
                peso: '300g',
                interpretacao: 'Sensibilidade à pressão profunda podendo ainda sentir dor.',
                codigo: 'Círculo Vermelho',
                url: 'icons/bolinhaCirculoVermelho.png',
                pesoSoma: 5
            },
            {
                id: 7,
                peso: 'nenhuma',
                interpretacao: 'Perda de sensibilidade à pressão profunda, normalmente não podendo sentir dor.',
                codigo: 'Bolinha Preta',
                url: 'icons/bolinhaPreta.png',
                pesoSoma: 6
            },
            {
                id: 8,
                peso: '',
                interpretacao: '',
                codigo: 'Inconclusiva',
                url: '',
                pesoSoma: 0
            }
        ];               
        this.codigoTemperatura = [
            {
                value: 'Selecione...',
                id: 0                
            },
            { 
                value: 'Preservada',
                id: 1,
                pesoSoma: -1
            },
            {
                value: 'Comprometida',
                id: 2,
                pesoSoma: 6
                
            },
            {
                value: 'Inconclusiva',
                id: 3,
                pesoSoma: 0
            }
        ];        
        this.codigoDor = [
            {
                value: 'Selecione...',
                id: 0
            },
            { 
                value: 'Normal',
                id: 1,
                pesoSoma: -1
            },
            {
                value: 'Anormal',
                id: 2,
                pesoSoma: 6
            },
            {
                value: 'Inconclusiva',
                id: 3,
                pesoSoma: 0
            }
        ];   

        this.segmentos = [
            {
                id: 0,
                value: '',
                local: null,
                classificacaoMonofilamento: null,                                
                classificacaoTemperatura: null,
                classificacaoDor: null                
            }
        ];
        this.nome = '..';
        this.sexo = '..';
        this.idade = '..';
        this.flagExame = true;
        this.manchaSelecionada = -1;

        this.getLocal = '';
        this.getUrl = '';
        this.getTatil = '';
        this.getTemperatura = '';
        this.getDor = '';
        this.getSoma = '';
        this.legenda = false;
        this.conclusaoExame = null;
    }
});