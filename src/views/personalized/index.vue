<!--
 * @Author: FXJ
 * @CreateDate: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-16 18:43:04
 * @FilePath: \vue-wyy-music\src\views\personalized\index.vue
 * @Description: 首页个性推荐
-->

<template>
  <div class="personal-recomend">
    <el-carousel :interval="3000" autoplay type="card" height="240px">
      <el-carousel-item v-for="banner in bannerList" :key="banner.bannerId">
        <a class="banner-link" @click="handleBannerClick(banner)">
          <img :src="banner.pic" :alt="banner.typeTitle" />
        </a>
      </el-carousel-item>
    </el-carousel>
    <div
      v-loading="loading1"
      element-loading-spinner="el-icon-loading"
      element-loading-text="载入中..."
    >
      <h2 class="area-title">
        推荐歌单<i class="iconfont icon-icon_left_arrow"></i>
      </h2>
      <div
        class="recom-list"
        element-loading-spinner="el-icon-loading"
        element-loading-text="载入中..."
        v-if="algList.length"
      >
        <SongListBox v-for="item in algList" :key="item.id" :algInfo="item" />
      </div>
      <div
        v-loading="loading2"
        element-loading-spinner="el-icon-loading"
        element-loading-text="载入中..."
      >
        <h2 class="area-title">
          独家放送<i class="iconfont icon-icon_left_arrow"></i>
        </h2>
        <div class="mv-list private-content-list">
          <MvRecommend
            v-for="item in privateContent"
            :key="item.id"
            :mv="item"
            palyBtnShow
            :bannerShow="false"
          />
        </div>
      </div>

      <div
        v-loading="loading3"
        element-loading-spinner="el-icon-loading"
        element-loading-text="载入中..."
      >
        <h2 class="area-title">
          最新音乐<i class="iconfont icon-icon_left_arrow"></i>
        </h2>
        <div class="mv-list private-content-list">
          <SongItemBox
            v-for="item in newSongList"
            :key="item.id"
            :songInfo="item"
            :class="{'is-foucs':focusSongId===item.id}"
            @bgClick="handleBgClick"
          />
        </div>
      </div>

      <div
        v-loading="loading4"
        element-loading-spinner="el-icon-loading"
        element-loading-text="载入中..."
      >
        <h2 class="area-title">
          推荐MV<i class="iconfont icon-icon_left_arrow"></i>
        </h2>
        <div class="mv-list" v-if="mvList.length">
          <MvRecommend v-for="item in mvList" :key="item.id" :mv="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, reactive } from "vue";
// 组件导入
import SongListBox from "./components/SongListBox.vue";
import MvRecommend from "./components/MvRecommend.vue";
import SongItemBox from "./components/SongItemBox.vue";

//类型定义
interface Banner {
  bannerId: string;
  pic: string;
  typeTitle: string;
}
interface AlgInfo {
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  copywriter: string;
}
interface MvItem {
  id: number;
  name: string;
  artistName: string;
  picUrl: string;
  playCount: number;
}

//获取轮播图数据
const bannerList = reactive<Banner[]>([]);
const handleBannerClick = (banner: Banner) => {};
const getBannerData = async () => {
  const { data } = await axios.get("api/banner?type=2");
  bannerList.push(...data.banners);
};
getBannerData();

// 获取推荐歌单数据
const loading1 = ref(false);
const loading2 = ref(false);
const loading3 = ref(false);
const loading4 = ref(false);
interface algList {
  id: string;
  name: string;
  picUrl: string;
  playCount: number;
  programCount: number;
  creator: {
    nickname: string;
  };
}
let algList = reactive<AlgInfo[]>([]);
const getAlgList = async () => {
  loading1.value = true;
  const result = (await axios.post("api/personalized?limit=10")) as any;
  algList = result.data.result || [];
  loading1.value = false;
};
getAlgList();

// 获取独家放送数据
let privateContent = reactive<MvItem[]>([]);
const getPrivateContent = async () => {
  loading2.value = true;
  const { data } = await axios.get("api/personalized/privatecontent");
  privateContent.push(...data.result);
  loading2.value = false;
};
getPrivateContent();

//最新音乐
let focusSongId = ref(0);
const newSongList = reactive<any[]>([]);
const getNewSong = async () => {
  loading3.value = true;
  const { data } = await axios.get("api/personalized/newsong?limit=12");
  newSongList.push(...data.result);
  
  loading3.value = false;
};
getNewSong();
const handleBgClick = (id:number) => {
  focusSongId.value = id
}

// 推荐MV
const mvList = reactive<any[]>([]);
const getPersonalizedMv = async () => {
  loading4.value = true;
  const { data } = await axios.get("api/personalized/mv");
  mvList.push(...data.result);
  loading4.value = false;
};
getPersonalizedMv();
</script>
<style scoped lang="scss">
.personal-recomend {
  .banner-link {
    display: block;
    height: 100%;
    width: 100%;
    img {
      border-radius: 8px;
      height: 100%;
      width: 100%;
    }
  }
  .recom-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
  }
}
.area-title i {
  font-size: 20px;
  margin-left: 2px;
}

// mv列表
.mv-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  &.private-content-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
// 整个滚动条背景
::-webkit-scrollbar {
  display: none;
}
</style>
