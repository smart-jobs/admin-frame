<template>
  <div ref="editor" style="text-align:left"></div>
</template>
<script>
import E from 'wangeditor';

const menus = [
  'head', // 标题
  'bold', // 粗体
  'fontSize', // 字号
  'fontName', // 字体
  'italic', // 斜体
  'underline', // 下划线
  'strikeThrough', // 删除线
  'foreColor', // 文字颜色
  'backColor', // 背景颜色
  'link', // 插入链接
  'list', // 列表
  'justify', // 对齐方式
  'quote', // 引用
  // 'emoticon', // 表情
  'image', // 插入图片
  'table', // 表格
  // 'video', // 插入视频
  // 'code', // 插入代码
  'undo', // 撤销
  'redo', // 重复
];

export default {
  name: 'wang-editor',
  model: {
    prop: 'value',
    event: 'change', // 默认为input时间，此处改为change
  },
  props: {
    value: { type: String, required: false, default: '' },
    uploadImgServer: { type: String, required: false, default: '/files/editor/images/upload' },
  },
  data() {
    return {
      editorContent: this.value,
    };
  },
  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.onchange = html => {
      this.editorContent = html;
      this.$emit('change', html);
    };
    // 自定义菜单配置
    editor.customConfig.menus = menus;
    editor.customConfig.zIndex = 0;
    editor.customConfig.uploadImgServer = this.uploadImgServer;
    editor.customConfig.uploadImgMaxLength = 1;
    editor.customConfig.uploadImgHooks = {
      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert: function(insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        var url = result.uri;
        insertImg(url);

        // result 必须是一个 JSON 格式字符串！！！否则报错
      },
    };
    editor.create();
    editor.txt.html(this.value);
  },
  methods: {
    getContent: function() {
      return this.editorContent;
    },
  },
};
</script>
