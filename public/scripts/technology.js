//DUMMY DATA, THESE WILL BE RETIVED FROM BACKEND IN REAL SENERIO, HOSTING BACKEND COSTS MONEY SO I AM NOT MAKING IT;

const rockets = {
  "falcon-heavy": {
    name: "Falcon Heavy",
    icon: "🚀",
    galaxy: "Milky Way Galaxy",
    systems: "Inner Solar Systems",
    description:
      "Heavy-lift launch vehicle designed for missions within our local galactic neighborhood",
    specs: {
      "Max Range": "15,000 light-years",
      "Payload Capacity": "64,000 kg",
      "Crew Capacity": "200 people",
      Propulsion: "Chemical Rockets",
      "Top Speed": "0.001c",
      "Mission Duration": "6 months",
    },
  },
  starship: {
    name: "Starship",
    icon: "🛸",
    galaxy: "Milky Way Galaxy",
    systems: "Outer Rim Territories",
    description:
      "Advanced interplanetary vessel capable of reaching the outer edges of our galaxy",
    specs: {
      "Max Range": "50,000 light-years",
      "Payload Capacity": "150,000 kg",
      "Crew Capacity": "600+ people",
      Propulsion: "Fusion Drive",
      "Top Speed": "0.05c",
      "Mission Duration": "2+ years",
    },
  },
  orion: {
    name: "Orion Deep Space",
    icon: "🌌",
    galaxy: "Andromeda Galaxy",
    systems: "Core Systems",
    description:
      "Intergalactic exploration vessel designed for multi-decade missions to distant galaxies",
    specs: {
      "Max Range": "2.5 million light-years",
      "Payload Capacity": "500,000 kg",
      "Crew Capacity": "1000 people",
      Propulsion: "Antimatter Drive",
      "Top Speed": "0.15c",
      "Mission Duration": "50+ years",
    },
  },
  "nova-class": {
    name: "Nova-Class Explorer",
    icon: "⭐",
    galaxy: "Triangulum Galaxy",
    systems: "Research Outposts",
    description:
      "Scientific research vessel optimized for studying stellar phenomena and alien civilizations",
    specs: {
      "Max Range": "3 million light-years",
      "Payload Capacity": "300,000 kg",
      "Crew Capacity": "500 people",
      Propulsion: "Quantum Field Drive",
      "Top Speed": "0.2c",
      "Mission Duration": "25 years",
    },
  },
  "quantum-drive": {
    name: "Quantum Drive Vessel",
    icon: "🌟",
    galaxy: "Large Magellanic Cloud",
    systems: "Mining Colonies",
    description:
      "Industrial transport ship specialized in resource extraction missions in satellite galaxies",
    specs: {
      "Max Range": "180,000 light-years",
      "Payload Capacity": "2,000,000 kg",
      "Crew Capacity": "5000 people",
      Propulsion: "Quantum Tunneling Drive",
      "Top Speed": "0.1c",
      "Mission Duration": "10 years",
    },
  },
  "warp-cruiser": {
    name: "Warp Cruiser MK-VII",
    icon: "🛰️",
    galaxy: "Sagittarius Dwarf Galaxy",
    systems: "Frontier Worlds",
    description:
      "Fast reconnaissance vessel for exploring uncharted regions and establishing first contact",
    specs: {
      "Max Range": "100,000 light-years",
      "Payload Capacity": "80,000 kg",
      "Crew Capacity": "300 people",
      Propulsion: "Warp Field Generator",
      "Top Speed": "0.3c",
      "Mission Duration": "5 years",
    },
  },
};

function toggleDropdown() {
  const dropdown = document.getElementById("dropdown");
  const toggle = document.querySelector(".dropdown-toggle");

  dropdown.classList.toggle("active");
  toggle.classList.toggle("active");
}

function selectRocket(rocketId) {
  const rocket = rockets[rocketId];
  const detailsContainer = document.getElementById("rocket-details");

  document.getElementById("dropdown").classList.remove("active");
  document.querySelector(".dropdown-toggle").classList.remove("active");

  document.querySelector(".dropdown-toggle span").textContent = rocket.name;

  const specsHtml = Object.entries(rocket.specs)
    .map(
      ([label, value]) => `
                    <div class="spec-item">
                        <div class="spec-label">${label}</div>
                        <div class="spec-value">${value}</div>
                    </div>
                `
    )
    .join("");

  detailsContainer.innerHTML = `
                <div class="rocket-title">
                    <span style="font-size: 2rem;">${rocket.icon}</span>
                    ${rocket.name}
                </div>
                <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.6; margin-bottom: 1rem;">
                    ${rocket.description}
                </p>
                <div class="destination-badge">
                    📍 ${rocket.galaxy} - ${rocket.systems}
                </div>
                <div class="specs-grid">
                    ${specsHtml}
                </div>
            `;

  detailsContainer.classList.remove("empty");

  detailsContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

document.addEventListener("click", function (event) {
  const dropdownContainer = document.querySelector(".dropdown-container");
  if (!dropdownContainer.contains(event.target)) {
    document.getElementById("dropdown").classList.remove("active");
    document.querySelector(".dropdown-toggle").classList.remove("active");
  }
});
