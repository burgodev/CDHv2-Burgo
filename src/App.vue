<template>
  <v-app id="app2" dark >

    <v-toolbar app fixed clipped-left v-if="isLogged" dark>


      <v-spacer/>
      <v-toolbar-title class="white--text ml-5"></v-toolbar-title>
      <v-spacer/>

      <v-tooltip color="primary" bottom>
        <template v-slot:activator="{ on }">
          <v-btn :color="selectedButtonCdh" v-on:click="showCdh" v-if="isAdm" v-on="on" round outline small class="custom-btn">
            <v-icon class="custom-btn">view_list</v-icon>
          </v-btn>
        </template>
        <span class="black--text"> CDH </span>
      </v-tooltip>

      <v-tooltip color="primary" bottom>
        <template v-slot:activator="{ on }">
          <v-btn :color="selectedButtonUser" v-on:click="showUsers" v-if="isAdm" v-on="on" round outline small class="custom-btn ">
            <v-icon class="custom-btn">people</v-icon>
          </v-btn>
        </template>
        <span class="black--text"> Usuários </span>
      </v-tooltip>

      <!--<v-btn v-on:click="logout" class="custom-btn" outline  round small text>-->
      <!--<v-icon class="custom-btn">logout</v-icon>-->
      <!--</v-btn>-->


      <v-tooltip color="primary" bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on:click="logout" v-on="on" round outline small class="custom-btn">
            <v-icon class="custom-btn">logout</v-icon>
          </v-btn>
        </template>
        <span class="black--text"> Sair </span>
      </v-tooltip>

    </v-toolbar>


    <v-content class="timeRegister-color" >
      <router-view/>
    </v-content>


    <v-footer app fixed dark >
      <span>&copy; 2019</span>


    </v-footer>


  </v-app>
</template>


<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {
    UserAPI,
  } from './requests';

  @Component({
    components: {},
  })

  export default {
    name: 'AppBurgo',
    data: () => ({
      selectedButtonColorCdh: false,
      selectedButtonColorUser: false
    }),

    computed: {
      selectedButtonCdh() {
        if (this.selectedButtonColorCdh) return 'primary';
      },

      selectedButtonUser() {
        if (this.selectedButtonColorUser) return 'primary';

      },

      isAdm(){
        this.selectedButtonColorCdh = true;
        return localStorage.getItem('isAdm') === 'true';

      },

      isLogged(){
        return this.$route.path !== '/login'
      }
    },


    methods: {

      async logout() {
        let ret = await UserAPI.logout();
        console.log('logout', ret);
        // localStorage.setItem('isAdm', 'false');

        // localStorage.setItem('isLogged', 'false');

        this.$router.replace('/login');
        this.selectedButtonColorCdh = false;
        this.selectedButtonColorUser = false;
      },

      showUsers() {
        this.$router.replace('/Users');
        this.selectedButtonColorUser = !this.selectedButtonColorUser;
        this.selectedButtonColorCdh = false;
      },

      showCdh() {
        this.$router.replace('/AdminCDH');
        this.selectedButtonColorCdh = !this.selectedButtonColorCdh;
        this.selectedButtonColorUser = false;

      },

      changeColor() {

      }
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

  /*!*333333*!*/
  /*.timeRegister-color {*/
    /*background-image: radial-gradient(#5a5a5a, #212121);*/
  /*}*/

  .timeRegister-color {
    background-image: radial-gradient(rgba(99, 99, 99, 0.82), #0c0c0c);
  }

  /*.timeRegister-color {*/
    /*background-image: radial-gradient(rgba(130, 130, 130, 0.82), #171717);*/
  /*}*/



  .custom-btn:hover {
    color: #ffd02d !important;
    /*color: #3abcb1 !important;*/

  }


</style>
