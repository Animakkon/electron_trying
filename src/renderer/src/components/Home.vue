<script setup lang="ts">
import { ref } from 'vue'

const sendPing = () => window.electron.ipcRenderer.send('show_something', 'ping')
const sendTerm = () => window.electron.ipcRenderer.send('show_something', 'open_terminal')
const sendToOsInfo = () => window.electron.ipcRenderer.send('show_something', 'system-info')

const terminalResults = ref('')
window.electron.ipcRenderer.on('show_something_output', (event, message) => {
  terminalResults.value = message
})
</script>

<template>
  <img alt="logo" class="logo" src="../assets/electron.svg" />
  <div class="creator">приложение для того, чтобы разраб-отэц не грустил</div>
  <div class="text">
    <span class="vue">Не грусти:</span>
  </div>
  <div class="actions">
    <div class="action">
      <a href="breweries">Пивную забугорную найди</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="sendTerm">WSL кнопкой заткни</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="sendPing">Пинг выведи</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="sendToOsInfo">Системные вещи выведи</a>
    </div>
  </div>
  <div class="text">
    <span class="vue">{{ terminalResults }}</span>
  </div>
</template>
