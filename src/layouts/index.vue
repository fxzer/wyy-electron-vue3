<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-11 14:23:31
 * @FilePath: \vue-wyy-music\src\components\layout\index.vue
 * @Description: 
-->
<template>
  <div>
    <Header></Header>
     
    <LeftMenu />
    <div class="main-wrap">
      <RouterView class="content-wrap" />
      <!-- <MusicDetail :visible.sync="musicLyVisible" /> -->
      </div>
   <!-- <BottomBar /> -->
  </div>
</template>

<script setup lang="ts">
import Header from "./Header.vue";
import LeftMenu from "./LeftMenu.vue";
</script>
<style scoped lang='scss'>
.main-wrap {
  position: absolute;
  left: 200px;
  top: 60px;
  height: calc(100vh - 60px - 80px);
  width: calc(100vw - 200px);
  .content-wrap{
    width: 90%;
    margin: auto;
    height: 100%;
  }
}
</style>