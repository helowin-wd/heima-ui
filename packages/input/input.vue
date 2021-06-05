<template>
  <div
    class="one-input"
    :style="{width:width,marginTop:top}"
    :class="{'one-input_suffix':showSuffix}"
  >
  <!-- 思想：如果传了 showPassword ，判断是否需要切换 密码的显示；如果不传，不判断 -->
    <input
      class="one-input_inner"
      :class="{'is-disabled': disabled}"
      :placeholder="placeholder"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      :name="name"
      :disabled="disabled"
      :value="value"
      @input="handleInput"
    />
    <!-- 如果有图标就显示span标签，否则就不显示 -->
    <span class="one-input_suffix" v-if="showSuffix">
      <i class="vh-icon-clear_circle_outlined" v-if="clearable && value" @click="clear"></i>
      <i class="vh-icon-yanjing" :class="{'vh-icon-yanjing-active': passwordVisible}" v-if="showPassword && type=='password'" @click="handlePassword"></i>
    </span>
  </div>
</template>
<script>
export default {
  name: 'hmInput',
  components: {
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    top: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 显示是否显示密码框
      passwordVisible: false
    }
  },
  // 利用计算属性，动态添加类名
  computed: {
    // 只要传了一个就显示小图标（删除、眼睛）
    showSuffix () {
      return this.clearable || this.showPassword
    }
  },
  methods: {
    // 绑定input事件进行回调
    handleInput (e) {
      this.$emit('input', e.target.value)
    },
    // 清除输入框的内容
    clear () {
      this.$emit('input', '')
    },
    // 切换密码的显示和隐藏
    handlePassword () {
      this.passwordVisible = !this.passwordVisible
    }
  }
}
</script>
<style lang="scss">
.one-input {
  width: 100%;
  position: relative;
  font-size: 14px;
  display: inline-block;
  .one-input_inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 045, 0.355, 1);
    width: 100%;

    &:focus {
      outline: none;
      border-color: #409eff;
    }
    // input禁用样式
    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
// 控制清除图标和眼睛图标的位置，suffix表示后缀。如果带小图标了就要有这个类
.one-input_suffix {
  .one-input_inner {
    padding-right: 30px;
  }
  .one-input_suffix {
    position: absolute;
    right: 10px;
    height: 100%;
    top: 0;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
    transition: all 0.3s;
    z-index: 900;
    i {
      color: #c0c4cc;
      font-size: 28px;
      cursor: pointer;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .vh-icon-yanjing-active {
      color: blue;
    }
  }
}
</style>
