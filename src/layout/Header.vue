<script setup lang="ts">
import {NIcon} from "naive-ui"
import {MenuOption} from "naive-ui"
import {Component, h} from "vue"
import {BookOutline, PersonOutline, WineOutline} from "@vicons/ionicons5"

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, {default: () => h(icon)})
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
        h('a',
            {
              href: '',
              target: '_blank',
              rel: 'noopener noreferrer'
            },
            'Github'
        ),
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookOutline)
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(BookOutline),
    disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(BookOutline),
    disabled: true
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookOutline),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(PersonOutline)
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(PersonOutline)
          }
        ]
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(WineOutline),
        children: [
          {
            label: '威士忌',
            key: 'whisky'
          }
        ]
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]

const activeKey: string | null = null
</script>

<template>
  <div>
    <n-grid :cols="12">
      <n-gi :offset="1" span="10">
        <n-menu :value="activeKey" mode="horizontal" :options="menuOptions"/>
      </n-gi>
    </n-grid>
  </div>
</template>

<style scoped>

</style>