<template>
    <div class="tree-view-menu">
        <treeMenuItems :menus="menus"></treeMenuItems>
    </div>
</template>
<script>

import treeMenuItems from "@/components/treeMenuItems";

const menusData = [];
export default {
    components: {
        treeMenuItems
    },
    name: "TreeViewMenu",
    data() {
        return {
            menus: this.$store.state.menu.menus
        };
    },
    methods:{
      
    }
};
</script>
