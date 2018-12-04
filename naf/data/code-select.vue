<template>
  <el-select v-model="selected" :placeholder="placeholder || '请选择'" @change="handleChange">
    <el-option v-for="(item,_index) in datas" :key="'option-item-'+_index" :label="item.name" :value="item.code"
               :disabled="item.status == '1'"></el-option>
  </el-select>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('dict');

export default {
  name: 'code-select',
  props: {
    value: { required: true },
    category: { type: String, required: true },
    placeholder: String,
  },
  data() {
    return {
      selected: this.value,
    };
  },
  async mounted() {
    const res = await this.load(this.category);
    if (!res.errcode) {
      this.datas.push(res);
    } else {
      // eslint-disable-next-line no-console
      console.error(`数据字典[${this.category}]加载失败：`, res);
    }
  },
  methods: {
    ...mapActions(['load']),
    handleChange() {
      this.$emit('input', this.selected);
      this.$emit('change', this.selected);
    },
  },
};
</script>
