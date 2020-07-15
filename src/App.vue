<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  html, body {
    margin: 0;
    height: 100%;
  }

  body {
    display: table;
    width: 100%;
    background: #333333;
    font-family: monospace;
    color: #bbb;
    font-weight: bold;
    font-size: 1.2em;
  }

  * {
    box-sizing: border-box;
  }

  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
