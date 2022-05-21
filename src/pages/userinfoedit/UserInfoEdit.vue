<template>
    <div class="userEdit">
        <HeaderVue title="账号管理"/>
        <div class="input-item">
            <van-field v-model="nickName" label="昵称" placeholder="请输入昵称" />
            <van-field v-model="introduceSign" label="个性签名" placeholder="请输入个性签名"/>
            <van-field v-model="password" label="密码" placeholder="请输入密码" />
        </div>
        <van-button type="primary" round color="#ffc400" class="save-btn" @click="save">保存</van-button>
        <van-button type="primary" round color="#ffc400" class="save-btn" @click="logout">退出登录</van-button>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import HeaderVue from "../../components/Header.vue"
import { Toast } from 'vant'
import router from '../../router'
export default {
    components:{
        HeaderVue,
    },
    setup () {
        let data = reactive({
            nickName:"",
            password:"",
            introduceSign:"牛啊"
        })
        //退出登录
        const logout = () =>{
            localStorage.removeItem("isLogin");
            Toast('退出登录')
            setTimeout(()=>{
                router.push('/login')
            },1000)
            
        }
        //保存
        const save = () =>{
            if(data.nickName && data.password){
                const userInfo = JSON.parse(localStorage.userInfo);
                const newUserInfo = {
                    用户名:data.nickName || userInfo['用户名'],
                    密码:data.password || userInfo['密码']
                }
                localStorage.setItem('userInfo',JSON.stringify(newUserInfo))
                Toast('修改成功')
                router.push('./mine')
            }else{
                Toast('请输入修改的内容')
            }
        }

        return {...toRefs(data),save,logout}
    }
}
</script>

<style lang='less' scoped>
/deep/ .van-button--danger {
  background-color: #ffc400;
  border-color: #ffc400;
}
.save-btn {
  width: 80%;
  margin: 10px 10% 10px 10%;
}
</style>