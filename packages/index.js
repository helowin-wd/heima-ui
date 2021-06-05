// 整个包的入口
// 统一导出
// 导出颜色选择器组件
import Button from './button/button'
import Dialog from './dialog/dialog'
import Input from './input/input'
import Checkbox from './checkbox/checkbox.vue'
import Radio from './radio/radio.vue'
import RadioGroup from './radio/radio-group.vue'
import Switch from './switch/switch'
import CheckboxGroup from './checkbox/checkbox-group.vue'
import Form from './form/form.vue'
import FormItem from './form/form-item.vue'
import './fonts/iconfont.css'

const components = [
  Button,
  Dialog,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  CheckboxGroup,
  Form,
  FormItem
]
// 定义install方法
const install = function (Vue) {
  console.log(112333);
  // 注册所有的组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
// 判断是否直接引入文件，如果是，就不用调用Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
// 导出install方法
export default {
  install
}
