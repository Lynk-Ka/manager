<template>
  <div class="about">
    <router-link to="/">Home</router-link> |
    <form class="ms-4" @submit.prevent="add()">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Name</label>
        <input
          required
          type="text"
          class="form-control"
          id="name"
          v-model="employ.name"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email </label>
        <input
          required
          type="email"
          class="form-control"
          id="email"
          v-model="employ.email"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Address</label>
        <input
          required
          type="text"
          class="form-control"
          id="adress"
          v-model="employ.address"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Phone</label>
        <input
          required
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
// import { mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      employ: {
        name: "",
        email: "",
        address: "",
        phone: "",
        id: "",
      },
    };
  },

  //-- Khi component được khởi tạo
  created() {
    const id = this.$route.params.id
    if (this.$route.params.action == "edit") {
      axios.get(`http://localhost:3000/employee/${id}`)
      .then(res => this.employ=res.data)
    }
  },

  // computed: {
  //   ...mapState(["employee", "employees", "index"]),
  // },

  methods: {
    //-- import { mapState } from "vuex";
    // createEmployee() {
    //     console.log("this.employ: ", this.employ);

    //   const apiClient = axios.create({
    //     baseURL: "https://61bf4956b25c3a00173f4d95.mockapi.io",
    //     // withCredentials: false,
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   apiClient
    //     .post("/employ", this.employ)
    //     .then((response) => {
    //       console.log("response:", response);
    //     })
    //     .catch((e) => {
    //       console.log("e:", e);
    //     });
    // },
    add(){
      if (this.$route.params.action == "create") {
        axios.post(`http://localhost:3000/employee`,  this.employ)
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
        axios.put(`http://localhost:3000/employee/`+this.employ.id, this.employ)
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