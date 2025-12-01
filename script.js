// ===== SECURITY CIRCLE LOADING SCREEN =====
window.addEventListener("load", () => {
  const loadingText = document.getElementById("loading-text");
  const loadingScreen = document.getElementById("loading-screen");
  const circles = document.querySelectorAll(".circle");

  // ✅ Create tick element
  const tick = document.createElement("div");
  tick.id = "access-tick";
  loadingScreen.appendChild(tick);

  const messages = [
    "[ SCANNING ENVIRONMENT... ]",
    "[ CHECKING SYSTEM SECURITY... ]",
    "[ ACCESS GRANTED ]"
  ];

  let i = 0;
  const interval = setInterval(() => {
    loadingText.textContent = messages[i];
    i++;
    if (i === messages.length) {
      clearInterval(interval);

      // ❌ Stop the spinning circles
      circles.forEach(c => (c.style.display = "none"));

      // ✅ Show green tick animation
      tick.classList.add("show-tick");

      setTimeout(() => {
        loadingScreen.classList.add("fade-out");
        document.body.classList.add("loaded");
      }, 1500);
    }
  }, 1500);
});

// ===== SMOOTH PAGE FADE-IN =====
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ===== TYPE EFFECT for "TEAM CYBERWARRIORS" =====
const textArray = ["TEAM CYBERWARRIORS", "PROGRAMMER"];
let textIndex = 0, charIndex = 0, deleting = false;

function typeEffect() {
  const display = document.getElementById("typewriter");
  const currentText = textArray[textIndex];
  if (!deleting && charIndex < currentText.length) {
    display.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    setTimeout(typeEffect, 120);
  } else if (deleting && charIndex > 0) {
    display.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(typeEffect, 80);
  } else {
    if (!deleting) {
      deleting = true;
      setTimeout(typeEffect, 1000);
    } else {
      deleting = false;
      textIndex = (textIndex + 1) % textArray.length;
      setTimeout(typeEffect, 400);
    }
  }
}
window.onload = typeEffect;

// ===== CYBER MATRIX RAIN =====
const canvas = document.getElementById("matrixRain");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()<>?/{}[]+-=|~";
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = new Array(columns).fill(1);
let hue = 180, hueDirection = 1;

function draw() {
  ctx.fillStyle = "rgba(0, 0, 10, 0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  hue += 0.05 * hueDirection;
  if (hue > 280 || hue < 180) hueDirection *= -1;
  ctx.font = fontSize + "px monospace";
  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    const brightness = (drops[i] % 20 === 0) ? 80 : 55;
    ctx.fillStyle = `hsl(${hue}, 100%, ${brightness}%)`;
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(draw, 45);
window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

// ===== STATIC HEAD TEXT =====
document.getElementById("mainTypewriter").textContent = "YUVRAJ SINGH (HEAD)";

// ===== FOOTER TYPING EFFECT =====
const footerType1 = document.getElementById("footer-type1");
const footerType2 = document.getElementById("footer-type2");
const footerMsg1 = `© ${new Date().getFullYear()} CyberWarriors. All Rights Reserved.`;
const footerMsg2 = "Made by Yuvraj Singh • BCA Cybersecurity";
let f1 = 0, f2 = 0;

function typeFooter1() {
  if (f1 < footerMsg1.length) {
    footerType1.textContent += footerMsg1.charAt(f1);
    f1++;
    setTimeout(typeFooter1, 80);
  } else setTimeout(typeFooter2, 500);
}
function typeFooter2() {
  if (f2 < footerMsg2.length) {
    footerType2.textContent += footerMsg2.charAt(f2);
    f2++;
    setTimeout(typeFooter2, 80);
  }
}
typeFooter1();

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById("backToTop");
window.onscroll = function() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300)
    backToTopBtn.style.display = "block";
  else backToTopBtn.style.display = "none";
};
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  speak("Returning to top of the page.");
});

// ===== CONTACT ICON VOICES =====
const contactIcons = document.querySelectorAll(".icons a");
contactIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    if (icon.href.includes("instagram")) speak("Connecting to Instagram.");
    else if (icon.href.startsWith("mailto:")) speak("Opening mail client.");
    else if (icon.href.startsWith("tel:")) speak("Calling now.");
  });
});

// ===== FEEDBACK FORM (Formspree + Popup + Sound) =====
const reviewForm = document.getElementById("reviewForm");
if (reviewForm) {
  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const form = this;
    fetch("https://formspree.io/f/mdkyneng", {
      method: "POST",
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      const popup = document.getElementById("popup");
      if (response.ok) {
        popup.classList.add("show");
        const sound = new Audio("notification.mp3");
        sound.play();
        setTimeout(() => popup.classList.remove("show"), 3000);
        form.reset();
      } else {
        speak("Something went wrong, please try again.");
      }
    }).catch(() => {
      speak("Network error. Please try again later.");
    });
  });
}
