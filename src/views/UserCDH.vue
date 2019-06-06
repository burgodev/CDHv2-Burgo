<template>
  <v-container fluid fill-height>
    <v-layout wrap justify-center align-start>
      <v-flex xs10 sm10 md10>
        <v-toolbar flat>

          <v-toolbar-title
            class="primary--text custom-btn"
            margin-left="10px">
            <v-icon
              class="custom-btn primary--text">
              access_time
            </v-icon>
            CDH
          </v-toolbar-title>

          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

          <h3 class="font-weight-light.font-italic mr-2 white--text"> {{selectUser}} </h3>
          <h3 class="font-weight-light.font-italic white--text"> - {{workTimeLeft}} horas restantes </h3>

          <v-spacer></v-spacer>


          <v-layout wrap justify-end>
            <v-flex md4 mr-2>
              <v-select
                v-model="selectedMonth"
                :items="month"
                @change="userCdhSearch"
                placeholder="Mês"
                class="custom-btn "
                dark
              ></v-select>
            </v-flex>

            <v-flex md4>
              <v-select
                class="custom-btn primary--text"
                v-model="selectedYear"
                :items="year"
                @change="userCdhSearch"
                placeholder="Ano"
                dark
              ></v-select>
            </v-flex>
          </v-layout>


          <v-divider
            class="mx-4"
            vertical
            inset
          ></v-divider>


          <v-tooltip color="primary" bottom>
            <template v-slot:activator="{ on }">
              <v-btn round outline small :color="sessionButton" class="custom-btn" @click="sessionControl"
                     v-on="on">
                <v-icon class="custom-btn">power_settings_new</v-icon>
              </v-btn>
            </template>
            <span class="black--text"> Iniciar/Finalizar Sessão </span>
          </v-tooltip>


        </v-toolbar>

        <v-data-table
          :headers="headers"
          :items="timeRegister"
          class="elevation-1"
          dark

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
                @click="showJustifyAbsenceUser(props.item)"
                :disabled="hasJustification(props.item)"
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

        <JustifyAbsenceUser ref="JustifyAbsenceUser"/>
        <ExpectedExit ref="ExpectedExit"/>
        <EndSessionConfirmation ref="EndSessionConfirmation"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import JustifyAbsenceUser from "../components/JustifyAbsenceUser";
  import ExpectedExit from "../components/ExpectedExit";
  import EndSessionConfirmation from "../components/EndSessionConfirmation";
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
    components: {ExpectedExit, JustifyAbsenceUser, EndSessionConfirmation},

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
      }

    },

    methods: {
      async initialize() {
        let myDate = new Date();

        this.userCdhSearch();
        this.getUser();
        this.getCdhYears();


        if (localStorage.getItem('sessionOpen') === "true" && Number(sessionStorage.getItem('lastDay')) === myDate.getDate()) {
          this.selected = true
        } else {
          this.selected = false;
          sessionStorage.setItem('lastDay', String(myDate.getDate()));
        }

      },

      hasJustification(data) {
        console.log(data.justification);

        if (data.justification) {
          console.log('entrou no if')
          return false;
        }


      },


      showJustifyAbsenceUser(data) {
        console.log('caiu no showJustify', data);

        if (data.justification) {
          this.$refs.JustifyAbsenceUser.open(data)
        }


      },

      async sessionControl() {
        // this.selected = !this.selected;
        // let id = await localStorage.getItem('id');
        //
        // if (this.selected) {
        //   this.$refs.ExpectedExit.open(this.initialize.bind(this));
        //   localStorage.setItem("sessionOpen", "true");
        // } else {
        //   let ret = await UserAPI.exit(id);
        //   localStorage.setItem("sessionOpen", "false");
        //   console.log('exit', ret);

        if (!this.selected) {
          this.$refs.ExpectedExit.open(this.initialize.bind(this));
          localStorage.setItem("sessionOpen", "true");
        } else {
          this.$refs.EndSessionConfirmation.open(this.initialize.bind(this));
        }

        // this.initialize();
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

        if (ret.data.length != 0) {
          workTimeLeft.setTime(ret.data[0].workTimeLeft);

        } else {
          workTimeLeft.setHours(80);

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
                timeWorked: ret.data[0].days[0].timeWorked,
                justification: ret.data[0].days[0].justification
              });
            }
          }
        }
        this.timeRegister = cdh;


        // if (localStorage.getItem('sessionOpen') == "true") {
        //   this.selected = true;
        // }
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
