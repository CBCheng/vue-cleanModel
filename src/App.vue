<template>
    <div id="app">
        <div class="app-wrap">
            <div class="frame">
                <div class="languageBox">
                    <span>{{$t("language")}}</span>
                    <button @click="setLangNew('cn')">中文</button>
                    <button @click="setLangNew('en')">English</button>
                </div>
                <div class="slider-bar">
                    <TreeMenu></TreeMenu>
                </div>
                <div v-for="([ x, y ]) in points">
                    <div>{{x}}</div>
                    <div>{{y}}</div>
                </div>

                <!-- <div class="continer">
                    <div class="wrap">
                        <router-view />
                    </div>
                </div>-->
            </div>
        </div>
        <svg id="my-svg" width="160" height="140" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <line
                x1="40"
                x2="120"
                y1="20"
                y2="20"
                stroke="black"
                stroke-width="20"
                stroke-linecap="butt"
                data-start="0" data-duration="10"
            />

            <line
                x1="40"
                x2="120"
                y1="60"
                y2="60"
                stroke="black"
                stroke-width="20"
                stroke-linecap="square"
                data-start="110" data-duration="10"
            />

            <line
                x1="40"
                x2="120"
                y1="100"
                y2="100"
                stroke="black"
                stroke-width="20"
                stroke-linecap="round"
                data-start="0" data-duration="20"
            />
        </svg>


        <div class="moveTest">
            <ul>
                <transition-group name="flip-list" tag="ul">
                <li v-for="(n,i) in num" :key="n.name" class="list-item">
                    {{n.name}}
                </li>
                </transition-group>
            </ul>
            <div @click="changeArr">sss</div>
        </div>
    </div>
</template>

<script>
import i18n from '@/lang/index.js'
import TreeMenu from "@/views/TreeMenu";
import Vivus from 'vivus'

import {
    mapGetters,
    mapActions
} from "vuex";

export default {
    data: () => ({
        num:[{name:'1'},{name:'2'},{name:'3'},{name:'4'},{name:'5'},{name:'6'}],
        points: [[ 100, 23 ], [ 200, 85 ], [ 300, 241 ], [ 400, 989 ] ],
    }),
    components: {
        TreeMenu,
    },
    methods: {
        changeArr:function(){
            // alert('123')
            let save = this.num[0];
            this.num.shift();
            this.num.push(save);
        },
        ...mapActions([
            "setLangNew",
            "setLang"
        ]),
        myCallback: function() {

        }

    },
    mounted: function() {
        //綁定 DOM 之後
        this.setLangNew('cn');
        new Vivus('my-svg', {type: 'oneByOne', duration: 200 }, this.myCallback);

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
