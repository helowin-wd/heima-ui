<template>
  <div class="one-switch" :class="{'is-checked':value}" @click="handleClick">
    <span class="one-switch_core" ref="core">
      <span class="one-switch_button"></span>
    </span>
    <input type="checkbox" class="one-switch_input" :name="name" ref="input" />
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'hmSwitch',
  data () {
    return {

    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  mounted () {
    // 修改开关颜色
    this.setColor()
    // 控制checkbox的选中效果
    this.$refs.input.checked = this.value
  },
  methods: {
    async handleClick () {
      this.$emit('input', !this.value)
      /**
       * 点击的时候修改背景色，等待value发生变化再 setColor；数据修改后，等待DOM更新，再修改按钮的颜色
       */
      await this.$nextTick()
      this.setColor()
      this.$refs.input.checked = this.value
    },
    // 设置颜色
    setColor () {
      if (this.activeColor || this.inactiveColor) {
        var color = !this.value ? this.activeColor : this.inactiveColor
        this.$refs.core.style.borderColor = color
        this.$refs.core.style.backgroundColor = color
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.one-switch {
  display: inline-block;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  vertical-align: middle;
  .one-switch_core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
    vertical-align: middle;
    .one-switch_button {
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all 0.3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
  }
}
// 选中样式
.is-checked {
  .one-switch_core {
    border-color: #409eff;
    background-color: #409eff;
    // 移动圆球
    .one-switch_button {
      transform: translateX(20px);
    }
  }
}
// 隐藏input标签
.one-switch_input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0;
}
</style>
