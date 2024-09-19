<script setup lang="ts">
import { ref, watch } from 'vue'

export interface IOptionsList {
  label: string;
  value?: string;
}

  const props = defineProps([
    'optionsList',
    'model'
  ])

const emits = defineEmits([
  'update:model',
  'start:search'
])

const chosen = ref({})

watch(chosen, (newValue) => {
  emits('update:model', newValue.value ?? {})
})

</script>

<template>
  <div id="autocomplete-parent">
    <select id="select-options"
            class="custom-select"
            v-model="chosen"
    >
      <option id="option-item"
              v-for="item in props.optionsList"
              :value="item"
              style="color: gray"
      >{{item.label}}</option>
    </select>

    <button id="search-btn" @click="emits('start:search', true)"><PhMagnifyingGlass :size="16"></PhMagnifyingGlass ></button>
  </div>
</template>

<style scoped>
#autocomplete-parent {
  background-color: rgba(128, 128, 128, 0.24);
  border-radius: 20px;
  display: flex;
  height: 40px;
  min-width: 240px;
  padding: 8px;

  #select-options
  {
    background-color: transparent !important;
    border: none;
    flex-grow: 1;
    outline: none;

    /* Hide the default dropdown arrow */
    .custom-select {
      -webkit-appearance: none; /* For Safari and Chrome */
      -moz-appearance: none;    /* For Firefox */
      appearance: none;         /* Standard syntax */
      background-color: white;  /* Optional: Set a background color */
      border: 1px solid #ccc;   /* Optional: Add a border */
      padding: 5px;             /* Optional: Add padding */
    }

    /* Optional: Add a custom arrow using a background image */
    .custom-select::-ms-expand {
      display: none; /* For Internet Explorer 10 and 11 */
    }
  }

  #search-btn {
    background-color: transparent;
    border: none;
  }

  #search-btn:hover,
  #select-options:hover,
  #option-item:hover {
    cursor: pointer;
  }
}

#search-btn,
#select-options {
  color: lightgray !important;
}
</style>
