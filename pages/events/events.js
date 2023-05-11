import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js";
import { API_URL } from "../../settings.js";

let URL = API_URL+"/events/"

export async function initEvents(){
    await getEvents()

    const clickableRows = document.querySelectorAll('.clickable-row');
    var popupClose = document.querySelector('.popup-close');

    clickableRows.forEach(row => {
        const eventId = row.dataset.eventId;

        row.addEventListener('click', () => {
            handleClick(eventId);
        });
    });

    popupClose.addEventListener('click', function() {
        document.getElementById("popup").style.display = 'none';
    });
}

async function getEvents(){
    try {
        const events = await fetch(API_URL+"/events/?sort=dateTime").then(handleHttpErrors)
        makeList(events)
    } catch (error) {
        console.log(error)
    }
}

function makeList(events) {
    const eventRows = events.map(event => `
        <div class="row clickable-row" data-event-id="${event.id}" style="max-height: 150px; border-top: solid; padding-bottom: 5px; padding-left: 5px">
            <div class="col-2" style="padding-top: 5px">
                <img src="data:image/jpeg;base64,${event.encodedImage}" style="width: 100%; max-height: 9vw; max-width: 150px; border: 1px solid black; object-fit: cover; object-position: top">
            </div>
            <div class="col-3">
                <h4 style="padding-top: 3.2vw; font-size: 1.5vw"><b>${event.dateMonth}</b> <br>${event.dayTime}</h4>
            </div>
            <div class="col-7" style="padding-top: 3.2vw">
                <h3 style="text-align: center; font-size: 2.5vw;"><b>${event.title}</b></h3>
            </div>
        </div>
    `)
    const sanitizedEventRows = sanitizeStringWithTableRows(eventRows.join(''))
    document.getElementById("eventRows").innerHTML = sanitizedEventRows
}


async function handleClick(eventId) {
    console.log(`Række med ID ${eventId} blev klikket på!`);
    document.getElementById("popup").style.display ="block"
    try {
        const event = await fetch(API_URL+"/events/" + eventId).then(handleHttpErrors)
        setUpEventSite(event)
        document.getElementById("popup").style.display ="block"
    } catch (error) {
        console.log(error)
    }
}

function setUpEventSite(event) {
    const eventSite = `
            <div class="row">
                <div class="col-6">
                <img src="data:image/jpeg;base64,${event.encodedImage}" style="width: 100%; object-fit: none; object-position: top; max-height: 21vw; border: 1px solid black; object-fit: cover;">
                </div>
                <div class="col-6">
                    <h3 style="padding-top: 6.5vw; text-align: center; font-size: 3.2vw;"><b>${event.title}</b></h3>
                    <h4 style="padding-top: 2.6vw; font-size: 2.2vw"><b>${event.dateMonth}</b> <br> ${event.dayTime}</h4>
                </div>
            </div>
            <div style="padding-top: 1.7vw">
                <p style="font-size: 1.3vw">${event.description}</p>
            </div>
    `
    document.getElementById("popup-content").innerHTML = sanitizeStringWithTableRows(eventSite);
}