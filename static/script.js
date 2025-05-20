

document.addEventListener("DOMContentLoaded", () => {
  const navBarEl = document.querySelector("footer-bar");

  // Define your HTML snippet as a template string
  const headerHTML = `
  <div class="w3-container w3-light-grey w3-center w3-opacity w3-padding-32">
    <h1 class="w3-margin w3-xlarge"><a href="https://cloudflare.com">Built with Pride on <i>Cloudflare</i></a></h1>
</div>
<!-- Footer -->
<footer class="w3-container w3-padding-64 w3-center w3-opacity">  
  <div class="w3-xlarge w3-padding-32">
    <a href="https://reddit.com/u/funtimeswithdanny"><i class="fa-brands fa-reddit"></i></a>
    <a href="https://madebydanny.uk"><i class="fa-brands fa-buffer"></i></a>
    <a href="https://bsky.app/profile/madebydanny.uk"><i class="fa-brands fa-bluesky"></i></a>
    <a href="https://github.com/therealfuntimeswithdanny"><i class="fa-brands fa-github"></i></a>
</div>
 <p>&copy; 2025 <i>Funtimes Media</i> By<a href="https://bsky.app/profile/madebydanny.uk"> Daniel Morrisey</a></p>
 <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
</footer>
  `;

  if (navBarEl) {
    navBarEl.innerHTML = headerHTML;
  }
});