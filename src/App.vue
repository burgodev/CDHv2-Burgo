<template>
  <v-app id="app2" dark>

    <v-toolbar
      app fixed clipped-left v-if="isLogged" dark>

      <v-toolbar-title class="white--text" v-text="toolbarTitle"></v-toolbar-title>

      <v-layout wrap justify-end>
        <v-spacer></v-spacer>
        <v-tooltip color="primary" bottom>
          <template v-slot:activator="{ on }">
            <v-btn :color="selectedButtonCdh" v-on:click="showCdh" v-if="isAdm" v-on="on" round outline small
                   class="custom-btn">
              <v-icon class="custom-btn">view_list</v-icon>
            </v-btn>
          </template>
          <span class="black--text"> CDH </span>
        </v-tooltip>

        <v-tooltip color="primary" bottom>
          <template v-slot:activator="{ on }">
            <v-btn :color="selectedButtonUser" v-on:click="showUsers" v-if="isAdm==='true'" v-on="on" round outline
                   small
                   class="custom-btn ">
              <v-icon class="custom-btn">people</v-icon>
            </v-btn>
          </template>
          <span class="black--text"> Usuários </span>
        </v-tooltip>

        <v-tooltip color="primary" bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on:click="logout" v-on="on" round outline small class="custom-btn">
              <v-icon class="custom-btn">logout</v-icon>
            </v-btn>
          </template>
          <span class="black--text"> Sair </span>
        </v-tooltip>
      </v-layout>
    </v-toolbar>

    <v-content class="timeRegister-color">
      <router-view/>
    </v-content>

    <v-footer app fixed dark>
      <span>&copy; 2019 by BurgoDev</span>

    </v-footer>
  </v-app>
</template>


<script lang="ts">
  import { State, Action, Getter } from 'vuex-class';
  import {Component, Vue} from 'vue-property-decorator';
  import {
    UserAPI,
  } from './requests';


  function addZero(i) {

    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  @Component({
    components: {},
  })

  export default {
    name: 'AppBurgo',

    data: () => ({
      selectedButtonColorCdh: false,
      selectedButtonColorUser: false,
      titleName: '',
      titleHoursLeft: '',

      get isAdm() {
        return localStorage.getItem('isAdm');
      },

      get () {
        return localStorage.getItem('');
      }
    }),

    computed: {
      selectedButtonCdh() {
        if (this.selectedButtonColorCdh) return 'primary';

        if (this.$route.path === '/AdminCDH')
          return 'primary';
      },

      selectedButtonUser() {
        if (this.selectedButtonColorUser) return 'primary';

        if (this.$route.path === '/Users')
          return 'primary';
      },

      isLogged() {
        return this.$route.path !== '/'
      },
      // () {
      //   return localStorage.getItem('');
      // }


      toolbarTitle(){
        this.titleName = localStorage.getItem('name');
        let hoursLeft = Number(localStorage.getItem('workTimeLeft'));
        let myDate = new Date();
        let hours, days;

        myDate.setTime(hoursLeft);

        if (myDate.getTime() > 97199999){
          hours = myDate.getHours() + 3;
          console.log(hours)
          days = myDate.getDate();

          hours = (24 * (days -1)) + hours;

          this.titleHoursLeft = `${(addZero(hours))}:${addZero(myDate.getMinutes())}`;

          return `${this.titleName}  - ${this.titleHoursLeft} horas restantes` ;
        }

        else {
          return `${this.titleName}  - 0 horas restantes` ;
        }
      }
    },

    methods: {
      async logout() {
        let ret = await UserAPI.logout();

        this.selectedButtonColorCdh = true;
        this.selectedButtonColorUser = false;
        this.$router.replace('/');
      },

      showUsers() {
        this.selectedButtonColorCdh = false;
        this.selectedButtonColorUser = true;
        this.$router.replace('/Users');
      },

      showCdh() {
        this.selectedButtonColorCdh = true;
        this.selectedButtonColorUser = false;
        this.$router.replace('/AdminCDH');
      },

    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #e900ff;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .timeRegister-color {
    background-image: radial-gradient(rgba(99, 99, 99, 0.82), #0c0c0c);
  }


  .custom-btn:hover {
    color: #ffd02d !important;
  }


</style>
