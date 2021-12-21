<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">First</span>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
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
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">Last</span>
          </a>
        </li>
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
  created() {
    console.log("this.caculatePagination()", this.caculatePagination());
  },

  methods: {
    caculatePagination() {
      let totalPage = Math.ceil(this.totalItem / this.itemsPerPage);

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

      //-- Đẩy min, max vào mảng để v-for
      let arr = [];
      for (let i = min; i <= max; i++) {
        arr.push(i);
      }
      return arr;
    },
    //--
    changePage(page) {
      //   console.log("page: ", page);
      //   this.$route.query._page = page;
      this.$router.replace({ query: { _page: page } });
    },
  },
};
</script>

<style scoped>
.navigation {
  position: relative;
}
.pagination {
  position: absolute;
  right: 60px;
  font-size: 1.8rem;
}
</style>