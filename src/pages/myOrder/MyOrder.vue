<template>
    <div class="order">
        <HeaderVue title="订单"/>
        <div class="content">
            <van-tabs color="#ffc400">
                <van-tab v-for="(i,index) in navData" :key="index" :title="i">
                    <div  v-for="(i,index) in store.state.orderListED" :key="index" >
                            <van-card
                                :num="i.num"
                                :price="i.price"
                                :title="i.title"
                                :thumb="i.pic"
                            />
                    </div>
                    
                </van-tab>
            </van-tabs>

        </div>
        <Footer/>
    </div>
</template>

<script>
import { toRefs,reactive } from 'vue'
import Footer from '../../components/Footer.vue'
import HeaderVue from '../../components/Header.vue'
import { useStore } from 'vuex'
export default {
    components: {
        Footer,
        HeaderVue,

    },
    setup () {
        const store = useStore()
        let data =  reactive({
            navData:['全部','交易完成','待付款','代发货','已发货']
        })

        return {...toRefs(data),store,}
    }
}
</script>

<style lang="less" scoped>
.order{
    display: flex;
    flex-flow: column;
    height: 100%;
    .content{
        flex: 1;
        overflow-y:auto;
    }
}
</style>