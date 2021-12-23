<template>
  <div class="home">
    <div class="header">
      <div class="heager-title">Manager Employees</div>
      <div class="header-btn">
        <button type="button" class="btn btn-danger me-3" @click="deleteAll()">        
          Delete
        </button>
        <router-link
          :to="{ name: 'About', params: { action: 'create' } }"
          type="button"
          class="btn btn-success"
          >Add New Employees
          </router-link>
      </div>
    </div>

    <div class="content">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" @click="checkAll()" v-model="isCheckAll" />
            </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody v-if="employees.length > 0">
          <tr v-for="employee in employees" :key="employee.id">
            <td>
              <input
                type="checkbox"
                :value="employee"
                v-model="selected"
                @change="updateCheckAll()"
              />
            </td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.address }}</td>
            <td>{{ employee.phone }}</td>
            <td>
              <button
                type="button"
                class="btn btn-edit me-3"
                @click="editEmployee(employee, employee.id)"
              >
                <i  btn-warning class="bi bi-pencil-fill"></i>
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
    <!-- <pre>{{ selected }}</pre> -->
    <Pagination
      :totalItem="this.total_item"
      :currentPage="this.$route.query._page"
      :itemsPerPage="this.filter.page_size"
      :pageRange="5"
    />
  </div>
</template>

<script >
// import { mapState } from "vuex";
import Pagination from "@/components/Pagination";
import axios from "axios";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      isCheckAll: false,
      selected: [],
      employees: [],

      //-- Lấy tổng số bản ghi employee
      total_item: 0,

      filter: {
        page_size: 5,
      },
    };
  },

  created() {
    this.getAPI()  
  },
  computed: {
    page() {
      return (
        this.$route.query._page ?? this.$router.replace({ query: { _page: 1 } })
      );
    },
  },
  methods: {
    getAPI() {
      axios
        .get(
          `http://localhost:3000/employee?_page=${this.page}&_limit=${this.filter.page_size}`
        )
        .then((response) => {
          this.employees = response.data;
          this.total_item = Number(response.headers["x-total-count"]);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    deleteEmployee(id) {
      // this.$store.commit("DELETE_EMPLOYEE", index);
      axios
        .delete(`http://localhost:3000/employee/` + id)
        .then(() => {
          this.getAPI();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    editEmployee(employee, id) {
      // this.$store.commit("EDIT_EMPLOYEE", index);
      axios
        .put(`http://localhost:3000/employee/` + id, employee)
        .then(() => {})
        .catch(function () {});

      // --chuyển trang
      this.$router.push({
        name: "About",
        params: { action: "edit", id: id },
      });
    },

    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.selected = [];
      if (this.isCheckAll) {
        this.employees.forEach((el) => {
          this.selected.push(el);
        });
      }
    },
    updateCheckAll() {
      if (this.selected.length == this.employees.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
    },

    deleteAll() {
      if (this.selected.length >= 1) {
        for (let i = 0; i < this.selected.length; i++) {
          this.deleteEmployee(this.selected[i].id);
        }
      }
    },
  },
  mounted() {
    this.getAPI();
  },
};
</script>

<style scoped>
.home{
  box-shadow: 1px 1px 4px #ccc;
  margin: 10px 20px 0 20px;
}
th{
  text-align: center;
}
td{
  text-align: center;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: rgb(53, 80, 168);
  padding: 10px 0;
}
.heager-title {
  font-size: 2.4rem;
  font-weight: bold;
  color: #fff;
}
input[type="checkbox"] {
  width: 20px;
  height: 20px;
}
.btn {
  font-size: 1.8rem;
}
.btn-edit{
  color: #ffc107;
  transition: .2s ease;
}
.btn-delete {
  margin-right: 10px;
  color: #dc3545;
  transition: .2s ease;
}
.btn-edit:hover,
.btn-delete:hover{
  transform: scale(1.2);
}
.btn-danger {
  margin-right: 10px;
}
.content {
  font-size: 1.6rem;
}
/* .btn-warning{
        margin-right: 8px;
    } */
</style>