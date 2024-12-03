// WhatsAppChatButton.js
function createWhatsAppButton(phoneNumber) {
  const button = document.createElement("a");
  button.href = `https://wa.me/${phoneNumber}`;
  button.target = "_blank";
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.backgroundColor = "#25D366";
  button.style.borderRadius = "50%";
  button.style.padding = "15px";
  button.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  button.style.zIndex = "1000";

  const icon = document.createElement("img");
  icon.src = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";
  icon.alt = "Chat with us on WhatsApp";
  icon.style.width = "40px";
  icon.style.height = "40px";

  button.appendChild(icon);
  document.body.appendChild(button);
}

window.createWhatsAppButton = createWhatsAppButton;
