import "./styles.css";
import cv from "opencv.js";
import $ from "jquery";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

$(function() {
  $(":file").change(function() {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = imageIsLoaded;
      reader.readAsDataURL(this.files[0]);
    }
  });
});

var button = document.getElementById("btn-download");
button.addEventListener("click", function(e) {
  var canvas = document.createElement("output");
  var dataURL = canvas.toDataURL("image/png");
  button.href = dataURL;
});

function imageIsLoaded(e) {
  $("#myImg").attr("src", e.target.result);
  var dst = new cv.Mat();
  let src = cv.imread("myImg");
  //let src = cv.matFromImageData(e.target.result);
  writeDateTime();
  cv.cvtColor(src, dst, cv.COLOR_BGRA2GRAY);
  writeDateTime();
  let temp = resize_300_dpi(dst);
  writeDateTime();
  cv.imshow("output", dst);

  let lap_variance = laplace_variance(temp);
}

function writeDateTime() {
  var today = new Date();
  var time =
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds() +
    "." +
    today.getMilliseconds() +
    "\n";

  console.log(time);
}

const H_INCHES = 2.23;
const W_INCHES = 3.38;
const DPI_LIMIT = 300;

function laplace_variance(img) {
  let lap_var;
  let lap = new cv.Mat();
  let myMean = new cv.Mat();
  let myStddev = new cv.Mat();

  cv.Laplacian(img, lap, cv.CV_64F);
  cv.meanStdDev(lap, myMean, myStddev);
  lap_var = myStddev.data64F[0] * myStddev.data64F[0];

  return lap_var;
}

function resize_300_dpi(img) {
  let interpoletionMethod;
  let img_dst = new cv.Mat();
  let dsize = new cv.Size(1014, 636);
  let h_dpi = img.size().height / H_INCHES;
  let w_dpi = img.size().width / W_INCHES;

  if (h_dpi < DPI_LIMIT || w_dpi < DPI_LIMIT) {
    //interpoletionMethod = cv.INTER_CUBIC;
    cv.resize(img, img_dst, dsize, 0, 0, cv.INTER_CUBIC);
  } else {
    //interpoletionMethod = cv.INTER_AREA;
    cv.resize(img, img_dst, dsize, 0, 0, cv.INTER_AREA);
  }

  //cv.resize(img, img_dst, dsize, 0, 0, interpoletionMethod);

  return img_dst;
}
