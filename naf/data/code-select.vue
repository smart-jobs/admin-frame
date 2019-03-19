<template>
  <el-select v-model="selected" :placeholder="placeholder || '请选择'" @change="handleChange" :disabled="disabled">
    <template v-for="(item, _index) in datas">
      <el-option-group :key="'option-group-' + _index" :label="item.name" v-if="item.children && item.children.length > 0">
        <el-option
          v-for="(child, _index2) in item.children"
          :key="'option-item-' + _index + '-' + _index2"
          :label="child.name"
          :value="child.code"
          :disabled="child.status == '1'"
        ></el-option>
      </el-option-group>
      <el-option :key="'option-item-' + _index" :label="item.name" :value="item.code" :disabled="item.status == '1'" v-else></el-option>
    </template>
  </el-select>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('naf/dict');

export default {
  name: 'code-select',
  props: {
    value: { required: true },
    category: { type: String, required: true },
    placeholder: String,
    disabled: Boolean,
    mode: { type: String, default: 'code' }, // 选值模式：code、name、pair
  },
  data() {
    return {
      selected: this.value,
      datas: [],
    };
  },
  async mounted() {
    const res = await this.load(this.category);
    if (!res.errcode) {
      this.datas = res.data || res;
    } else {
      // eslint-disable-next-line no-console
      console.error(`数据字典[${this.category}]加载失败：`, res);
    }
  },
  methods: {
    ...mapActions(['load']),
    handleChange() {
      if (this.selected) {
        const items = this.datas || [];
        const item = items.find(p => p.code === this.selected);
        if (item && this.mode === 'name') {
          this.$emit('input', item.name);
          return;
        }
        if (this.mode === 'pair') {
          this.$emit('input', item);
          return;
        }
      }

      this.$emit('input', this.selected);
      // this.$emit('change', this.selected);
    },
  },
};
</script>
