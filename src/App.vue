<template>
    <div id="app">
        <div class="app-wrap">
            <div class="frame">
                <div class="languageBox">
                    <span>{{$t("language")}}</span>
                    <button @click="setLangNew('cn')">中文</button>
                    <button @click="setLangNew('en')">English</button>
                </div>
                
            </div>
        </div>
        <h1>這是一個空專案</h1>
    </div>
</template>

<script>
import i18n from '@/lang/index.js'
// import TreeMenu from "@/views/TreeMenu";
// import Vivus from 'vivus'

import {
    mapGetters,
    mapActions
} from "vuex";

export default {
    data: () => ({
        
    }),
    components: {
        
    },
    methods: {
        ...mapActions([
            "setLangNew",
            "setLang"
        ]),


    },
    mounted: function() {
        this.setLangNew('cn');

    },
}
</script>
<style lang="scss">
@import url("./scss/reset.scss");

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.flip-list-move {
  transition: transform 1s;
}
button {
    margin: 0;
    padding: 0;
    border: 1px solid transparent;
    outline: none;
}
.moveTest{
    position: relative;
    z-index: 3;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.app-wrap {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
}
.languageBox {
    position: absolute;
    top: 4px;
    right: 40px;
    cursor: pointer;
    span {
        cursor: pointer;
    }
    button {
        width: 80px;
        height: 30px;
        margin-left: 8px;
        vertical-align: -webkit-baseline-middle;
        cursor: pointer;
    }
}
.frame {
    display: flex;
    height: 100%;
    position: absolute;
    overflow: hidden;
    left: 0px;
    right: 0px;
    .slider-bar {
        width: 400px;
    }
    .continer {
        width: 100%;
        .wrap {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            display: flex;
        }
    }
}
</style>
