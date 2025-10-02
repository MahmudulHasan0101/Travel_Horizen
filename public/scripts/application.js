//DUMMY DATA, THESE WILL BE RETIVED FROM BACKEND IN REAL SENERIO, HOSTING BACKEND COSTS MONEY SO I AM NOT MAKING IT;
const galaxyData = {
  "milky-way": {
    name: "Milky Way Galaxy",
    systems: {
      "solar-system": {
        name: "Solar System",
        planets: {
          mars: {
            name: "Mars",
            baseCost: 50000,
            info: "The Red Planet - Perfect for adventure seekers! Experience Martian sunsets and explore ancient riverbeds.",
          },
          jupiter: {
            name: "Jupiter",
            baseCost: 120000,
            info: "The Gas Giant - Witness the Great Red Spot and explore its fascinating moons including Europa and Io.",
          },
          saturn: {
            name: "Saturn",
            baseCost: 150000,
            info: "The Ringed Wonder - Marvel at the spectacular ring system and visit the mysterious moon Titan.",
          },
          europa: {
            name: "Europa (Jupiter's Moon)",
            baseCost: 130000,
            info: "Ice Moon Paradise - Dive beneath the icy surface to explore the hidden subsurface ocean.",
          },
        },
      },
      "alpha-centauri": {
        name: "Alpha Centauri System",
        planets: {
          "proxima-b": {
            name: "Proxima Centauri b",
            baseCost: 500000,
            info: "Closest Exoplanet - Our nearest stellar neighbor with potentially habitable conditions.",
          },
          "alpha-centauri-bb": {
            name: "Alpha Centauri Bb",
            baseCost: 520000,
            info: "Binary Star World - Experience the unique phenomenon of double sunrises and sunsets.",
          },
        },
      },
    },
  },
  andromeda: {
    name: "Andromeda Galaxy",
    systems: {
      "kepler-system": {
        name: "Kepler-442 System",
        planets: {
          "kepler-442b": {
            name: "Kepler-442b",
            baseCost: 2000000,
            info: "Super-Earth Paradise - A larger, potentially habitable world with exotic landscapes.",
          },
          "kepler-442c": {
            name: "Kepler-442c",
            baseCost: 2100000,
            info: "Crystal World - Famous for its crystalline formations and aurora-like atmospheric displays.",
          },
        },
      },
      "nova-system": {
        name: "Nova Prime System",
        planets: {
          "nova-prime": {
            name: "Nova Prime",
            baseCost: 1800000,
            info: "Bioluminescent World - Experience a planet where the very ground glows with natural light.",
          },
          "nova-secondary": {
            name: "Nova Secondary",
            baseCost: 1900000,
            info: "Floating Islands - Gravity-defying landmasses suspended in colorful atmospheric layers.",
          },
        },
      },
    },
  },
  triangulum: {
    name: "Triangulum Galaxy",
    systems: {
      "trion-system": {
        name: "Trion System",
        planets: {
          "trion-alpha": {
            name: "Trion Alpha",
            baseCost: 3000000,
            info: "Desert Gem - Vast crystal deserts under triple suns create breathtaking prismatic displays.",
          },
          "trion-beta": {
            name: "Trion Beta",
            baseCost: 3200000,
            info: "Storm World - Eternal lightning storms create spectacular electrical phenomena in the sky.",
          },
        },
      },
    },
  },
  "centaurus-a": {
    name: "Centaurus A Galaxy",
    systems: {
      "centauri-system": {
        name: "Centauri Prime System",
        planets: {
          "centauri-prime": {
            name: "Centauri Prime",
            baseCost: 4000000,
            info: "Ancient Ruins World - Explore mysterious alien architecture and advanced ancient technologies.",
          },
          "centauri-moon": {
            name: "Centauri Moon Base",
            baseCost: 3800000,
            info: "Research Station - State-of-the-art scientific facility studying galactic phenomena.",
          },
        },
      },
    },
  },
};

let currentBookingCode = "";

function updateSolarSystems() {
  const galaxy = document.getElementById("galaxy").value;
  const solarSystemSelect = document.getElementById("solar-system");
  const planetSelect = document.getElementById("planet");

  // Reset dependent dropdowns
  solarSystemSelect.innerHTML =
    '<option value="">Choose solar system...</option>';
  planetSelect.innerHTML =
    '<option value="">Choose destination planet...</option>';
  planetSelect.disabled = true;
  document.getElementById("planet-info-container").innerHTML = "";

  if (galaxy && galaxyData[galaxy]) {
    solarSystemSelect.disabled = false;
    const systems = galaxyData[galaxy].systems;

    for (let systemId in systems) {
      const option = document.createElement("option");
      option.value = systemId;
      option.textContent = systems[systemId].name;
      solarSystemSelect.appendChild(option);
    }
  } else {
    solarSystemSelect.disabled = true;
  }
  updateCost();
}

function updatePlanets() {
  const galaxy = document.getElementById("galaxy").value;
  const solarSystem = document.getElementById("solar-system").value;
  const planetSelect = document.getElementById("planet");

  planetSelect.innerHTML =
    '<option value="">Choose destination planet...</option>';
  document.getElementById("planet-info-container").innerHTML = "";

  if (galaxy && solarSystem && galaxyData[galaxy]?.systems[solarSystem]) {
    planetSelect.disabled = false;
    const planets = galaxyData[galaxy].systems[solarSystem].planets;

    for (let planetId in planets) {
      const option = document.createElement("option");
      option.value = planetId;
      option.textContent = planets[planetId].name;
      planetSelect.appendChild(option);
    }
  } else {
    planetSelect.disabled = true;
  }
  updateCost();
}

function showPlanetInfo() {
  const galaxy = document.getElementById("galaxy").value;
  const solarSystem = document.getElementById("solar-system").value;
  const planet = document.getElementById("planet").value;
  const infoContainer = document.getElementById("planet-info-container");

  if (
    galaxy &&
    solarSystem &&
    planet &&
    galaxyData[galaxy]?.systems[solarSystem]?.planets[planet]
  ) {
    const planetData = galaxyData[galaxy].systems[solarSystem].planets[planet];
    infoContainer.innerHTML = `
                    <div class="planet-info">
                        <h4>🌟 ${planetData.name}</h4>
                        <h5>${planetData.info}</h5>
                    </div>
                `;
  } else {
    infoContainer.innerHTML = "";
  }
}

function updateCost() {
  const galaxy = document.getElementById("galaxy").value;
  const solarSystem = document.getElementById("solar-system").value;
  const planet = document.getElementById("planet").value;
  const duration = parseInt(document.getElementById("duration").value) || 7;
  const costDisplay = document.getElementById("total-cost");

  let totalCost = 0;

  if (
    galaxy &&
    solarSystem &&
    planet &&
    galaxyData[galaxy]?.systems[solarSystem]?.planets[planet]
  ) {
    const planetData = galaxyData[galaxy].systems[solarSystem].planets[planet];
    const baseCost = planetData.baseCost;
    const durationMultiplier = Math.sqrt(duration / 7); // Square root scaling for duration
    totalCost = Math.round(baseCost * durationMultiplier);
  }

  costDisplay.textContent =
    totalCost > 0 ? `$${totalCost.toLocaleString()}` : "$0";
}

function generateBookingCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "CV-";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  code += "-";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function bookTrip() {
  const fullName = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const galaxy = document.getElementById("galaxy").value;
  const solarSystem = document.getElementById("solar-system").value;
  const planet = document.getElementById("planet").value;
  const departureDate = document.getElementById("departure-date").value;
  const duration = document.getElementById("duration").value;
  const cost = document.getElementById("total-cost").textContent;

  if (
    !fullName ||
    !email ||
    !galaxy ||
    !solarSystem ||
    !planet ||
    !departureDate
  ) {
    alert("Please fill in all required fields!");
    return;
  }

  if (cost === "$0") {
    alert("Please select a valid destination to calculate cost!");
    return;
  }

  currentBookingCode = generateBookingCode();
  document.getElementById("booking-code-display").textContent =
    currentBookingCode;

  document.getElementById("success-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("success-modal").style.display = "none";
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const fullName = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const galaxy =
    document.getElementById("galaxy").selectedOptions[0]?.text || "";
  const solarSystem =
    document.getElementById("solar-system").selectedOptions[0]?.text || "";
  const planet =
    document.getElementById("planet").selectedOptions[0]?.text || "";
  const departureDate = document.getElementById("departure-date").value;
  const duration =
    document.getElementById("duration").selectedOptions[0]?.text || "";
  const cost = document.getElementById("total-cost").textContent;

  doc.setFontSize(20);
  doc.setTextColor(0, 100, 200);
  doc.text("COSMIC VOYAGER", 20, 20);
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("Space Travel Agency", 20, 28);

  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("BOOKING CONFIRMATION", 20, 45);

  doc.setFontSize(14);
  doc.setTextColor(200, 0, 0);
  doc.text(`Booking Code: ${currentBookingCode}`, 20, 60);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("TRAVELER INFORMATION:", 20, 80);
  doc.text(`Name: ${fullName}`, 25, 90);
  doc.text(`Email: ${email}`, 25, 100);

  doc.text("TRIP DETAILS:", 20, 120);
  doc.text(`Galaxy: ${galaxy}`, 25, 130);
  doc.text(`Solar System: ${solarSystem}`, 25, 140);
  doc.text(`Destination: ${planet}`, 25, 150);
  doc.text(`Departure Date: ${departureDate}`, 25, 160);
  doc.text(`Duration: ${duration}`, 25, 170);
  doc.text(`Total Cost: ${cost}`, 25, 180);

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Terms & Conditions:", 20, 200);
  doc.text("• Space suit and safety equipment included", 25, 210);
  doc.text("• Zero-gravity training provided before departure", 25, 220);
  doc.text("• Cosmic insurance coverage included", 25, 230);
  doc.text(
    "• Cancellation allowed up to 30 Earth days before departure",
    25,
    240
  );
  doc.text("• Please arrive at the spaceport 3 days before departure", 25, 250);

  doc.setTextColor(0, 100, 200);
  doc.text("Thank you for choosing Cosmic Voyager!", 20, 270);
  doc.text("Contact: info@cosmicvoyager.space | +1-SPACE-TRAVEL", 20, 280);

  doc.save(`CosmicVoyager-Booking-${currentBookingCode}.pdf`);
}

document.getElementById("departure-date").min = new Date()
  .toISOString()
  .split("T")[0];

updateCost();
