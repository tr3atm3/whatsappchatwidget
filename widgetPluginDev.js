(function () {
  function CreateWhatsAppButtonAndWidget(config) {
    let isOpen = false;
    const currentDomain = window.location.href;
    const isSourceDomain = config.urlFields.filter((url) =>
      url.sourceUrl.includes(currentDomain)
    )[0];
    

    const createButton = () => {
      const button = document.createElement("button");
      button.style.position = "fixed";
      button.style.bottom = "20px";
      button.style[config.position === "bottom-left" ? "left" : "right"] =
        "20px";
      button.style.borderRadius = `${config.borderRadius}px`;
      button.style.backgroundColor = config.buttonBackground;
      button.style.color = "white";
      button.style.padding = "10px 20px";
      button.style.display = "flex";
      button.style.alignItems = "center";
      button.style.gap = "10px";
      button.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      button.style.cursor = "pointer";
      button.style.zIndex = "1000";

      const icon = document.createElement("span");
      icon.innerText = "💬"; // Replace with any WhatsApp icon or emoji.
      button.appendChild(icon);

      const text = document.createElement("span");
      text.innerText = config.ctaText;
      button.appendChild(text);

      button.addEventListener("click", togglePopup);
      return button;
    };

    const createPopup = () => {
      const popup = document.createElement("div");
      popup.style.position = "fixed";
      popup.style.bottom = "80px";
      popup.style[config.position === "bottom-left" ? "left" : "right"] =
        "20px";
      popup.style.width = "300px";
      popup.style.borderRadius = "10px";
      popup.style.overflow = "hidden";
      popup.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
      popup.style.backgroundColor = "#E5E5E5";
      popup.style.zIndex = "1000";

      const header = document.createElement("div");
      header.style.display = "flex";
      header.style.alignItems = "center";
      header.style.justifyContent = "space-between";
      header.style.padding = "10px";
      header.style.backgroundColor = config.brandColor;

      const brandInfo = document.createElement("div");
      brandInfo.style.display = "flex";
      brandInfo.style.alignItems = "center";

      const brandImage = document.createElement("img");
      brandImage.src = isSourceDomain?.id
        ? isSourceDomain?.brandImageUrl || config.brandImageUrl || ""
        : config.brandImageUrl || "";
      brandImage.alt = config.brandName || "Brand Logo";
      brandImage.style.width = "32px";
      brandImage.style.height = "32px";
      brandImage.style.borderRadius = "50%";
      brandImage.style.marginRight = "8px";

      const brandText = document.createElement("div");
      brandText.style.display = "flex";
      brandText.style.flexDirection = "column";
      const brandName = document.createElement("span");
      brandName.innerText = config.brandName;
      brandName.style.color = "white";
      brandName.style.fontSize = "14px";
      brandText.appendChild(brandName);

      const brandSubtitle = document.createElement("span");
      brandSubtitle.innerText = config.brandSubtitle;
      brandSubtitle.style.color = "white";
      brandSubtitle.style.fontSize = "12px";
      brandText.appendChild(brandSubtitle);

      brandInfo.appendChild(brandImage);
      brandInfo.appendChild(brandText);

      const closeButton = document.createElement("button");
      closeButton.innerText = "✕";
      closeButton.style.backgroundColor = "transparent";
      closeButton.style.border = "none";
      closeButton.style.color = "white";
      closeButton.style.cursor = "pointer";
      closeButton.addEventListener("click", togglePopup);

      header.appendChild(brandInfo);
      header.appendChild(closeButton);

      const body = document.createElement("div");
      body.style.height = "200px";
      body.style.overflowY = "auto";
      body.style.padding = "10px";
      body.style.backgroundImage = 'url("/images/whatsappBG.jpg")';
      body.style.backgroundSize = "cover";

      const messageBubble = document.createElement("div");
      messageBubble.style.backgroundColor = "white";
      messageBubble.style.borderRadius = "10px";
      messageBubble.style.padding = "10px";
      messageBubble.style.marginBottom = "10px";

      const message = document.createElement("span");
      message.innerHTML = isSourceDomain?.id
        ? isSourceDomain?.onScreenMessage.replace(/\n/g, "<br>") ||
          config.defaultOnScreenMessage.replace(/\n/g, "<br>")
        : config.defaultOnScreenMessage.replace(/\n/g, "<br>");
      messageBubble.appendChild(message);

      body.appendChild(messageBubble);

      const footer = document.createElement("div");
      footer.style.padding = "10px";
      footer.style.textAlign = "center";

      const startButton = document.createElement("button");
      startButton.innerText = config.widgetCtaText;
      startButton.style.backgroundColor = config.buttonBackground;
      startButton.style.color = "white";
      startButton.style.border = "none";
      startButton.style.borderRadius = "5px";
      startButton.style.padding = "10px";
      startButton.style.width = "100%";
      startButton.style.cursor = "pointer";
      startButton.addEventListener("click", () => {
        window.open(
          `https://api.whatsapp.com/send?phone=${config.phoneNumber}&text=${
            isSourceDomain
              ? isSourceDomain?.preFilledMessage || config.defaultMessage
              : config.defaultMessage
          }`,
          "_blank"
        );
      });

      const poweredBy = document.createElement("p");
      poweredBy.innerText = `⚡ by Engageto`;
      poweredBy.style.margin = "5px";

      footer.appendChild(startButton);
      footer.appendChild(poweredBy);

      popup.appendChild(header);
      popup.appendChild(body);
      popup.appendChild(footer);
      return popup;
    };

    const togglePopup = () => {
      isOpen = !isOpen;
      render();
    };

    const render = () => {
      const existingButton = document.getElementById("chat-popup-button");
      const existingPopup = document.getElementById("chat-popup");

      if (existingButton) existingButton.remove();
      if (existingPopup) existingPopup.remove();

      const button = createButton();
      button.id = "chat-popup-button";
      document.body.appendChild(button);

      if (isOpen) {
        const popup = createPopup();
        popup.id = "chat-popup";
        document.body.appendChild(popup);
      }
    };

    render();
  }

  window.CreateWhatsAppButtonAndWidget = CreateWhatsAppButtonAndWidget;
})();
