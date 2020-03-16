<template>
    <div
        @click="roTest"
        :class="[isShow?'':'d-none']"
        class="rowItem"
        :style="'transform:rotateX('+roDeg+'deg)'"
    ></div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'home',
    components: {
        HelloWorld
    },
    props: {
        row: {
            type: Number,
        },
        toggle: {
            type: Boolean,
        },
        totalRow:{
            type: Number,
        }
    },
    data: () => ({
        roDeg: 0,
        isShow: true,
    }),
    watch:{
        toggle:function(){
            setTimeout((()=>{
                this.roDeg = 180;
                setTimeout((()=>{
                    this.isShow = false
                }),500)
            }),(this.totalRow-this.row)*500)
            
        }
    },
    methods: {
        roTest: function() {
            this.roDeg = 180;
        }
    }
}
</script>
<style lang="scss">
.rowItem {
    width: 100%;
    height: 60px;
    background-color: #ffc219;
    border-bottom: 1px solid #fff;
    transform-origin: top;
    transform-style: preserve-3d;
    transition: 0.5s;
}

.d-none {
    display: none;
}
</style>
