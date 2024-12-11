<!-- 左侧菜单栏组件 -->
<template>
  <div style="margin: 20px 8px 0 0">
    <div class="campus-menu" :style="{ height: menuHeight + 'px' }">
      <div>
        <h2 class="nav-title">首页</h2>
        <!-- 点击菜单时调用 handleSelectMenu 方法； unique-opened="true"只保持一个子菜单的展开 -->
        <el-menu
          style="width: 182px"
          default-active="1"
          @select="handleSelectMenu"
          :unique-opened="true"
          class="el-menu-vertical"
          background-color="#FFFFFF"
          text-color="#6699CC"
          active-text-color="#000079"
        >
          <div v-for="(item, i) in categoryTree" :key="i">
            <!-- 二级分类 -->
            <el-submenu v-if="item.children != null" :index="item.categoryId">
              <!-- 图标和分类名 -->
              <template slot="title">
                <svg-icon style="margin-right: 18px" :icon-class="item.icon" />
                <span>{{ item.categoryName }}</span>
              </template>
              <!-- 子分类 -->
              <el-menu-item v-for="(child, i) in item.children" :key="i" :index="child.categoryId" >
                <!-- 子分类图标 -->
                <svg-icon style="margin-right: 18px" :icon-class="child.icon" />
                <!-- 子分类名 -->
                <span>{{ child.categoryName }}</span>
              </el-menu-item>
            </el-submenu>

            <el-menu-item v-else :index="item.categoryId">
              <template slot="title">
                <svg-icon style="margin-right: 18px" :icon-class="item.icon" />
                <span>{{ item.categoryName }}</span>
              </template>
            </el-menu-item>
          </div>

          <!-- AI聊天 -->
          <el-menu-item>
            <template slot="title">
              <svg t="1711177579535" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="201502" width="32" height="32"><path d="M501.824 32C303.552 32 141.504 176.992 141.504 357.76c0 23.712 2.816 47.104 8.32 69.856l-51.008 114.208a32 32 0 0 0 24.704 44.736c54.272 7.744 76.672 31.168 76.672 77.312v111.552a64 64 0 0 0 64 64h20.704a64 64 0 0 1 64 64V960a32 32 0 0 0 32 32h345.6a32 32 0 0 0 0-64h-313.6v-24.608a128 128 0 0 0-128-128h-20.736v-111.552c0-65.664-32.192-110.688-91.2-131.136l39.872-89.28a31.968 31.968 0 0 0 1.568-21.792 233.088 233.088 0 0 1-8.896-63.904c0-143.712 131.936-261.76 296.32-261.76s296.32 118.016 296.32 261.76a32 32 0 0 0 64 0C862.144 176.992 700.064 32 501.824 32zM904 448a32 32 0 0 0-32 32v360a32 32 0 0 0 64 0V480a32 32 0 0 0-32-32z" p-id="201503"></path><path d="M673.888 466.656c-11.744-25.568-48.416-24.64-58.816 1.536l-132.8 333.76a32 32 0 0 0 59.488 23.68l32.608-81.92c0.576 0.032 1.088 0.32 1.664 0.32h154.848l38.176 83.104a31.968 31.968 0 1 0 58.144-26.72l-153.312-333.76zM599.68 680l47.264-118.72 54.528 118.72H599.68z" p-id="201504"></path></svg>
              <span style="float: center" class="router-link-active" @click="askAI" >
              <el-link type="primary">问问AI</el-link>
            </span>
            </template>
          </el-menu-item>

          <!-- <el-submenu index="5">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item> -->
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["categoryObj"],
  data() {
    //这里存放数据
    return {
      categoryTree: [], // 菜单树形结构
      //选中的菜单id
      selectMenuId: null,
      menuHeight: "",
      screenWidth: null,
    };
  },
  watch: {
    screenWidth: function (n, o) {
      if (n < 720) {
      } else {
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.categoryTree = this.handleTree(this.categoryObj, "categoryId");
    this.menuHeight = document.documentElement.clientHeight - 45;
  },
  mounted() {
    this.screenWidth = document.documentElement.clientWidth;
    window.onresize = () => {
      //屏幕尺寸变化
      return (() => {
        this.screenWidth = document.documentElement.clientWidth;
      })();
    };
  },
  //方法集合
  methods: {
    // 点击问ai触发方法
    askAI() {
      var flag = window.open("/wxamp", "Campus", "width=400,height=700,left=30,top=10");
      var loop = setInterval(function () {
        if (flag.closed) {
          clearInterval(loop);
          window.location.reload();
        }
      }, 3);
    },
    //点击菜单触发方法
    handleSelectMenu(key, keyPath) {
      /**
       *  传递值“子向父组件传值”
       * this.$emit("事件命名", data);
       * <CampusMenu v-on:"事件命名"="接受的方法()"></CampusMenu>
       */
      if (this.selectMenuId != key) {
        this.selectMenuId = key;
        // 触发事件
        this.$emit("handleCategory", key);
      }
    },
  },
};
</script>

<style>
.campus-menu {
  box-shadow: 0px 0px 25px rgb(0 0 0 / 10%);
  height: 100%;
  width: 100%;
  position: sticky;
  top: 45px;
  background-color: #FFFFFF;
}
.nav-title {
  margin: 0;
  padding: 10px 16px;
  line-height: 26px;
  font-size: 22px;
  font-weight: 500;
  color: #507daf;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 182px;
}
.ai {
  color: #507daf;
}
</style>
