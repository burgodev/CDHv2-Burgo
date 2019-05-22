<template>
  <v-container fluid fill-height>
    <v-layout wrap justify-center align-start>
      <v-flex xs10 sm10 md10>
        <v-toolbar flat>
          <v-icon class="custom-btn mr-3 grey--text">access_time</v-icon>
          <h3 class="custom-btn font-weight-light.font-italic mr-2 grey--text "> {{selectUser}} </h3>
          <h3 class="custom-btn font-weight-light.font-italic grey--text"> - {{workTimeLeft}} horas restantes </h3>

          <v-spacer></v-spacer>

          <v-flex md2 mr-2 >
            <v-select
              v-model="selectedMonth"
              :items="month"
              placeholder="Mês"
            ></v-select>
          </v-flex>

          <v-flex md1>
            <v-select
              class="custom-btn"
              v-model="selectedYear"
              :items="year"
              placeholder="Ano"
            ></v-select>
          </v-flex>

          <v-flex xs2 sm2 md2 d-flex>
            <v-layout justify-end align-center>
              <v-layout justify-end>

                <v-btn class="custom-btn grey--text" icon fab round @click="userCdhSearch">
                  <v-icon class="custom-btn">search</v-icon>
                </v-btn>

              </v-layout>
              <v-divider
                class="mx-1"
                vertical
                inset
              ></v-divider>


              <v-layout wrap>
                <v-tooltip color="primary" bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn round outline small :color="sessionButton" class="custom-btn" @click="sessionControl"
                           v-on="on">
                      <v-icon class="custom-btn">power_settings_new</v-icon>
                    </v-btn>
                  </template>
                  <span> Iniciar/Finalizar Sessão </span>
                </v-tooltip>
              </v-layout>

            </v-layout>
          </v-flex>


        </v-toolbar>

        <v-data-table
          :headers="headers"
          :items="timeRegister"
          class="elevation-1"

        >
          <template v-slot:items="props">

            <td class="text-xs-center">{{ props.item.day }}</td>
            <td class="text-xs-center">{{ props.item.entry }}</td>
            <td class="text-xs-center">{{ props.item.exit }}</td>
            <td class="text-xs-center">{{ props.item.timeWorked }}</td>
            <td class="justify-center layout px-0">
              <v-icon
                small
                class="custom-btn"
                @click="showJustifyAbsence(props.item)"
              >
                search
              </v-icon>
            </td>
          </template>

          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
        </v-data-table>

        <JustifyAbsence ref="JustifyAbsence"/>
        <ExpectedExit ref="ExpectedExit"/>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import JustifyAbsence from "../components/JustifyAbsence";
  import ExpectedExit from "../components/ExpectedExit";
  import {
    UserAPI
  } from '../requests';


  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  export default {
    name: "UserCDH",
    components: {ExpectedExit, JustifyAbsence},

    data: () => ({
      selectUser: '',
      selectedMonth: null,
      selectedYear: null,
      selected: false,
      workTimeLeft: 20,
      headers: [

        {text: 'Dia', value: 'day', align: 'center'},
        {text: 'Entrada', value: 'entry', align: 'center'},
        {text: 'Saída', value: 'exit', align: 'center'},
        {text: 'Horas Trabalhadas', value: 'timeWorked', align: 'center'},
        {text: 'Justificativa', sortable: false, align: 'center'},


      ],
      timeRegister: [],
      user: [],
      month: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      year: []

    }),


    mounted() {
      this.initialize()
    },


    computed: {
      sessionButton() {
        if (this.selected) return 'primary';
      },
    },

    methods: {
      async initialize() {
        this.userCdhSearch();
        this.getUser();
        this.getCdhYears();

        this.selectUser = localStorage.getItem('name');
        console.log(this.selectUser);

        if (localStorage.getItem('sessionOpen') == "true") {
          this.selected = true;
        }
      },


      showJustifyAbsence() {
        this.$refs.JustifyAbsence.open()
      },

      async sessionControl() {
        this.selected = !this.selected;
        let id = await localStorage.getItem('id');

        if (this.selected) {
          this.$refs.ExpectedExit.open(this.initialize.bind(this));
          localStorage.setItem("sessionOpen", "true");
        } else {
          let ret = await UserAPI.exit(id);
          localStorage.setItem("sessionOpen", "false");
          console.log('exit', ret);
        }

        this.initialize();
      },

      async userCdhSearch() {
        let date = new Date();
        let month, year;

        if (this.selectedMonth) {
          month = this.getCdhMonths();
        } else {
          month = date.getMonth();
        }

        if (this.selectedYear) {
          year = this.selectedYear
        } else {
          year = date.getFullYear();
        }

        let id = localStorage.getItem('id');
        let ret = await UserAPI.userCdhConsult(id, month, year);
        console.log('userCdhConsult', ret);

        let workTimeLeft = new Date();


        if (ret.data.length!=0) {
          workTimeLeft.setTime(ret.data[0].workTimeLeft);

        } else {
          workTimeLeft.setHours(20);

        }


        //Alimenta a table
        let cdh = [];
        if (ret.data.length) {
          let myDate = new Date();

          //percorre cada sessao dentro de cada dia
          for (let i = 0; i < ret.data[0].days.length; i++) {
            for (let x = 0; x < ret.data[0].days[0].entryExit.length; x++) {
              myDate.setTime(ret.data[0].days[0].entryExit[x].entry);
              let formatedEntry = `${addZero(myDate.getHours())}:${addZero(myDate.getMinutes())}:${addZero(myDate.getSeconds())}`;
              myDate.setTime(ret.data[0].days[0].entryExit[x].exit);
              let formatedExit = `${addZero(myDate.getHours())}:${addZero(myDate.getMinutes())}:${addZero(myDate.getSeconds())}`;

              if (formatedExit == "NaN:NaN:NaN")
                formatedExit = "";

              cdh.push({
                day: ret.data[0].days[0].day,
                entry: formatedEntry,
                exit: formatedExit,
                timeWorked: ret.data[0].days[0].timeWorked
              });
            }
          }
        }
        this.timeRegister = cdh;
      },

      getUser() {
        let user = [];
        user.push(localStorage.getItem('name'));

        this.user = user;

      },

      getCdhYears() {
        let myDate = new Date();
        let year = myDate.getFullYear();

        for (let i = 0; i < 5; i++) {
          this.year.push(year);

          year -= 1;
        }
      },

      getCdhMonths() {

        switch (this.selectedMonth) {
          case 'Janeiro':
            return 0;
          case 'Fevereiro':
            return 1;
          case 'Março':
            return 2;
          case 'Abril':
            return 3;
          case 'Maio':
            return 4;
          case 'Junho':
            return 5;
          case 'Julho':
            return 6;
          case 'Agosto':
            return 7;
          case 'Setembro':
            return 8;
          case 'Outubro':
            return 9;
          case 'Novembro':
            return 10;
          case 'Dezembro':
            return 11;

        }
      },


    }
  }

</script>

<style scoped>

</style>
