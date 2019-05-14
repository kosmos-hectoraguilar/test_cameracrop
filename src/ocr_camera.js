import { blur } from "/src/image_processing.js";
class CameraOCR extends HTMLElement {
  static get properties() {
    return { name: { type: String } };
  }

  connectedCallback() {
    this.innerHTML = `
      <div id="mydiv">
      <style>
      html,
      body {
        height: 100%;
        background-color: black;
      }

      #mydiv {
        display: -webkit-flex; /* Safari */
        -webkit-align-items: center; /* Safari 7.0+ */
        display: flex;
        align-items: center;
      }

      #main div {
        -webkit-flex: 1; /* Safari 6.1+ */
        flex: 1;
        align-items: center;
        margin-left: 200px;
        font-size: 16px;
        height: 100%;
      }

      #videoDiv {
        position: relative;
      }
      #navi,
      #infoi {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      #infoi {
        z-index: 10;
        background-color: #99000000;
      }

      #alert {
        color: white;
      }

      #snap{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;
        display: none;
      }

      .app canvas{
    display: none;
}
    </style>
        <div id="buttonDiv" style="background-color: black;">
          <button
            id="screenshot-button"
            style="background: url(take_photo.png); width: 100px; height: 100px; background-size: 100px; border: 0px;"
          />
        </div>
        <div id="videoDiv">
          <video id="videoInput"></video>
        </div>
        <canvas id="canvasPhoto"></canvas>
        <img id="snap" />
      </div>
    `;

    let video = document.getElementById("photo-place"); // video is the id of video tag
    video.width = window.innerWidth; //400; //jQuery(window).width();
    video.height = window.innerHeight; //400; //jQuery(window).height();

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

    var snapButton = document.querySelector("#screenshot-button");

    snapButton.addEventListener("click", function(e) {
      e.preventDefault();

      // Here we're using a trick that involves a hidden canvas element.
      var hidden_canvas = document.getElementById("canvasPhoto"),
        context = hidden_canvas.getContext("2d");

      var width = video.videoWidth,
        height = video.videoHeight;

      if (width && height) {
        // Setup a canvas with the same dimensions as the video.
        hidden_canvas.width = width;
        hidden_canvas.height = height;

        // Make a copy of the current frame in the video on the canvas.
        context.drawImage(video, 0, 0, width, height);
      }

      var snap = blur("canvasPhoto", "canvasPhoto");
      alert("Blur: " + snap);
      // Show image.
      //image.setAttribute("src", snap);
      //image.classList.add("visible");

      // Pause video playback of stream.
      video.pause();
    });
  }
}

customElements.define("ocr-camera", CameraOCR);
