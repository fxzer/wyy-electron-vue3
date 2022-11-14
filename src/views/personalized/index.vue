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
    <el-carousel :interval="3000" autoplay type="card" height="240px"  >
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
        v-loading="loading1"
        element-loading-spinner="el-icon-loading"
        element-loading-text="载入中..."
        v-if="algList.length"
      >
        <SongListBox v-for="item in algList" :key="item.id" :algInfo="item" />
      </div>
      <div v-for="item in algList" :key="item.id">ddd</div>
    </div>
    <pre>{{algList}}</pre>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, reactive } from "vue";
import SongListBox from "./components/songListBox.vue";
interface Banner {
  bannerId: string;
  pic: string;
  typeTitle: string;
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
const loading2 = ref(false)
const loading3 = ref(false)
const loading4 = ref(false)
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
let algList = reactive([]);
const getAlgList = async () => {
  loading1.value = true;
  const  result  = await axios.post("api/personalized?limit=10")  as any;
  
  algList = result.data.result || [];
  console.log('algList: ', algList); 
  loading1.value = false;
};
getAlgList();
// export default {
//   name: "PersonalRecommend",
//   props: {},
//   data() {
//     return {
//       bannerList: [],
//       algList:[],
//       mvList:[],
//       privateContent:[],
//       newSongList:[],
//       newSongId:0,
//       loading1:false,
//       loading2:false,
//       loading3:false,
//       loading4:false,
//     };
//   },
//   created() {},
//   computed: {
//   },
//   components: {
//     SongListBox: () => import("./components/SongListBox"),
//     MvRecommend: () => import("./components/MvRecommend"),
//     SongItemBox: () => import("./components/SongItemBox"),
//   },
//   methods: {
//     ...mapState('player',['audio','playing','id']),
//     ...mapActions('player',['getSongUrl']),
//     async getBannerData() {
//       const { banners = [] } = await this.$http("/banner?type=2");
//       this.bannerList = banners;
//     },
//     async getAlgList() {
//       this.loading1 = true
//       const  {result=[]} = await this.$http("/personalized?limit=10");
//       this.algList = result || [];
//       this.loading1 = false
//     },
//     async getPrivateContent(){
//       this.loading2 = true
//       const data = await this.$http("/personalized/privatecontent")
//       this.privateContent = data.result
//       this.loading2 = false
//     },
//     //最新音乐
//     async getNewSong(){
//       this.loading3 = true
//       const data = await this.$http("/personalized/newsong?limit=12")
//       this.newSongList = data.result
//       this.loading3 = false
//     },
//     async getPersonalizedMv(){
//       this.loading4 = true
//       const {result=[]} = await this.$http("/personalized/mv");
//       this.mvList = result
//       this.loading4 = false
//     },
//     //点击banner
//     handleBannerClick(banner){
//       if(banner.song){
//         // this.getSongDetail(banner.song.id)
//         if(this.id !== banner.song.id){
//           this.getSongUrl(banner.song.id)
//         }
//       } else{

//       }
//     },
//    async getSongDetail(id){
//      let songDetail = await  this.$http(`/song/detail?ids=${id}`)

//     },
//     //点击背景
//     handleBgClick(id){
//       this.newSongId = id
//     }
//   },
//   mounted() {
//     this.getBannerData();
//     this.getAlgList()
//     this.getPersonalizedMv()
//     this.getPrivateContent()
//     this.getNewSong()
//   },
//   watch: {},
// };
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
</style>
