<template>
  <div class="home">
    <div class="header">
      <div class="heager-title">Manager Employees</div>
      <div class="header-btn">
        <button type="button" class="btn btn-danger"
          @click="deleteAll()"
        >
        Delete</button>
        <router-link
          :to="{ name: 'About', params: { action: 'create' } }"
          type="button"
          class="btn btn-success"
          >Add New Employees</router-link
        >
      </div>
    </div>

    <div class="content">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" 
              @click="checkAll()" 
              v-model="isCheckAll" >
            </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody v-if="employees.length > 0">
          <tr v-for="(employee, index) in employees" :key="index">
            <td>
              <input type="checkbox" 
              :value="employee" 
              v-model="selected"               
              @change="updateCheck()"
              />
            </td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.address }}</td>
            <td>{{ employee.phone }}</td>
            <td>
              <button
                type="button"
                class="btn btn-edit me-2"
                @click="editEmployee(employee,employee.id)"
              >
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button
                type="button"
                class="btn btn-delete"
                @click="deleteEmployee(employee.id)"
              >
                <i class="bi bi-trash-fill"></i>
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6">No employee in table</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <v-pagination
    v-model="page"
    :pages="5"
    :range-size="1"
    active-color="#DCEDFF"
    @update:modelValue="updateHandler"
    />
    <pre>{{ selected }}</pre>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import axios from 'axios';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {  
  // computed: {
  //   ...mapState(["employees"]),
  // },
  components: {
    VPagination
  },
    data(){
      return{
        isCheckAll:false,
        selected:[],
        employees:{
          id:"",
          name:"",
          email:"",
          address:"",
          phone:"",
        },
        page:1
      }
    },
    
  methods: {
    getAPI(){
      axios.get(`https://61bac447e943920017784a01.mockapi.io/employee`)
      .then(response => {
            this.employees = response.data
          })
          .catch(e => {
            this.errors.push(e)
          })          
    },
    deleteEmployee(id) {
      // // this.$store.commit("DELETE_EMPLOYEE", index);
      axios.delete(`https://61bac447e943920017784a01.mockapi.io/employee/` + id)
      .then(() => {
        this.getAPI()
      })
      .catch(e => {
        this.errors.push(e)})
    },

    editEmployee(employee,id) {
      // this.$store.commit("EDIT_EMPLOYEE", index);
        axios.put(`https://61bac447e943920017784a01.mockapi.io/employee/` + id, employee)
             .then(() => {
             })
             .catch(function (error) {
                console.log(error.response)
             })

      // --chuyển trang
      this.$router.push({
        name: "About",
        params: { action: "edit", id:id},
      });
    },

    deleteAll(){
      if (this.selected.length>=1) { 
        for (let i = 0 ; i<this.selected.length; i++) {
          this.deleteEmployee(this.selected[i].id)  
        }       
      }
    },

    checkAll(){
      this.isCheckAll = !this.isCheckAll
      this.selected=[]
      if (this.isCheckAll) {      
        this.employees.forEach(element => {
          this.selected.push(element);
        });   
      } 
    },
    updateCheck(){     
      if (this.selected.length == this.employees.length) {
        this.isCheckAll=true
      }else{
        this.isCheckAll=false
      }
    },
      // remove(id){
      //   this.$store.commit("REMOVE", id);
      // },
    
  },

  mounted(){
    this.getAPI()
  }
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: rgb(53, 80, 168);
  padding: 10px 0;
}
.heager-title {
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
}
input[type='checkbox']
{
  width: 20px;
  height: 20px;
  margin-left: 40px;
}
.btn {
  font-size: 1.6rem;
  padding: 0 10px;
}
.btn-danger {
  margin-right: 10px;
}
.btn-edit{
  color: #ffc107;
  transition: .2s linear;
}
.btn-delete{
  color: red;
  transition: .2s linear;
}
.btn-edit:hover,.btn-delete:hover{
  transform: scale(1.2);
}
.content {
  font-size: 1.6rem;
}
.red{
  background-color: red;
}
.blue{
  background-color: blue;
}

</style>