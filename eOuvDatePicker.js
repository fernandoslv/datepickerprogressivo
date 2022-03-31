const DatePickerES = {
    name: 'DatePickerES',
    template: `<div class="col-md-12 position-relative mb-3">
                    <label class="form-label" for="flTextoDespacho">{{label}}</label>                    
                    <input v-if="required" required v-on:blur="GetDate" v-bind:id="id" type="text" v-model="dataSelecionada" class="form-control mb-0"/>
                    <input v-else v-on:blur="GetDate" v-bind:id="id" type="text" v-model="dataSelecionada" class="form-control mb-0"/>
                    <div class="invalid-feedback mt-1">{{mensagemerro}}</div>
                </div>`,
    emits: ['data-alterada'],
    props: ['id', 'label', 'inicio', 'fim', 'diasdesabilitados', 'required', 'mensagemerro'],
    data() {
        return {
            dataSelecionada: null,
            arrayDiasDesabilitados: []
        }
    },
    mounted() {
        this.ConfigurarDiasDesabilitados();
        this.CriarDatePicker(document.getElementById(this.id));
    },
    methods: {
        ConfigurarDiasDesabilitados() {
            console.log(this.diasdesabilitados);
            if (this.diasdesabilitados != undefined) {
                let arrayDias = this.diasdesabilitados.split(',');

                for (let i = 0; i < arrayDias.length; i++) {
                    this.arrayDiasDesabilitados.push(parseInt(arrayDias[i]));
                }
            }
        },

        GetDate(e) {
            this.dataSelecionada = e.target.value;            
            this.$emit('data-alterada', this.dataSelecionada);
        },

        CriarDatePicker(el) {
            return new Datepicker(el, {
                clearBtn: true,
                todayBtn: true,
                todayHighlight: true,
                daysOfWeekDisabled: this.arrayDiasDesabilitados,
                maxDate: this.fim,
                minDate: this.inicio,
                format: 'dd/mm/yyyy',
                language: 'pt-BR'
            });
        },

    }
}