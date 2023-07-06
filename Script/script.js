document.addEventListener("DOMContentLoaded", function() {
    const mechanicList = document.getElementById("mechanic-list");
    const mechanicInfo = document.getElementById("mechanic-info");
    const bookButton = document.getElementById("book-button");
  
    // Fetch mechanics from the local API
    function fetchMechanics() {
      fetch("http://localhost:3000/Mechanics")
        .then(response => response.json())
        .then(data => {
          renderMechanics(data);
        })
        .catch(error => {
          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
        });
    }
  
    // Render mechanics list
    function renderMechanics(mechanics) {
      mechanicList.innerHTML = "";
      mechanics.forEach(mechanic => {
        const mechanicCard = document.createElement("div");
        mechanicCard.classList.add("mechanic-card");
        mechanicCard.innerHTML = `
          <h3>${mechanic.name}</h3>
          <p>Area: ${mechanic.area}</p>
        `;
        mechanicCard.addEventListener("click", () => {
          showMechanicDetails(mechanic);
        });
        mechanicList.appendChild(mechanicCard);
      });
    }
  
    // Display mechanic details
    function showMechanicDetails(mechanic) {
      mechanicInfo.innerHTML = `
        <h3>${mechanic.name}</h3>
        <p>Area: ${mechanic.area}</p>
        <p>Skills: ${mechanic.skills.join(", ")}</p>
      `;
      bookButton.style.display = "block";
      bookButton.addEventListener("click", () => {
        bookService(mechanic);
      });
    }
  
    // Book service
    function bookService(mechanic) {
      const data = {
        mechanicId: mechanic.id,
        // Add any other required booking details
      };
  
      fetch("http://localhost:3000/book-service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          alert("Service booked successfully!");
          mechanicInfo.innerHTML = "";
          bookButton.style.display = "none";
        } else {
          alert("Error booking service. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
    }
  
    // Fetch mechanics when the page loads
    fetchMechanics();
  });