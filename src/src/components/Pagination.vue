<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" @click="first()">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">First</span>
          </a>
        </li>
        <li class="page-item" @click="pre()">
          <a
            class="page-link"
            href="#"
            :class="this.currentPage <= 1 && 'hide'"
          >
            <i class="bi bi-arrow-left-short"></i>
          </a>
        </li>
        <li
          class="page-item"
          v-for="(page, index) in caculatePagination()"
          :class="{ active: this.$route.query._page == page }"
          :key="index"
          @click="changePage(page)"
        >
          <a class="page-link" href="#">{{ page }}</a>
        </li>
        <li class="page-item" @click="next()">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            :class="this.currentPage >= this.totalPage && 'hide'"
          >
            <i class="bi bi-arrow-right-short"></i>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" @click="last()">
            <span aria-hidden="true">Last</span>
          </a>
        </li>
        <button @click="check()">check</button>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    totalItem: {
      type: Number,
      default: 100,
      // required: true
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    itemsPerPage: {
      type: Number,
      default: 5,
    },
    pageRange: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      totalPage: 0,
    };
  },
  computed:{
    
  },
  methods: {
    caculatePagination() {
      let totalPage = Math.ceil(this.totalItem / this.itemsPerPage);
      this.totalPage = totalPage;
      
      let middle = Math.ceil(this.pageRange / 2);

      let min = this.currentPage - middle + 1;
      let max = min + this.pageRange - 1;

      if (min < 1) {
        min = 1;
        max = this.pageRange;
      }

      if (max >= totalPage) {
        max = totalPage;
        min = max - this.pageRange + 1;
        if (min < 1) min = 1;
      }

      // if (parseInt(this.$route.query._page) > totalPage) {
      //   // this.$router.replace({ query: { _page: totalPage } });
      //   console.log(totalPage);        
      // }
      //-- Đẩy min, max vào mảng để v-for
      let arr = [];
      for (let i = min; i <= max; i++) {
        arr.push(i);
      }
      return arr;
    },
    check(){
      console.log(this.totalPage);
      if (parseInt(this.$route.query._page) > this.totalPage) {
        this.$router.replace({ query: { _page: 1 } });        
      }
    },
    changePage(page) {
      this.$router.replace({ query: { _page: page } });
    },
    pre() {
      this.$router.replace({ query: { _page: this.currentPage - 1 } });
      if (this.currentPage <= 1) {
        this.$router.replace({ query: { _page: 1 } });
      }
    },

    next() {
      let last = parseInt(this.$route.query._page);

      this.$router.replace({ query: { _page: last + 1 } });
      if (this.currentPage >= this.totalPage) {
        this.$router.replace({ query: { _page: this.totalPage } });
      }
      console.log(this.totalPage);
    },

    first() {
      this.$router.replace({ query: { _page: 1 } });
    },
    last() {
      this.$router.replace({ query: { _page: this.totalPage } });
    },
  },
  mounted() {
    console.log(this.totalPage);
  },
};
</script>

<style scoped>
.navigation {
  position: relative;
}
.pagination {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.4rem;
  background-color: #fff;
  border-radius: 10px;
  padding: 6px;
  box-shadow: 1px 1px 4px #ccc;
  margin-top: 10px;
}
.hide {
  display: none !important;
}
.page-link {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 8px 18px;
  color: #3779dd;
  box-shadow: 1px 2px 4px #ccc;
  transition: 0.2s ease;
}
.page-link:hover {
  transform: translateY(-3px);
}
/* .page-item:hover{
  transform: translateY(-3px);
} */

.page-item.active .page-link {
  background-color: #3779dde3;
  border-color: #3779dde3;
}
.page-item {
  transition: 0.2s ease;
  right: 60px;
  font-size: 1.2rem;
  margin: 4px 4px;
}
</style>