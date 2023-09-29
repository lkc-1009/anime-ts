<script setup lang="ts">
import {useWindowScroll} from "@vueuse/core/index"
import {computed, defineProps, ref, reactive, watch} from "vue"

const {x, y} = useWindowScroll()

const props = defineProps({
  boxWidth: {
    type: Number,
    required: true
  },
  colInterval: {
    type: Number,
    required: true
  },
  rowInterval: {
    type: Number,
    default: 10
  },
  colNum: {
    type: Number,
    default: 5
  }
})

const isLoading = ref<boolean>(false)
let loadedCount = ref<number>(0)
let total = ref<number>(0)
const imgList = reactive<Array<any>>([])
let imgBoxList = ref<any>()

const waterfallWidth = props.boxWidth
const waterfallWidthPx = computed<string>(() => `${props.boxWidth}px`)

const colWidth = computed<number>(() => Math.floor((props.boxWidth - (props.colNum - 1) * props.colInterval) / props.colNum))
const colWidthPx = computed<string>(() => `${colWidth.value}px`)

const colHeightList = ref<Array<number>>([])
let beginIndex = ref<number>(0)

const handle = (list: Array<any>) => {
  const promiseAll = []

  list.forEach((item: any, index: number) => {
    if (!item.url) {
      item._height = '0'
      loadedCount.value++

      if (loadedCount.value === total.value) {
        imgList.push(...list)
      }
    }

    const itemPromise = new Promise((resolve, reject) => {
      let img = new Image()
      img.src = item.url

      img.onload = img.onerror = (e) => {
        if ("type" in e && e.type === 'load') {
          item._height = img.height / img.width * colWidth.value
          item._error = false
        }

        if ("type" in e && e.type === 'error') {
          item._error = true
          item._height = 200
        }

        loadedCount.value++

        if (loadedCount.value === total.value) {
          imgList.push(...list)
        }

        resolve({
          index
        })
      }
    })
    promiseAll.push(itemPromise)
  })
  return Promise.all(promiseAll)
}

const waterfall = (list) => {
  imgBoxList.value = document.getElementsByClassName('item')
  if (imgBoxList.value.length === 0) return

  let top, left, height, colWidths = colWidth.value;
  if (beginIndex.value === 0) colHeightList.value = []

  for (let i = beginIndex.value; i < imgList.length; i++) {
    if (!imgBoxList.value[i]) return

    height = imgList[i]._height
    if (i < props.colNum) {
      colHeightList.value.push(height)

      top = 0
      left = i * colWidths + i * props.colInterval

    } else {
      let minHeight = Math.min(...colHeightList.value)
      let minIndex = colHeightList.value.indexOf(minHeight)

      colHeightList.value[minIndex] = height + minHeight
      top = minHeight.toFixed(0)
      left = minIndex * colWidths + minIndex * props.colInterval
    }

    imgBoxList.value[i].style.left = left + 'px'

    if (i >= props.colNum) {
      const rowIndex = Math.ceil((i + 1) / props.colNum - 1)
      imgBoxList.value[i].style.top = (Number.parseInt(top) + props.rowInterval * rowIndex) + 'px'
    }

    beginIndex.value++
  }

  if (Math.min(...colHeightList.value) < document.documentElement.clientHeight) {
    init()
  }
}

const getData = () => {
  let list = []

  for (let i = 0; i < 15; i++) {
    list.push({
      url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fb45cf028-f58e-436a-9b33-9cd207f733c3%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1698576347&t=b84ea5b4fd4acae628ead75a96ac2f7e'
    }, {
      url: 'https://img1.baidu.com/it/u=1967865597,1287783204&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=874'
    })
  }

  total.value += 15
  return list
}

const init = () => {
  const t1 = new Date().getTime()
  isLoading.value = true
  const list = getData()

  handle(list).finally(() => {
    waterfall(list)

    const t2 = new Date().getTime()
    const time = 1000 - (t2 - t1)

    if (time > 0) {
      setTimeout(() => {
        isLoading.value = false
      }, time)
    } else {
      isLoading.value = false
    }
  })
}

init()

watch(y, (newValue, oldValue) => {
  if (Math.ceil(<number>newValue) + Math.ceil(document.documentElement.clientHeight) >= Math.round(document.body
      .scrollHeight)) {
    init()
  }
})

const resetData = () => {
  loadedCount.value = 0
  total.value = 0
  colHeightList.value = []
  imgBoxList.value = null
  imgList.length = 0
  imgList.splice(0, imgList.length)
  beginIndex.value = 0
}

watch(() => props.colNum, (value) => {
  resetData()
  init()
})
watch(() => props.colInterval, (value) => {
  resetData()
  init()
})
</script>
<template>
  <div class="waterfall-container">
    <div class="waterfall-box">
      <div class="item" v-for="(item, index) in imgList" :key="index">
        <img :src="item.url" :alt="item.url" />
      </div>
      <el-dialog v-model="isLoading" width="30%" :show-close="false">
        图片资源加载中....
      </el-dialog>
    </div>
  </div>
</template>

<style scoped lang="scss">
.waterfall-container {
  display: flex;
  width: 100%;
  justify-content: center;

  .waterfall-box {
    width: v-bind(waterfallWidthPx);
    display: flex;
    flex-wrap: wrap;
    position: relative;

    .item {
      position: absolute;
      width: v-bind(colWidthPx);
      border-radius: 10px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>