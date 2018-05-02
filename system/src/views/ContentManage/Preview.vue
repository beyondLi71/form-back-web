<template>
  <div class="preview">
    <div class="preview-wrapper" v-html='content'></div>
  </div>
</template>
<script type="text/javascript">
export default {
  // data () {
  //   return {
  //     content: ''
  //   }
  // },
  props: {
    content: String
  },
  mounted () {
    // this.content = window.localStorage.getItem('smeditorPreview')
    // this.content = 
    // this.content = '<p><ol><li><b>1231231</b><br></li><li><b>asfa</b></li></ol><div><b>asdasaasa</b></div></p>'
  }
}
</script>

<style scopde>
h1 {
  display: block;
  font-size: 2em;
  -webkit-margin-before: 0.67em;
  -webkit-margin-after: 0.67em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  font-weight: bold;
}
h2 {
  display: block;
  font-size: 1.5em;
  -webkit-margin-before: 0.83em;
  -webkit-margin-after: 0.83em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  font-weight: bold;
}
h3 {
  display: block;
  font-size: 1.17em;
  -webkit-margin-before: 1em;
  -webkit-margin-after: 1em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  font-weight: bold;
}
h4 {
  display: block;
  -webkit-margin-before: 1.33em;
  -webkit-margin-after: 1.33em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  font-weight: bold;
}
h5 {
  display: block;
  font-size: 0.83em;
  -webkit-margin-before: 1.67em;
  -webkit-margin-after: 1.67em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  font-weight: bold;
}
i {
  font-style: italic;
}
hr {
  margin: 16px auto;
  border: none;
  border-top: 2px solid #d3d3d3;
}
ol, ul, li {
  list-style-type: decimal;
}
ol,
ul {
  -webkit-padding-start: 40px;
}
</style>

