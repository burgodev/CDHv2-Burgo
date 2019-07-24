import Vue from 'vue';
import Vuex from 'vuex';
import ToDoModel from './models/ToDoModel';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: Array<ToDoModel>()
  },

  mutations: {
    addToDo(state, todoModel: ToDoModel) {
      state.todos.push(todoModel);
    }
  },
  actions: {
    addToDo(context, todoModel: ToDoModel) {
      context.commit('addToDo', todoModel);
    }
  }
});


//
// interface State {
//   : number
// }
//
// interface Mutations{
//   set:
// }
//
// interface Options {
//   state: State,
//   mutations: any,
//   actions: any
// }
//
// const options: Options = {
//   state: {
//     : 0
//   },
//
//   mutations: {
//     set(state, ){
//       state. = ;
//     }
//
//     // addToDo(state, todoModel: ToDoModel) {
//     //   state.todos.push(todoModel);
//     // }
//   },
//   actions: {
//     // addToDo(context, todoModel: ToDoModel) {
//     //   return new Promise((resolve, reject) => {
//     //     context.commit('addToDo', todoModel);
//     //     resolve();
//     //   });
//     // }
//   }
// };
//
// export default new Vuex.Store(options);
