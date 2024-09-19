<script setup lang="ts">
const props = defineProps([
  'label',
  'labelSup',
  'description'
])
</script>

<template>
  <div id="list-item">
    <h1 v-if="props.label" id="label">{{props.label}} <sup id="label-sup">{{props.labelSup}}</sup></h1>
    <slot name="body"></slot>

    <div v-if="props.description" id="description">
      {{ props.description }}
    </div>

    <slot name="actions"></slot>

    <div id="separator"></div>
  </div>

</template>

<style scoped>
#list-item {
  padding: 12px;

  #label {
    margin-bottom: 12px;
  }

  #label-sup {
    font-size: 12px;
  }

  #description {
    font-size: 12px;
    font-style: italic;
  }

  #separator {
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    margin-top: 20px;
    width: 60%;
    position: relative;
    float: inline-end;
    right: 20px;
  }
}
</style>
