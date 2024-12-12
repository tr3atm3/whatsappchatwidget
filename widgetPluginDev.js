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
      button.style.borderRadius = isOpen ? "100%" : `${config.borderRadius}px`;
      button.style.backgroundColor = config.buttonBackground;
      button.style.color = "white";
      button.style.padding = isOpen ? "8px 10px" : "8px 15px";
      button.style.display = "flex";
      button.style.alignItems = "center";
      button.style.gap = "10px";
      button.style.fontSize = "16px";
      button.style.cursor = "pointer";
      button.style.zIndex = "1000";
      button.style.border = "none";
      button.style.outline = "none";
      button.style.fontWeight = "600";

      const icon = document.createElement("span");
      icon.style.margin = "0";

      const svg = `
      <svg fill="#ffffff" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 308 308" xml:space="preserve">
    <g id="XMLID_468_">
        <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
		c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
		c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
		c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
		c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
		c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
		c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
		c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
		c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
		C233.168,179.508,230.845,178.393,227.904,176.981z"/>
        <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
		c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
		c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
		 M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
		l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
		c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
		C276.546,215.678,222.799,268.994,156.734,268.994z"/>
    </g>
</svg>
`;

      icon.innerHTML = svg;
      button.appendChild(icon);

      const text = document.createElement("span");
      text.innerText = config.ctaText;
      if (!isOpen) {
        button.appendChild(text);
      }

      button.addEventListener("click", () => {
        togglePopup();
        clearTimeout(toggleChatPopupTimer);
      });
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
      body.style.backgroundImage =
        'url("https://dev-engageto.s3.ap-south-1.amazonaws.com/ab66048c-5506-4dd5-b330-9124ee4d4bda_12/11/2024 13:19:52.jpg")';
      body.style.backgroundSize = "cover";
      body.style.backgroundBlendMode = "multiply";
      body.style.opacity = "0.5";

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
      poweredBy.style.display = "flex";
      poweredBy.style.alignItems = "center";
      poweredBy.style.justifyContent = "center";
      poweredBy.style.gap = "5px";
      const svgPoweredBy = `<svg fill="#B8860B" height="15px" width="16px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 32 32" xml:space="preserve">
<path d="M26.9,15.7C26.8,15.3,26.4,15,26,15h-6l3.9-11.7c0.1-0.4,0-0.9-0.4-1.1c-0.4-0.3-0.8-0.2-1.2,0l-17,13
	c-0.3,0.3-0.5,0.7-0.3,1.1C5.2,16.7,5.6,17,6,17h6L8.1,28.7c-0.1,0.4,0,0.9,0.4,1.1C8.6,29.9,8.8,30,9,30c0.2,0,0.4-0.1,0.6-0.2
	l17-13C26.9,16.5,27.1,16.1,26.9,15.7z"/>
</svg>`;
      const poweredByIcon = document.createElement("span");
      poweredByIcon.innerHTML = svgPoweredBy;
      const poweredByText = document.createElement("span");
      poweredByText.style.fontSize = "12px";
      poweredByText.innerText = "by Engageto";
      poweredBy.appendChild(poweredByIcon);
      poweredBy.appendChild(poweredByText);
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
    var toggleChatPopupTimer = setTimeout(() => {
      togglePopup();
    }, 5000);

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
