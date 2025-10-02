function toggleGalaxy(galaxyId) {
  const systems = document.getElementById(galaxyId + "-systems");
  const button = document.querySelector(
    `[data-galaxy="${galaxyId}"] .collapse-btn`
  );

  if (systems.classList.contains("collapsed")) {
    systems.classList.remove("collapsed");
    button.textContent = "−";
  } else {
    systems.classList.add("collapsed");
    button.textContent = "+";
  }
}

document.getElementById("searchInput").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const galaxies = document.querySelectorAll(".galaxy-container");

  galaxies.forEach((galaxy) => {
    const galaxyText = galaxy.textContent.toLowerCase();
    const systems = galaxy.querySelectorAll(".solar-system");
    let galaxyHasMatch = false;

    systems.forEach((system) => {
      const systemText = system.textContent.toLowerCase();
      if (systemText.includes(searchTerm)) {
        system.style.display = "block";
        galaxyHasMatch = true;
      } else {
        system.style.display = searchTerm === "" ? "block" : "none";
      }
    });

    if (
      galaxyText.includes(searchTerm) ||
      galaxyHasMatch ||
      searchTerm === ""
    ) {
      galaxy.style.display = "block";
      if (searchTerm !== "") {
        // Auto-expand galaxy if there's a match
        const systems = galaxy.querySelector(".solar-systems");
        const button = galaxy.querySelector(".collapse-btn");
        systems.classList.remove("collapsed");
        button.textContent = "−";
      }
    } else {
      galaxy.style.display = "none";
    }
  });
});

document.querySelectorAll(".galaxy-container").forEach((galaxy, index) => {
  galaxy.style.animationDelay = `${index * 0.2}s`;
});

document.querySelectorAll(".solar-system").forEach((system) => {
  system.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.02)";
  });

  system.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  document.body.style.setProperty("--scroll", `${rate}px`);
});
