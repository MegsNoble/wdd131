document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const description = item.querySelector("p").textContent;
            showDescriptionPopup(description);
        });
    });

    function showDescriptionPopup(description) {
        // Create a modal or popup
        const modal = document.createElement("div");
        modal.classList.add("popup");
        modal.innerHTML = `
            <div class="popup-content">
                <span class="close-btn">&times;</span>
                <p>${description}</p>
            </div>
        `;
        document.body.appendChild(modal);

        // Close modal logic
        const closeButton = modal.querySelector(".close-btn");
        closeButton.addEventListener("click", () => {
            document.body.removeChild(modal);
        });

        // Close on clicking outside the modal
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
});
