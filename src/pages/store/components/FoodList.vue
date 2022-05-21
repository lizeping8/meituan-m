<template>
    <div class="food_list" v-if="index === 0">
        <van-tree-select
            v-model:main-active-index="active"
            height="88vw"
            :items="items"
            @click-nav="navClick"
        >
            <template #content>
                <div v-for="(i,index) in subItem" :key="index" class="item_bg">
                    <FoodAdd :item="i" :showAdd="true" :addClick="addClick" :onChange="onChange"></FoodAdd>
                </div>
            </template>
        </van-tree-select>
    </div>
    <div class="food_list" v-else>点菜</div>
</template>

<script>
import { reactive,  toRefs } from 'vue';
import FoodAdd from '../../../components/FoodAdd.vue'
export default {
    props:['index','foodData'],
    components:{
        FoodAdd
    },
    setup (props) {
        let data = reactive({
            active:0,
            items: [],
            subItem:[]
        })

        //数据初始化
        const init = ()=>{
            let newList = []
            // ?表示兼容 不会报错 
            props.foodData?.items?.map((i,index)=>{
                newList.push({text:i.text});
                if(data.active === index){
                    data.subItem = i.children
                }
            });
            data.items = newList
        }
        init()

        //点击左侧的导航
        const navClick = (i)=>{
            data.active = i;
            init()
        }

        //切换步进器
        const addClick = (i)=>{
            data.subItem.forEach((item)=>{
                if(item.id === i){
                    item.add = false
                    item.num += 1
                }
            })
        }

        //步进器增加触发事件
        const onChange = (value,detail) =>{
            data.subItem.forEach((item)=>{
                if(item.id === detail.name){
                    item.num =value
                }
            })
        }
            
        
    return {...toRefs(data),navClick,addClick,onChange};
    }
}
</script>

<style lang='less' scoped>
.food_list {
  margin-top: 20px;
  .item_bg {
    padding: 10px;
  }
}

/deep/ .van-tree-select__item--active {
  color: #ffc400;
}
/deep/ .van-sidebar-item--select::before {
  background-color: #ffc400;
}
</style>