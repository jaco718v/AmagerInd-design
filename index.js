//import "https://unpkg.com/navigo" //Will create the global Navigo object used below
import "./navigo_EditedByLars.js" //Will create the global Navigo, with a few changes, object used below
//import "./navigo.min.js" //Will create the global Navigo object used below

import {
setActiveLink, adjustForMissingHash, renderTemplate, loadTemplate
} from "./utils.js"

import {initEvents} from "./pages/events/events.js"
import {initNews} from "./pages/news/news.js"

window.addEventListener("load", async () => {

const templateEvents = await loadTemplate("./pages/events/events.html")
const templateNews = await loadTemplate("./pages/news/news.html")

adjustForMissingHash()

const router = new Navigo("/", { hash: true });
//Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
window.router = router

router
.hooks({
before(done, match) {
setActiveLink("menu", match.url)
done()
}
})
.on({
"/events": () => {
renderTemplate(templateEvents, "content")
initEvents()
},
    "/news": () => {
        renderTemplate(templateNews, "content")
        initNews()
    }
})
.notFound(() => {
})
.resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
+ ' Column: ' + column + ' StackTrace: ' + errorObj);
}