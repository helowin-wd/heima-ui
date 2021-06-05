<template>
  <label class="one-checkbox" :class="{'is-checked':isChecked}">
    <span class="one-checkbox_input">
      <span class="one-checkbox_inner"></span>
      <input
        type="checkbox"
        class="one-checkbox_original"
        :name="name"
        v-model="model"
        :value="label"
      />
    </span>
    <span class="one-checkbox_label">
      <!-- 如果没有传递内容，就显示label -->
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
export default {
  name: 'hmCheckBox',
  inject: {
    CheckboxGroup: {
      default: ''
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    model: {
      get () {
        // 如果使用 CheckboxGroup 进行包裹，就获取 CheckboxGroup 传递的value值；否则获取本身的value值
        return this.isGroup ? this.CheckboxGroup.value : this.value
      },
      set (value) {
        // 同理：如果使用包裹触发父组件的input事件；否则触发本身的input事件
        this.isGroup ? this.CheckboxGroup.$emit('input', value) : this.$emit('input', value)
        console.log(value)
      }
    },
    // isGroup 函数返回值 是一个布尔值 true 或者 false ; !! 可以将任意类型转换为布尔类型；如果使用 CheckboxGroup 包裹返回值就是true
    isGroup () {
      return !!this.CheckboxGroup
    },
    isChecked () {
      // 如果group包裹，判断label是否在model中
      // 如果没有group包裹,直接使用model
      return this.isGroup ? this.model.includes(this.label) : this.model
    }
  }
}
</script>
<style lang="scss" scoped>
.one-checkbox {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  user-select: none;
  margin-right: 30px;
  .one-checkbox_input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    .one-checkbox_inner {
      display: inline-block;
      position: relative;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      background-color: #fff;
      z-index: 1;
      transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
        background-color 0.25s, cubic-bezier(0.71, -0.46, 0.29, 1.46);
      &:after {
        box-sizing: content-box;
        content: '';
        border: 1px solid #ffffff;
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        transform: rotate(45deg) scaleY(0);
        width: 3px;
        transition: transform 0.15s ease-in 0.05s;
        transform-origin: center;
      }
    }
    .one-checkbox_original {
      opacity: 0;
      outline: none;
      position: absolute;
      left: 10px;
      margin: 0;
      width: 0;
      height: 0;
      z-index: -1;
    }
  }
  .one-checkbox_label {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
  }
}
// 选中的样式
.one-checkbox.is-checked {
  .one-checkbox_input {
    .one-checkbox_inner {
      background-color: #409eff;
      border-color: #409eff;
    }
    &:after {
      transform: rotate(45deg) scaleY(1);
    }
  }
  .one-checkbox_label {
    color: #409eff;
  }
}
</style>
