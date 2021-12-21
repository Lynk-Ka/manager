<template>
  <div class="about">
      <router-link to="/">Home</router-link> |
    <form class="ms-4" @submit.prevent="add()">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="employ.name"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email </label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="employ.email"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Address</label>
        <input
          type="text"
          class="form-control"
          id="adress"
          v-model="employ.address"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Phone</label>
        <input
          type="Text"
          class="form-control"
          id="phone"
          v-model="employ.phone"
        />
      </div>
      <pre>{{ employ }}</pre>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>
<script>

import axios from 'axios';

export default {
  data() {
    return {
      employ: {
        id: '',
        name: "",
        email: "",
        address: "",
        phone: "",
      },
     
    };
  },

  //-- Khi component được khởi tạo
  created() {
    const id = this.$route.params.id
    if (this.$route.params.action == "edit") {
      axios.get(`https://61bac447e943920017784a01.mockapi.io/employee/${id}`)
      .then(res => this.employ=res.data)
    }
  },

  methods: {
    // actionEmployee() {
    //   if (this.$route.params.action == "create") {
    //     this.$store.commit("ADD_EMPLOYEE", this.employ);
    //   } else {
    //     this.employees.splice(this.index, 1, this.employ);
    //   }
    //   this.$router.push({
    //     name: "Home",
    //   });
    // },
      
    // },
    add(){
      if (this.$route.params.action == "create") {
        axios.post(`https://61bac447e943920017784a01.mockapi.io/employee`,  this.employ)
          .then(() => {
            this.$router.push({
                name: "Home"
              })
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
      else{
        axios.put(`https://61bac447e943920017784a01.mockapi.io/employee/`+this.employ.id, this.employ)
          .then(() => {
            this.$router.push({
                name: "Home"
              })
          })
          .catch(e => {
            this.errors.push(e)
          })
      }

      
    }

        
  },
};
</script>