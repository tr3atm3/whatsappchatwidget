/* eslint-disable no-restricted-globals */
try {
  const widgetId = document
    .getElementById("engageto-wa-widget")
    .getAttribute("widget-id");
  const env = document.getElementById("engageto-wa-widget").getAttribute("env");
  if (!widgetId || widgetId == null) {
    throw new Error("Widget is invalid");
  }
  // console.log("Loading script");
  const s = document.createElement("script");
  s.src = "https://tr3atm3.github.io/whatsappchatwidget/widgetPluginDev.js";
  // s.src = "https://dev-engageto.s3.ap-south-1.amazonaws.com/whatsapp-widget-ui.js";
  s.type = "text/javascript";
  s.async = true;
  s.id = "df-script";
  // console.log(s);

  // Load Poppins font;
  const url =
    "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap";
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);

  // Fetch widget details

  var engagetoWidgetOptions = null;

  var xhr = new XMLHttpRequest();
  if (env === "development") {
    xhr.open(
      "GET",
      "https://connect.engagetoq.in/api/Widgets/get?id=" + widgetId,
      true
    );
  } else if (env === "production") {
    xhr.open(
      "GET",
      "https://connect.engageto.in/api/Widgets/get?id=" + widgetId,
      true
    );
  }

  // xhr.open("GET", "http://localhost:5000/widget-details/" + widgetId, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  xhr.onload = function () {
    if (this.status === 200) {
      var data = JSON.parse(this.responseText);
      console.log(data);
      if (data.phoneNumber) {
        engagetoWidgetOptions = data;
        console.log(engagetoWidgetOptions);
      } else {
        // Req successful but empty data is returned
        throw new Error("Invalid widget details");
      }

      s.onload = function () {
        console.log("Loaded script");

        if (engagetoWidgetOptions != null) {
          window.CreateWhatsAppButtonAndWidget(engagetoWidgetOptions);
        }

        // Register event listener for url change
        history.pushState = ((f) =>
          function pushState() {
            var ret = f.apply(this, arguments);
            window.dispatchEvent(new Event("pushstate"));
            window.dispatchEvent(new Event("locationchange"));
            return ret;
          })(history.pushState);

        history.replaceState = ((f) =>
          function replaceState() {
            var ret = f.apply(this, arguments);
            window.dispatchEvent(new Event("replacestate"));
            window.dispatchEvent(new Event("locationchange"));
            return ret;
          })(history.replaceState);

        window.addEventListener("popstate", () => {
          window.dispatchEvent(new Event("locationchange"));
        });

        // Listen for url change
        window.addEventListener("locationchange", () => {
          console.log("Location changed");
          if (engagetoWidgetOptions != null) {
            window.CreateWhatsAppButtonAndWidget({ ...engagetoWidgetOptions });
          }
        });
      };
      document.body.appendChild(s);
    } else {
      console.log(`Error ${xhr.status}: ${xhr.statusText}`);
    }
  };
} catch (err) {
  console.log(err);
}
