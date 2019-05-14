import { blur } from "/src/image_processing.js";

let video = document.getElementById("videoInput");

navigator.mediaDevices
  .getUserMedia({
    video: {
      facingMode: { exact: "environment" }
    },
    audio: false
  })
  .then(function(stream) {
    video.srcObject = stream;
    video.play();
  });
