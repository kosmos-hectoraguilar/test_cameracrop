import "./styles.css";
import { blur } from "/src/image_processing.js";
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
  var canvas = document.getElementById("output");
  var dataURL = canvas.toDataURL("image/png");
  button.href = dataURL;
});

function imageIsLoaded(e) {
  $("#myImg").attr("src", e.target.result);
  let lap_var = blur("myImg", "output");
  window.alert("Resultado: " + lap_var);
}
