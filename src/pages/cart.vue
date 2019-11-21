<template>
  <div class="cart">
    <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="back" />
    <div class="inner">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <input type="checkbox" v-model="item.checked" />
          <img :src="'http://localhost:3000' +item.goods_img" />
          <div>
            <p>{{item.goods_title}}</p>
            <button @click="add(index,2)">-</button>
            <span>{{item.goods_num}}</span>
            <button @click="add(index,1)">+</button>
          </div>
          <!-- <p>￥{{item.goods_price * item.goods_num}}</p> -->
          <p>￥{{item.goods_price}}</p>
          <button @click="del(item,index)">删除</button>
        </li>
      </ul>
    </div>
    <div class="foot">
      <ul>
        <li>
          <input type="checkbox" v-model="checkAll" />全选
        </li>
        <li>合计:￥{{total}}</li>
        <li>
          <button>去结算</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.back();
    },
    //增加和减少封装一起(减少http请求)
    add(i, type) {  //传下标i和参数type到上面
      let userid = localStorage.getItem("id");  //获取userid从本地存储id
      let goodsid = this.list[i].goodsid;   //数组中每一个商品的下标的商品id
      this.$http
        .post("/api/cartedit", {  //将三个值放入到data中list:[]数组内
          userid:userid,
          goodsid:goodsid,
          type: type
        })
        .then(res => {
          if (res.data.status == 1) {  //如果res->data->status(状态为1时)
            if (type == 1) {     //如果 数量操作类型：1增加2减少
              this.list[i].goods_num++;  //点击增加
            } else {
              if (this.list[i].goods_num == 1) {  //只能减少到1
                return;
              }
              this.list[i].goods_num--;
            }
          }
        });
    },
    // sub(i) {
    //   this.$http.post("/api/cartedit", {}).then(res => {});
    // if (this.list[i].goods_num == 1) {
    //           return;
    //         }
    //         this.list[i].goods_num--;
    // },
    //删除购物车内的商品，同时也删除数据库内的商品
    del(item, i) {
      this.$http //调商品删除接口
        .post("/api/cartdel", {
          id: item._id //接口需要的id参数和res->Data->data->_id
        })
        .then(res => {
          console.log(res);
          //当res->data->data->status==1时，删除商品(status:状态，1表示成功，其他均是不成功)
          if (res.data.status == 1) {
            this.list.splice(i, 1);
          }
        });
      // let a=localStorage.removeItem('')
      // console.log(a);
    }
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    let id = localStorage.getItem("id");
    console.log(id);
    this.$http.get("/api/cartlist?userid=" + id).then(res => {
      //   console.log(this)
      console.log(res);
      this.list = res.data.data;
    });
  },
  computed: {
    checkAll: {
      get() {
        return this.list.every(item => {
          return item.checked;
        });
      },
      set(newVal) {
        // newval值为true,list内商品的checked变为true
        this.list.forEach(item => {
          item.checked = newVal;
        });
      }
    },
    //购物车的总价
    total() {
      let sum = 0;
      this.list.forEach(item => {
        if (item.checked) {
          sum += item.goods_price * item.goods_num;
        }
      });
      return sum;
    }
  }
};
</script>

<style lang="less" scoped>
.cart {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.inner {
  flex: 1;
  overflow: auto;
  padding: 20px;
  ul {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      img {
        width: 110px;
        height: 100px;
      }
    }
    div {
      p {
        font-size: 18px;
      }
      button {
        width: 30px;
        height: 30px;
      }
    }
  }
}
.foot {
  width: 100%;
  height: 50px;
  padding: 20px;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>