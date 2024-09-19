<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { onMounted, ref } from 'vue'
import { BREWERY_TYPES, IBreweryType } from '../moks/moks'
import SelectWithSearch from '../ui/SelectWithSearch.vue'
import ListItem from './ListItem.vue'

const breweriesList = ref([])
const typesList = ref(buildAsOptions(BREWERY_TYPES))
const chosenValueToSearch = ref({})

const page = 1
const per_page = 10

onMounted(() => {
  fetchData()
  setRequestData()
})

function fetchData(canStart?: boolean = false) {
  if (!canStart) {
    window.electron.ipcRenderer.send('fetch-breweries', { page, per_page })
  } else {
    window.electron.ipcRenderer.send('fetch-breweries', {
      type: chosenValueToSearch.value.typeName,
      page,
      per_page
    })
  }
}

function setRequestData() {
  window.electron.ipcRenderer.on('fetchBreweries', (event, breweries) => {
    if (breweries.error) {
      breweriesList.value = breweries.error
    } else {
      breweriesList.value = breweries
    }
  })
}

function buildAsOptions(list: IBreweryType[]) {
  return (list).map((item) => {
    return {
      label: item.typeName,
      value: item
    }
  }) ?? []
}

</script>

<template>
  <div id="page">
    <div id="header">
      <div class="action">
        <a href="/">Home</a>
      </div>
      <SelectWithSearch :options-list="typesList"
                        v-model="chosenValueToSearch"
                        @update:model="(value) => chosenValueToSearch = value"
                        @start:search="(canStart) => {
                      if (canStart) {
                        fetchData(canStart)
                      }
                    }"
      ></SelectWithSearch>
    </div>

    <div id="main">
      <ListItem v-for="item in breweriesList"
                :label="item.name"
                :label-sup="item.brewery_type"
      >
        <template v-slot:body>
          <div class="info">
            <pre>
            ADDRESS:
              {{`${ item.city }, ${item.state_province}`}}
              {{item.address_1}}
              {{item.address_2}}
          </pre>
            <pre>
            CONTACTS:
              {{item.phone}}
            </pre>
          </div>
        </template>
        <template v-slot:actions>
          <div v-if="item.website_url"
               class="action">
            <a :href="item.website_url" target="_blank">Site</a>
          </div>
          </template>
      </ListItem>
    </div>
  </div>
</template>

<style scoped>
#page {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;

  #header {
    height: 100px;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px 60px;
  }

  #main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
    margin: 20px;
    margin-right: 0px;
    padd-right: 20px;

    .info {
      display: flex;
      flex-direction: row;

    }
  }
}

</style>
