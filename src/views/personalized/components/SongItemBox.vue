<!--
 * @Author: FXJ
 * @LastEditTime: 2022-10-16 14:10:40
 * @FilePath: \vue-wyy-music\src\views\personalized\components\SongItemBox.vue
 * @Description: 
-->
<template>
  <div class="song-box" :class="'song-box--'+size" >
    <div class="img-box"  >
      <img :src="songInfo.picUrl" :alt="name" /> 
      <PlayBtn  :size="size" />
    </div>
    <div class="song-des"  @click.stop="$emit('bgClick', songInfo.id)">
      <p class="song-name">
        {{name}} 
       <span  class="song-alias"  v-if="alias.length">(</span> 
       <span class="song-alias" v-for="alia in alias" :key="alia">{{alia}}</span>
       <span  class="song-alias"  v-if="alias.length">)</span> 
      </p>
      <!-- <p class="song-tags"><span class="tag-item">歌曲翻唱</span></p> -->
      <p class="artist-name text-of-single">
        <Mtag content="Hi-Res" v-if="isHr"/>
        <Mtag content="SQ" v-if="isSq"/>
        <span v-for="artist in artists" :key="artist.id" class="name-item">{{artist.name}}</span>
      </p>
  </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps ,computed } from 'vue'
const props = defineProps({
  songInfo: {
    type: Object,
    default: () => {
      return {}
    }
  },
  size: {
    type: String,
    default: "small",
  },
})
const name = computed(() => {
    return props?.songInfo?.name || ''
})
const alias = computed(() => {
    return props?.songInfo?.alias  || []
})
const artists = computed(() => {
  return props?.songInfo?.song.artists  || []
})
const isHr = computed(() => {
    return props.songInfo?.song?.hrMusic?.bitrate > 320000
})
const isSq = computed(() => {
    return props.songInfo?.song?.sqMusic?.bitrate > 320000
})
</script>
<style scoped lang='scss'>
.song-box{
  display: flex;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  user-select: none;
  .img-box{
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    min-width: 60px;
    cursor: pointer;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .song-des{
    margin-left: 10px;
    flex: 1;
    .song-name{
      font-size: 14px;
      color: #333;
      line-height: 1.5;
      margin-bottom: 5px;
      .song-alias{
        font-size: 12px;
        color: #999;
        &:nth-child(1){
          margin-left: 5px;
        }
      }
    }
    .song-tags{
      font-size: 12px;
      color: #999;
      margin-bottom: 5px;
      .tag-item{
        display: inline-block;
        padding: 2px 4px;
        vertical-align: middle;
        border-radius: 4px;
        border:1px solid #eee;
      }
    }
    .artist-name{
      font-size: 12px;
      color: #999;
      line-height: 1.5;
      vertical-align: middle;
      display: flex;
      align-items:center;
      white-space: nowrap;
      .name-item{
        margin-right: 5px;
        cursor: pointer;
        &:hover{
          color:#333;
        }
      }
    }
  }
  &.song-box--small .img-box{
    width: 60px;
    height: 60px;
  }
  &.song-box--medium .img-box{
    width: 90px;
    height: 90px;
    .song-name{
      font-size: 18px;
    }
  }
  &:hover{
    background-color: #EBEBEB;
  }
  &.is-foucs{
    background-color: #EBEBEB;
  }
}
</style>