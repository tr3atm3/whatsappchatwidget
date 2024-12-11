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
      const svg = `
  <svg fill="#ffffff" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 52 52" xml:space="preserve">
    <g>
        <g>
            <path d="M26,0C11.663,0,0,11.663,0,26c0,4.891,1.359,9.639,3.937,13.762C2.91,43.36,1.055,50.166,1.035,50.237
			c-0.096,0.352,0.007,0.728,0.27,0.981c0.263,0.253,0.643,0.343,0.989,0.237L12.6,48.285C16.637,50.717,21.26,52,26,52
			c14.337,0,26-11.663,26-26S40.337,0,26,0z M26,50c-4.519,0-8.921-1.263-12.731-3.651c-0.161-0.101-0.346-0.152-0.531-0.152
			c-0.099,0-0.198,0.015-0.294,0.044l-8.999,2.77c0.661-2.413,1.849-6.729,2.538-9.13c0.08-0.278,0.035-0.578-0.122-0.821
			C3.335,35.173,2,30.657,2,26C2,12.767,12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"/>
            <path d="M42.985,32.126c-1.846-1.025-3.418-2.053-4.565-2.803c-0.876-0.572-1.509-0.985-1.973-1.218
			c-1.297-0.647-2.28-0.19-2.654,0.188c-0.047,0.047-0.089,0.098-0.125,0.152c-1.347,2.021-3.106,3.954-3.621,4.058
			c-0.595-0.093-3.38-1.676-6.148-3.981c-2.826-2.355-4.604-4.61-4.865-6.146C20.847,20.51,21.5,19.336,21.5,18
			c0-1.377-3.212-7.126-3.793-7.707c-0.583-0.582-1.896-0.673-3.903-0.273c-0.193,0.039-0.371,0.134-0.511,0.273
			c-0.243,0.243-5.929,6.04-3.227,13.066c2.966,7.711,10.579,16.674,20.285,18.13c1.103,0.165,2.137,0.247,3.105,0.247
			c5.71,0,9.08-2.873,10.029-8.572C43.556,32.747,43.355,32.331,42.985,32.126z M30.648,39.511
			c-10.264-1.539-16.729-11.708-18.715-16.87c-1.97-5.12,1.663-9.685,2.575-10.717c0.742-0.126,1.523-0.179,1.849-0.128
			c0.681,0.947,3.039,5.402,3.143,6.204c0,0.525-0.171,1.256-2.207,3.293C17.105,21.48,17,21.734,17,22c0,5.236,11.044,12.5,13,12.5
			c1.701,0,3.919-2.859,5.182-4.722c0.073,0.003,0.196,0.028,0.371,0.116c0.36,0.181,0.984,0.588,1.773,1.104
			c1.042,0.681,2.426,1.585,4.06,2.522C40.644,37.09,38.57,40.701,30.648,39.511z"/>
        </g>
    </g>
</svg>
`;
      
      
     
      icon.innerHTML = svg; 
      button.appendChild(icon);

      const text = document.createElement("span");
      text.innerText = config.ctaText;
      button.appendChild(text);

      button.addEventListener("click", () => { togglePopup()
                                               clearTimeout(toggleChatPopupTimer)
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
    var toggleChatPopupTimer = setTimeout(() => {
     togglePopup()
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
