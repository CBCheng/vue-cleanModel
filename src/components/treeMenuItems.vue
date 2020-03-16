<template>
  <div class="tree-view-item">
    <div class="level" :class="'level-'+ menu.level" v-for="menu in menus" :key="menu.id">
      <div v-if="menu.type === 'link'">
         <!-- {{menu.type}} -->
        <router-link class="link" v-bind:to="menu.url" @click.native="toggle(menu)">{{menu.name}}</router-link>
      </div>
      <div v-if="menu.type === 'button'">
        <div class="button heading" :class="{selected: menu.isSelected,expand:menu.isExpanded}" @click="toggle(menu)">
          > {{menu.name}}
          <div class="icon">
          </div>
        </div>
         <transition name="fade">
          <div class="heading-children" v-show="menu.isExpanded"  v-if="menu.subMenu">
            <Tree-view-item :menus='menu.subMenu'></Tree-view-item>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>

import {
    mapGetters,
    mapActions,
} from "vuex";

export default {
  name: "TreeViewItem",
  props: ["menus"],

  methods: {
    toggle(menu) {
      this.$store.commit("findParents", { menu });
    }
  },
  created() {
    this.$store.commit("firstInit", { url: this.$route.path });
  },
};
</script>
<style lang="scss">
a {
  text-decoration: none;
  color: #333;
}
.link,
.button {
  display: block;
  padding: 10px 15px;
  transition: background-color 0.2s ease-in-out 0s, color 0.3s ease-in-out 0.1s;
}

.heading-children {
  padding-left: 14px;
  overflow: hidden;
}
.expand {
  display: block;
}
.collapsed {
  display: none;
}
.expand .icon {
  transform: rotate(90deg);
}
.selected {
  color: #1976d2;
}

// vue  transition 動畫方法
.fade-enter-active {
  transition: all 0.5s ease 0s;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-to {
  height: 0;
}

    
</style>
