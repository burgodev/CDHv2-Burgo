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


          <v-flex xs4 sm4 md4 d-flex>
            <v-select
              class="mt-3"
              v-model="selectUser"
              disabled
              return-object
              :items="users"
              label="Usuário"
              item-text="name"
              item-value="id"
            ></v-select>
          </v-flex>


          <v-spacer></v-spacer>

          <v-flex xs2 sm2 md2 d-flex>
            <v-select
              class="mt-3"
              v-model="selectedMonth"
              return-object
              :items="month"
              item-text="Text"
              item-value="Number"
              @change="userCdhSearch"
              label="Mês"
            ></v-select>
          </v-flex>

          <v-spacer></v-spacer>

          <v-flex xs2 sm2 md2 d-flex class="mr-3">
            <v-select
              class="mt-3"
              :items="year"
              v-model="selectedYear"
              @change="userCdhSearch"
              label="Ano"
            ></v-select>
          </v-flex>


          <v-divider
            class="mx-4"
            vertical
            inset
          ></v-divider>


          <v-tooltip color="primary" bottom>
            <template v-slot:activator="{ on }">
              <v-btn round outline small :color="sessionButton" class="custom-btn mt-3" @click="sessionControl"
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
    UserAPI,
    AdminAPI
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
      selectUser: 'teste',
      selectedMonth: null,
      selectedYear: null,
      selected: false,
      workTimeLeft: 0,
      headers: [

        {text: 'Dia', value: 'day', align: 'center'},
        {text: 'Entrada', value: 'entry', align: 'center'},
        {text: 'Saída', value: 'exit', align: 'center'},
        {text: 'Horas Trabalhadas', value: 'timeWorked', align: 'center'},
        {text: 'Justificativa', sortable: false, align: 'center'},


      ],
      timeRegister: [],
      users: [],
      month: [
        {
          Text: 'Janeiro',
          Value: 0
        },
        {
          Text: 'Fevereiro',
          Value: 1
        },
        {
          Text: 'Março',
          Value: 2
        },
        {
          Text: 'Abril',
          Value: 3
        },
        {
          Text: 'Maio',
          Value: 4
        },
        {
          Text: 'Junho',
          Value: 5
        },
        {
          Text: 'Julho',
          Value: 6
        },
        {
          Text: 'Agosto',
          Value: 7
        },
        {
          Text: 'Setembro',
          Value: 8
        },
        {
          Text: 'Outubro',
          Value: 9
        },
        {
          Text: 'Novembro',
          Value: 10
        },

        {
          Text: 'Dezembro',
          Value: 11
        },
      ],

      year: []

    }),


    mounted() {
      this.initialize()
    },


    computed: {
      sessionButton() {
        let myDate = new Date();

        if (this.selected) return 'primary';

        if (localStorage.getItem('sessionOpen') === "true" && Number(sessionStorage.getItem('lastDay')) === myDate.getDate()) {
          return 'primary';
        }
      }
    },

    methods: {
      async initialize() {
        let myDate = new Date();
        this.selectedMonth = this.month[myDate.getMonth()];

        this.users = [{
          name: localStorage.getItem('name'),
          id: localStorage.getItem('id')
        }];

        this.selectUser = this.users[0];

        this.userCdhSearch();
        this.getCdhYears();

        this.selectedYear = myDate.getFullYear();

        if (localStorage.getItem('sessionOpen') === "true" && Number(sessionStorage.getItem('lastDay')) === myDate.getDate()) {
          this.selected = true
        } else {
          this.selected = false;
          sessionStorage.setItem('lastDay', String(myDate.getDate()));
        }
      },

      hasJustification(data) {
        if (!data.justification) {
          return true;
        }
      },


      showJustifyAbsenceUser(data) {
        if (data.justification) {
          this.$refs.JustifyAbsenceUser.open(data)
        }
      },

      async sessionControl() {
        if (!this.selected) {
          this.$refs.ExpectedExit.open(this.initialize.bind(this));
        } else {
          this.$refs.EndSessionConfirmation.open(this.initialize.bind(this));
        }
      },

      async userCdhSearch() {
        let date = new Date();
        let month, year;
        let id;
        month = this.selectedMonth.Value;

        if (this.selectedYear) {
          year = this.selectedYear
        } else {
          year = date.getFullYear();
        }

        localStorage.setItem('month', month);
        localStorage.setItem('year', year);

        if (!this.selectUser) {
          id = localStorage.getItem('id');
        } else {
          id = this.selectUser.id;
        };


        let ret = await UserAPI.userCdhConsult(id, month, year);
        console.log('userCdhConsult', ret);


        this.$emit('coco');



        //Alimenta a table
        let cdh = [];
        if (ret.data.length) {
          let myDate = new Date();
          let myDate2 = new Date();
          let myDate3 = new Date();

          //percorre cada sessao dentro de cada dia
          for (let i = 0; i < ret.data[0].days.length; i++) {
            for (let x = 0; x < ret.data[0].days[i].entryExit.length; x++) {
              myDate.setTime(ret.data[0].days[i].entryExit[x].entry);
              let formatedEntry = `${addZero(myDate.getHours())}:${addZero(myDate.getMinutes())}`;

              myDate2.setTime(ret.data[0].days[i].entryExit[x].exit);
              let formatedExit = `${addZero(myDate2.getHours())}:${addZero(myDate2.getMinutes())}`;

              myDate3.setTime(Number(myDate2.getTime()) - Number(myDate.getTime()));
              let formatedTimeWorked = `${addZero(myDate3.getMinutes())}`;
              let h = 0;
              while (formatedTimeWorked > 60) {
                formatedTimeWorked - 60;
                h++;
              }


              formatedTimeWorked = `${addZero(h)} : ${formatedTimeWorked}`;


              if (formatedExit == "NaN:NaN")
                formatedExit = "";

              if (formatedTimeWorked == "00 : NaN")
                formatedTimeWorked = "";

              if (formatedTimeWorked == "NaN:NaN")
                formatedTimeWorked = "";


              // if(!localStorage.getItem('workTimeLeft')){
              //   localStorage.setItem('workTimeLeft', ret.data[0].workTimeLeft);
              // }

              cdh.push({
                day: ret.data[0].days[i].day,
                entry: formatedEntry,
                exit: formatedExit,
                timeWorked: formatedTimeWorked,
                justification: ret.data[0].days[i].justification
              });
            }
          }
        }
        this.timeRegister = cdh;
      },

      getCdhYears() {
        let myDate = new Date();
        let year = myDate.getFullYear();

        for (let i = 0; i < 5; i++) {
          this.year.push(year);

          year -= 1;
        }
      },
    }
  }

</script>

<style scoped>

</style>
