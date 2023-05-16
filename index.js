//import "https://unpkg.com/navigo" //Will create the global Navigo object used below
import "./navigo_EditedByLars.js"; //Will create the global Navigo, with a few changes, object used below
//import "./navigo.min.js" //Will create the global Navigo object used below

import {
  setActiveLink,
  adjustForMissingHash,
  renderTemplate,
  loadTemplate,
} from "./utils.js";


import { initEvents } from "./pages/events/events.js";
import { initNews } from "./pages/news/news.js";

window.addEventListener("load", async () => {
  const templateEvents = await loadTemplate("./pages/events/events.html");
  const templateServices = await loadTemplate("./pages/services/services.html");
  const templateAbout = await loadTemplate("./pages/about/about.html");
  const templateNews = await loadTemplate("./pages/news/news.html");

  adjustForMissingHash();

  const router = new Navigo("/", { hash: true });
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router;

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url);
        done();
      },
    })
    .on({
      "/events": () => {
        renderTemplate(templateEvents, "content");
        document.getElementById("title").innerText = "events";
        document.getElementById("news-box").style.display = "none";
        document.getElementById(
          "top-box"
        ).style.backgroundImage = `url("./images/2.jpg")`;
        initEvents();
      },
      "/services": () => {
        renderTemplate(templateServices, "content");
        document.getElementById("title").innerText = "Services";
        document.getElementById("news-box").style.display = "none";
        document.getElementById(
          "top-box"
        ).style.backgroundImage = `url("./images/3.jpg")`;
      },
      "/about": () => {
        renderTemplate(templateAbout, "content");
        document.getElementById("title").innerText = "Om Os";
        document.getElementById("news-box").style.display = "none";
        document.getElementById(
          "top-box"
        ).style.backgroundImage = `url("./images/4.jpg")`;
      },
      "/news": () => {
        renderTemplate(templateNews, "content");
        initNews();
      },
    })
    .notFound(() => {})
    .resolve();
});

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert(
    "Error: " +
      errorMsg +
      " Script: " +
      url +
      " Line: " +
      lineNumber +
      " Column: " +
      column +
      " StackTrace: " +
      errorObj
  );
};
