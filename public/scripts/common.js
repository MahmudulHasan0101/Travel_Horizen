// common.js - Global JavaScript functionality
class CosmicExplorer {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollEffects();
    this.setupNavigation();
    this.setupParallax();
    this.addInteractiveElements();
  }

  setupScrollEffects() {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const navbar = document.querySelector(".navbar");

      if (scrolled > 100) {
        navbar.classList.add("glass-strong");
      } else {
        navbar.classList.remove("glass-strong");
      }

      const blackHoleContainer = document.querySelector(
        ".black-hole-container"
      );
      const parallaxSpeed = scrolled * 0.08;
      const currentTransform = blackHoleContainer.style.transform || "";

      if (
        !currentTransform.includes("translate") ||
        currentTransform.includes("translateY")
      ) {
        blackHoleContainer.style.transform =
          currentTransform.replace(/translateY\([^)]*\)/, "") +
          ` translateY(${parallaxSpeed}px)`;
      }
    });
  }

  setupNavigation() {
    document.querySelector(".more-menu").addEventListener("click", function () {
      this.classList.toggle("active");
    });
  }

  setupParallax() {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const warpRings = document.querySelectorAll(".warp-ring");

      warpRings.forEach((ring, index) => {
        const speed = (index + 1) * 0.1;
        ring.style.transform = `translate(-50%, -50%) scale(${
          1 + scrolled * speed * 0.001
        })`;
        ring.style.opacity = Math.max(0, 1 - scrolled * 0.002);
      });
    });
  }

  addInteractiveElements() {
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-3px) scale(1.05)";
      });

      btn.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });

    document.querySelectorAll(".feature-card").forEach((card) => {
      card.addEventListener("click", function () {
        this.style.transform = "translateY(-10px) scale(1.02)";
        setTimeout(() => {
          this.style.transform = "translateY(-10px) scale(1)";
        }, 200);
      });
    });

    const blackHoleContainer = document.querySelector(".black-hole-container");
    let mouseX = 0,
      mouseY = 0;

    document.addEventListener("mousemove", (e) => {
      const rect = blackHoleContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      mouseX = (e.clientX - centerX) * 0.003;
      mouseY = (e.clientY - centerY) * 0.003;

      blackHoleContainer.style.setProperty("--mouse-x", mouseX + "px");
      blackHoleContainer.style.setProperty("--mouse-y", mouseY + "px");
      blackHoleContainer.style.filter = `brightness(${
        1 + Math.abs(mouseX + mouseY) * 0.1
      })`;
    });
  }

  createParticles() {
    const particleContainer = document.createElement("div");
    particleContainer.className = "particle-container";
    particleContainer.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    pointer-events: none;
                    z-index: -1;
                `;

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.cssText = `
                        position: absolute;
                        width: 2px;
                        height: 2px;
                        background: rgba(0, 212, 255, 0.6);
                        border-radius: 50%;
                        left: ${Math.random() * 100}vw;
                        top: ${Math.random() * 100}vh;
                        animation: float ${
                          3 + Math.random() * 4
                        }s ease-in-out infinite;
                        animation-delay: ${Math.random() * 2}s;
                    `;
      particleContainer.appendChild(particle);
    }

    document.body.appendChild(particleContainer);

    const style = document.createElement("style");
    style.textContent = `
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
                        25% { opacity: 1; }
                        50% { transform: translateY(-20px) translateX(10px) rotate(180deg); opacity: 0.8; }
                        75% { opacity: 1; }
                    }
                `;
    document.head.appendChild(style);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new CosmicExplorer();

  setTimeout(() => {
    app.createParticles();
  }, 1000);

  const elements = document.querySelectorAll("h1, p");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((el) => observer.observe(el));
});

if (navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty("--animation-duration", "40s");
}
