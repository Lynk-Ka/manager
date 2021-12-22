<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
<<<<<<< HEAD
        <li class="page-item" @click="first()">
          <a class="page-link" href="#" aria-label="Previous"
          >
            <span aria-hidden="true">First</span>
          </a>
        </li>
        <li class="page-item"  @click="pre()" >
          <a class="page-link" href="#" aria-label="Previous"
          :class="this.currentPage<=1 && 'hide'"
          >
=======
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">First</span>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
>>>>>>> 51969b00d3598dda6eeb1c10b737e5971a97e2df
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
<<<<<<< HEAD
        <li class="page-item " @click="next()">
          <a class="page-link" href="#" aria-label="Next" 
            :class="this.currentPage >= this.totalPage && 'hide'"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
        <li class="page-item" @click="last()">
          <a class="page-link" href="#"           
          >
=======
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
>>>>>>> 51969b00d3598dda6eeb1c10b737e5971a97e2df
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
<<<<<<< HEAD
  data(){
    return{
      totalPage:''
    }
  },
  // created(){
  //   this.lastPage()
  // },
  // computed: {
  //     lastPage(){
  //       if(this.currentPage == this.totalPage){
  //         if (this.itemsPerPage=0) {
  //            return this.$router.replace({ query: { _page: this.totalPage } });
            
  //         }
  //       }
  //     }
  // },
  methods: {
    caculatePagination() {
      let totalPage = Math.ceil(this.totalItem / this.itemsPerPage);
      this.totalPage=totalPage
=======
  created() {
    console.log("this.caculatePagination()", this.caculatePagination());
  },

  methods: {
    caculatePagination() {
      let totalPage = Math.ceil(this.totalItem / this.itemsPerPage);

>>>>>>> 51969b00d3598dda6eeb1c10b737e5971a97e2df
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
<<<<<<< HEAD
      }      
      
=======
      }

      //-- Đẩy min, max vào mảng để v-for
>>>>>>> 51969b00d3598dda6eeb1c10b737e5971a97e2df
      let arr = [];
      for (let i = min; i <= max; i++) {
        arr.push(i);
      }
      return arr;
    },
    //--
    changePage(page) {
<<<<<<< HEAD
      this.$router.replace({ query: { _page: page } });
    },
    pre(){
      this.$router.replace({ query: { _page: this.currentPage - 1 } });
      if (this.currentPage<=1) {
        this.$router.replace({ query: { _page: 1 } });
      }
    },

    next(){ 
      let last = parseInt(this.$route.query._page)
      this.$router.replace({ query: { _page: last + 1  } });
      if (this.currentPage >= this.totalPage) {
        this.$router.replace({ query: { _page: this.totalPage } });
      }
    },

    first(){
      this.$router.replace({ query: { _page: 1 } });
    },
    last(){
      this.$router.replace({ query: { _page: this.totalPage } });

    },
    
=======
      //   console.log("page: ", page);
      //   this.$route.query._page = page;
      this.$router.replace({ query: { _page: page } });
    },
>>>>>>> 51969b00d3598dda6eeb1c10b737e5971a97e2df
  },
};
</script>

<style scoped>
<<<<<<< HEAD
*{
  box-sizing: border-box;
}
=======
>>>>>>> 51969b00d3598dda6eeb1c10b737e5971a97e2df
.navigation {
  position: relative;
}
.pagination {
  position: absolute;
<<<<<<< HEAD
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.4rem;
  background-color: #fff;
  border-radius:20px ;
  padding: 10px 0;
  box-shadow: 1px 1px 4px #ccc;

}
.hide{
  display: none !important;
}
.page-link{
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 6px 12px;
  padding: 10px 20px;
  color: #3779dd;
  box-shadow: 1px 2px 4px #ccc;
  transition: .2s ease;
}
.page-item:hover{
  transform: translateY(-3px);
}

.page-item.active .page-link{
  background-color: #3779dde3 ;
  border-color:#3779dde3;
}
.page-item{
  transition: .2s ease;
=======
  right: 60px;
  font-size: 1.8rem;
>>>>>>> 51969b00d3598dda6eeb1c10b737e5971a97e2df
}
</style>