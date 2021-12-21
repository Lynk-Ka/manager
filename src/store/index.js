import { createStore } from "vuex";

export default createStore({
  state: {
    // employees: [
    //   {id:'', name: '', email: '', address: '', phone: '' }
    //   // {id:1, name: 'John', email: 'john@example.com', address: 'Hanoi', phone: '123456789' },
    //   // {id:2, name: 'Mark', email: 'mark@example.com', address: 'Danang', phone: '987654321' }
    // ],
    employee: {

    },
    index: null
  },
  mutations: {
    ADD_EMPLOYEE(state, data) {
      state.employees.push(data);
    },
    DELETE_EMPLOYEE(state, data) {
      state.employees.forEach(el=>{
        if(data==el.id){
          state.employees.splice(el, 1)
        }
      })
    },
    EDIT_EMPLOYEE(state, data) {
      state.employee = state.employees[data]
      state.index = data
    },

    REMOVE(state,data){
      for(let i=0;i<state.employees.length;i++){
        if (data==state.employees[i].id) {
          state.employees.splice(i,1)
        }
      }
    }
  },
  actions: {  },
  modules: {},
});
