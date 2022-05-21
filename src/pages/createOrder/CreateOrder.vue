<template>
    <div class="create_order"> 
        <HeaderVue title="生成订单"/>
        <van-contact-card type="edit" :tel="currentContact.tel" :name="currentContact.name" @click="onEdit" />


        <div class="content">
            <div v-for="(i,index) in store.state.orderList" :key="index">
                <van-card
                    :num="i.num"
                    :price="i.price"
                    :title='i.title'
                    :thumb='i.pic'
                />
            </div>
        </div>

        <div class="pay-wrap">
            <div class="price">
                <span>商品金额</span>
                <span>￥{{allPrice}}</span>
            </div>
            <van-button type="primary" class="pay-btn" block @click="handleCreateOrder" color="#ffc400">生成订单</van-button>
        </div>
    </div>
</template>

<script>
import HeaderVue from "../../components/Header.vue"
import { useStore } from "vuex"
import { onMounted, reactive, toRefs } from "vue"
import { useRouter,useRoute } from "vue-router"
import { Dialog } from 'vant'
export default {
    components:{
        HeaderVue
    },
    setup () {
        const store = useStore()
        const router = useRouter()
        const route = useRoute()
        let data = reactive({
            currentContact:{
                name:'',
                tel:''
            },
            allPrice:0
        })
        //用户信息初始化
        const initUser =() =>{
            store.state.userAddress.forEach((item)=>{
                if(item.isDefault){
                    data.currentContact.name = item.name
                    data.currentContact.tel = item.tel
                }
            })
        }

        //初始化价格
        const initPrice = ()=>{
            let price = 0
            if(store.state.orderList.length){
                store.state.orderList.forEach(item => {
                    price += item.num*item.price
                });
                data.allPrice = price
            }
        };
        onMounted(()=>{
            initPrice()
            initUser()
        })

        //生成订单按钮
        const handleCreateOrder = () =>{
            Dialog.alert({
                title: '标题',
                message: '恭喜！您的订单已完成',
            }).then(() => {
                let newList = store.state.cartList.filter((item)=>{
                    return !route.query.list.includes(item.id+"")
                })
                store.commit('DELETE',newList)
                store.commit('UPDATEORDER')
                router.push('./order')
        });
            
        }

        //地址编辑按钮
        const onEdit = () =>{
            router.push('./address')
        }


        return {...toRefs(data),onEdit,store,handleCreateOrder,initPrice,initUser}
    }
}
</script>

<style lang='less' scoped>
.create_order {
  display: flex;
  flex-flow: column;
  height: 100%;
  .content {
    flex: 1;
    overflow-y: auto;
  }
  .pay-wrap {
    padding: 10px 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>