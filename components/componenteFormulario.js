// noinspection LightningSingletonTags
Vue.component('componenteFormulario', {

    template: `        
            <div class="col-md-10 offset-md-2">
                <div class="inicial" v-show="exameInicial">
                    <div class="row">
                        <div class="form-group col-md-5">
                            <label class="label-control">
                                Nome do Paciente:
                            </label>                
                            <input type="text" class="form-control" @keyup="tratarNome">                
                        </div>
                        <div class="form-group col-md-5">
                            <label class="label-control">
                                Idade do Paciente:
                            </label>
                            <input type="number" class="form-control" @keyup="tratarIdade">                
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="form-group col-md-10">
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

                    <div class="row">
                        <div class="form-group col-md-10">
                            <label class="label-control">
                                Apresenta Segmentos no Corpo:
                            </label>
                            <div class="row">
                                <div class="col-md-6">                                        
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <input type="radio" name="flagSegmentos" v-on:click="tratarFlagSegmentos('S')">                            
                                        </span>
                                        <input type="text" class="form-control" value="Sim" readonly>
                                    </div>  
                                </div>                                               
                                <div class="col-md-6"> 
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <input type="radio" name="flagSegmentos" v-on:click="tratarFlagSegmentos('N')">                            
                                        </span>
                                        <input type="text" class="form-control" value="Não" readonly>
                                    </div>                                          
                                </div>   
                                <div class="col-md-12" v-show="flagSegmentos">
                                <br>
                                    <b-button class="btn btn-info btn-block" @click="informarNovoSegmento()">
                                        Inserir/Excluir/Visualizar Segmentos
                                    </b-button>
                                </div>                                  
                                <div class="col-md-7 offset-md-3" v-show="existeManchas()">
                                    <br/>
                                    <button class="btn" style="background-color:white;" v-on:click="irExameTatilSimples">
                                        <img src="icons/icons8-physical-therapy-filled.png" height="100px" />    <br>
                                        Exame Tátil                             
                                    </button>                            
                                    <button class="btn" style="background-color:white;" v-on:click="irExameTemperatura">
                                        <img src="icons/icons8-temperature-filled.png" height="100px" /> <br>
                                        Exame de <br>Temperatura
                                    </button>
                                    <button class="btn" style="background-color:white;" v-on:click="irExameMonofilamento">
                                        <img src="icons/icons8-vertical-timeline-filled.png" height="100px" /> <br>
                                        Monofilamentos <br> Semmes-Weinstein
                                    </button>
                                </div>      
                                <div class="col-md-12">
                                    <button class="btn btn-success btn-block" @click="irGerarResultados">Gerar Resultados</button>
                                </div>      
                            </div>
                        </div>
                    </div>                                    
                    
                    <b-modal ref="myModalRef" hide-footer size="lg" title="Informações de Novo Segmento">
                        <div class="row">
                            <div class="col-md-8">
                                <h6>Identificador do Segmento</h6>
                            </div>
                            <div class="col-md-3">
                                <h6>Local</h6>
                            </div>                    
                        </div>
                        <div class="form-group col-md-12 row" v-for="segmento in segmentos">
                            <input type="text" class="form-control col-md-8" :value="segmento.value" @keyup="atualizarSegmento($event, segmento.id)">
                            <select class="form-control col-md-3" @change="atualizarLocalSegmento">
                                <option v-for="parte in partesCorpo" :data-foo="parte" :data-fo="segmento.id">{{ parte }}</option>
                            </select>                       
                            <div class="input-group col-md-1">
                                <span class="input-group-addon btn-primary" @click="novoSegmento">+</span>
                                <span class="input-group-addon btn-danger" @click="excluirSegmento(segmento.id)">-</span>
                            </div>
                        </div>
                        <b-btn @click="salvarSegmento" class="btn btn-success offset-md-6">Inserir</b-btn>
                    </b-modal>
                </div>

                <div class="exameMonofilamento" v-show="exameMonofilamento">                   
                    <legend>Exame Monofilamentos de Semmes-Weinstein</legend>
                    <div class="col-md-12 row">
                        <div class="col-md-5">
                            <div class="form-group">
                                <label class="label-control">
                                    Id do Segmento:
                                </label>                
                                <input type="text" class="form-control" :value="segmentos[contManchas].id" readonly>                
                            </div>
                            <div class="form-group">
                                <label class="label-control">
                                    Identificador do Segmento:
                                </label>                
                                <input type="text" class="form-control" :value="segmentos[contManchas].value" readonly>                
                            </div>
                            <div class="form-group">
                                <label class="label-control">
                                    Local do Segmento:
                                </label>                
                                <input type="text" class="form-control" :value="segmentos[contManchas].local" readonly>                
                            </div>
                            <button class="btn btn-info" @click="incrementarContManchas"> Próxima Mancha </button>
                        </div>
                        <div class="col-md-5" v-for="segmento in segmentos" v-show="contManchas == segmento.id">
                            <label class="label-control">
                                Identifique o resultado do mapeamento:
                            </label>   
                            <select class="form-control" @change="atualizarMonofilamento">
                                <option data-foo="escolhaOutro" active> Escolha </option>
                                <option :style='imgBack(codigoM.url)' v-for="codigoM in codigoMapeamento" :data-fooo="codigoM.url" :data-foo="codigoM.codigo" :data-fo="contManchas">
                                    {{ codigoM.codigo }}
                                </option>
                            </select>
                        </div>                                                                    
                    </div>
                    <div class="col-md-10">
                        <br>
                        <h5> Monofilamentos de nylon de Semmes-Weinstein e sua correlação com os níveis funcionais </h5>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>
                                        Peso
                                    </th>
                                    <th>
                                        Interpretação
                                    </th>
                                    <th>
                                        Código para Mapeamento
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="codigoM in codigoMapeamento">
                                    <td>
                                        {{ codigoM.peso }}
                                    </td>
                                    <td>
                                        {{ codigoM.interpretacao }}
                                    </td>
                                    <td>
                                        <img :src="codigoM.url" width="30px"> <br>
                                        {{ codigoM.codigo }}
                                    </td>
                                </tr>                            
                            </tbody>
                        </table>
                    </div>                
                </div>

                <div class="exameTatilSimples" v-show="exameTatilSimples">                   
                    <legend>Exame Tátil Simples</legend>
                    <div class="col-md-12 row">
                        <div class="col-md-5">
                            <div class="form-group">
                                <label class="label-control">
                                    Id do Segmento:
                                </label>                
                                <input type="text" class="form-control" :value="segmentos[contManchas].id" readonly>                
                            </div>
                            <div class="form-group">
                                <label class="label-control">
                                    Identificador do Segmento:
                                </label>                
                                <input type="text" class="form-control" :value="segmentos[contManchas].value" readonly>                
                            </div>
                            <div class="form-group">
                                <label class="label-control">
                                    Local do Segmento:
                                </label>                
                                <input type="text" class="form-control" :value="segmentos[contManchas].local" readonly>                
                            </div>
                            <button class="btn btn-info" @click="incrementarContManchas"> Próxima Mancha </button>
                        </div>
                        <div class="col-md-5" v-for="segmento in segmentos" v-show="contManchas == segmento.id">
                            <label class="label-control">
                                Identifique o resultado do exame tátil:
                            </label>   
                            <select class="form-control" @change="atualizarExameTatil">
                                <option data-foo="escolhaOutro" active> Escolha </option>
                                <option v-for="codigoT in codigoTatil" :data-foo="codigoT" :data-fo="contManchas">
                                    {{ codigoT }}
                                </option>
                            </select>
                        </div>                                                                    
                    </div>                
                </div>

                <div class="exameTemperatura" v-show="exameTemperatura">                                                             
                    <legend>Exame de Temperatura</legend>
                    <div class="col-md-12 row">
                        <div class="col-md-5">
                            <div class="form-group">
                                <label class="label-control">
                                    Id do Segmento:
                                </label>                                                                        
                                <input type="text" class="form-control" :value="segmentos[contManchas].id" readonly>                
                            </div>
                            <div class="form-group">
                                <label class="label-control">
                                    Identificador do Segmento:
                                </label>                
                                <input type="text" class="form-control" :value="segmentos[contManchas].value" readonly>                
                            </div>
                            <div class="form-group">
                                <label class="label-control">
                                    Local do Segmento:
                                </label>                
                                <input type="text" class="form-control" :value="segmentos[contManchas].local" readonly>                
                            </div>
                            <button class="btn btn-info" @click="incrementarContManchas"> Próxima Mancha </button>
                        </div>
                        <div class="col-md-5" v-for="segmento in segmentos" v-show="contManchas == segmento.id">
                            <br>
                            <label class="label-control">
                                Identifique o resultado do exame de Temperatura Quente:
                            </label>                       
                            <select class="form-control" @change="atualizarExameTemperaturaQuente">
                                <option data-foo="escolhaOutro" active> Escolha </option>
                                <option v-for="codigoTQ in codigoTemperaturaQ" :data-foo="codigoTQ" :data-fo="contManchas">
                                    {{ codigoTQ }}
                                </option>
                            </select>
                            <br>                    
                            <label class="label-control">
                                Identifique o resultado do exame de Temperatura Fria:
                            </label>   
                            <select class="form-control" @change="atualizarExameTemperaturaFria">
                                <option data-foo="escolhaOutro" active> Escolha </option>
                                <option v-for="codigoTF in codigoTemperaturaF" :data-foo="codigoTF" :data-fo="contManchas">
                                    {{ codigoTF }}
                                </option>
                            </select>
                        </div>    
                    </div>                                    
                </div>
                <div class="resultados" v-show="gerarResultados">
                    <div class="col-md-10">
                        <br>
                        <h5> Resultados </h5>
                        <legend> {{nome}}, {{idade}} - {{sexo}} </legend>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>
                                        id
                                    </th>
                                    <th>
                                        Indentificador/Local
                                    </th>
                                    <th>
                                        Temperatura Fria
                                    </th>
                                    <th>
                                        Temperatura Quente
                                    </th>
                                    <th>
                                        Tátil Simples
                                    </th>
                                    <th>
                                        Monofilamento
                                    </th>
                                    <th>
                                        Soma
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="segmento in segmentos">
                                    <td>
                                        {{ segmento.id }}
                                    </td>
                                    <td>
                                        {{ segmento.value }} / {{ segmento.local }}
                                    </td>
                                    <td>
                                        {{ segmento.classificacaoTemperaturaF}}
                                    </td>
                                    <td>
                                        {{ segmento.classificacaoTemperaturaQ}}
                                    </td>
                                    <td>
                                        {{ segmento.classificacaoTatil}}
                                    </td>                              
                                    <td>                                        
                                        <img :src="segmento.classificacaoMonofilamentoUrl" width="30px">
                                    </td>
                                    <td>
                                        {{ somaPesosMancha(segmento.classificacaoTemperaturaF, segmento.classificacaoTemperaturaQ, segmento.classificacaoTatil, segmento.classificacaoMonofilamento, segmento.id) }}
                                    </td>
                                </tr>     
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Índice Resultado:</td>
                                    <td> {{ gerarValorLimiar() }}</td>
                                </tr>                       
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-10">
                        <button class="btn btn-info btn-block" @click="irInicial">Voltar</button>
                    </div>  
                </div> 
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
            codigoTemperaturaQ: this.codigoTemperaturaQ,
            codigoTemperaturaF: this.codigoTemperaturaF,
            nome: this.nome,
            sexo: this.sexo,
            idade: this.idade
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
        atualizarExameTemperaturaQuente(e) {
            if(e.target.options.selectedIndex > -1) {                
                let id = e.target.options[e.target.options.selectedIndex].dataset.fo;
                this.segmentos[id].classificacaoTemperaturaQ = e.target.options[e.target.options.selectedIndex].dataset.foo;
                console.log(this.segmentos[id]);
            }
        },
        atualizarExameTemperaturaFria(e) {
            if(e.target.options.selectedIndex > -1) {                
                let id = e.target.options[e.target.options.selectedIndex].dataset.fo;
                this.segmentos[id].classificacaoTemperaturaF = e.target.options[e.target.options.selectedIndex].dataset.foo;                
            }

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
        informarNovoSegmento() {
            this.$refs.myModalRef.show();
        },
        salvarSegmento() {
            this.hideModal();            
        },
        hideModal() {
            this.$refs.myModalRef.hide();
        },
        novoSegmento() {
            let novo = {
                id: this.segmentos.length,
                value: '',
                local: '',
                classificacaoMonofilamento: '',
                classificacaoMonofilamentoUrl: '',
                classificacaoTatil: '',
                classificacaoTemperaturaQ: '',
                classificacaoTemperaturaF: '',
                somador: 0
            };
            this.segmentos.push(novo);            
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
                id = e.target.options[e.target.options.selectedIndex].dataset.fo;
                this.segmentos[id].local = parte;                
            }                                  
        }
    }, mounted () {        
        this.perguntas = this.form.getPerguntas();   
        this.flagSegmentos = false; 
        

        this.selected = {};        
        this.partesCorpo = ['', 'Face', 'Orelhas', 'Braços','Pernas', 'Abdomem', 'Costas', 'Pés', 'Mãos', 'Nadegas'];
        this.exameTatilSimples = false;
        this.exameMonofilamento = false;
        this.gerarResultados = false;
        this.exameInicial = true;
        this.exameTemperatura = false;
        this.flagExameMonofilamento = 0;
        this.contManchas = 0;
        this.codigoMapeamento = [
            {
                peso: '0,05g',
                interpretacao: 'Sensibilidade "Normal" para mão e pé.',
                codigo: 'Bolinha Verde',
                url: 'icons/bolinhaVerde.png'
            },
            {
                peso: '0,2g',
                interpretacao: 'Sensibilidade diminuída na mão, com dificuldade quanto à discriminação fina. (dentro do "normal" para o pé).',
                codigo: 'Bolinha Azul',
                url: 'icons/bolinhaAzul.png'
            },
            {
                peso: '2,0g',
                interpretacao: 'Sensibilidade protetora para a mão diminuída, permanecendo o suficiente para prevenir lesões. Dificuldades com a discriminação de forma e temperatura.',
                codigo: 'Bolinha Roxa',
                url: 'icons/bolinhaRoxa.png'
            },
            {
                peso: '4,0g',
                interpretacao: 'Perda de sensação protetora para a mão, e as vezes, para o pé. Vulnerável a lesões. Perda de discriminação quente/frio.',
                codigo: 'Bolinha Vermelha',
                url: 'icons/bolinhaVermelha.png'
            },
            {
                peso: '10,0g',
                interpretacao: 'Perda de sensação protetora para o pé ainda podendo sentir pressão profunda e dor.',
                codigo: 'Círculo Vermelho com "X"',
                url: 'icons/bolinhaCirculoVermelhoX.png'
            },
            {
                peso: '300g',
                interpretacao: 'Sensibilidade à pressão profunda podendo ainda sentir dor.',
                codigo: 'Círculo Vermelho',
                url: 'icons/bolinhaCirculoVermelho.png'
            },
            {
                peso: 'nenhuma',
                interpretacao: 'Perda de sensibilidade à pressão profunda, normalmente não podendo sentir dor.',
                codigo: 'Bolinha Preta',
                url: 'icons/bolinhaPreta.png'
            },
        ];
        this.codigoTatil = ['Sem sensibilidade', 'Baixo Sensibilidade', 'Media Sensibilidade', 'Sensibilidade Normal', 'Sensibilidade Alta'];
        this.codigoTemperaturaQ = ['Mais Quente', 'Menos Quente', 'Igual'];
        this.codigoTemperaturaF = ['Mais Gelado', 'Menos Gelado', 'Igual'];

        this.segmentos = [
            {
                id: 0,
                value: 'Mancha 1',
                local: 'Bunda',
                classificacaoMonofilamento: '',
                classificacaoMonofilamentoUrl: '',
                classificacaoTatil: '',
                classificacaoTemperaturaQ: '',
                classificacaoTemperaturaF: '',
                somador: 0
            },
            {
                id: 1,
                value: 'Mancha 2',
                local: 'Barriga',
                classificacaoMonofilamento: '',
                classificacaoMonofilamentoUrl: '',
                classificacaoTatil: '',
                classificacaoTemperaturaQ: '',
                classificacaoTemperaturaF: '',
                somador: 0
            },
            {
                id: 2,
                value: 'Mancha 3',
                local: 'Perna',
                classificacaoMonofilamento: '',
                classificacaoMonofilamentoUrl: '',
                classificacaoTatil: '',
                classificacaoTemperaturaQ: '',
                classificacaoTemperaturaF: '',
                somador: 0
            }
        ];
        this.nome = '..';
        this.sexo = '..';
        this.idade = '..';
    }
});