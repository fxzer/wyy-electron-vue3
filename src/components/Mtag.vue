<template>
   <span class="m-tag">{{content}}</span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  content:{
    type: String,
    default:'SQ'
  }
})
</script>
<style scoped lang='scss'>
.m-tag{
  display: inline-block;
  vertical-align:top;
  text-align: center;
  height: 12px;
  line-height: 10px;
  font-size: 10px;
  border:1px solid #EC4141;
  color: #EC4141;
  border-radius: 3px;
  transform: scale(.88);
  margin-right:4px;
  padding: 0 1px;
}
 
</style>