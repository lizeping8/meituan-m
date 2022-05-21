import { createApp } from 'vue'
import App from './App.vue'
import 'amfe-flexible';
import { Button,Form,Field, CellGroup,AddressEdit,AddressList,Dialog,Icon,Tab, Tabs,NavBar,TreeSelect,Stepper, ActionBarButton, ActionBarIcon, ActionBar,Checkbox,CheckboxGroup,SubmitBar,ContactCard,Card } from 'vant';
import router from './router/index'
import './common/css/base.less'
import store from './store'


const app = createApp(App)

app.use(Button).use(Field).use(Form).use(CellGroup).use(AddressEdit ).use(AddressList).use(Icon).use(Tab).use(Tabs).use(NavBar).use(TreeSelect).use(Stepper).use(ActionBarButton).use(ActionBarIcon).use(ActionBar).use(Checkbox).use(CheckboxGroup).use(SubmitBar).use(ContactCard).use(Card).use(Dialog)

app.use(router)
app.use(store)
app.mount('#app')

