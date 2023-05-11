import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js";
import { API_URL } from "../../settings.js";

let URL = API_URL+"/events/"

export async function initEvents(){
    await getEvents()

    const clickableRows = document.querySelectorAll('.clickable-row');

    clickableRows.forEach(row => {
        const eventId = row.dataset.eventId;

        row.addEventListener('click', () => {
            handleClick(eventId);
        });
    });
}

async function getEvents(){
    try {
        const events = await fetch(API_URL+"/events/").then(handleHttpErrors)
        makeList(events)
    } catch (error) {
        console.log(error)
    }
}

function makeList(events) {
    const eventRows = events.map(event => `
        <div class="row clickable-row" data-event-id="${event.id}" style="max-height: 150px; border-top: solid; padding-bottom: 5px; padding-left: 5px">
        <div className="col-2">
        <img src="${event.image}" style="width: 100%; height: auto; max-width: 150px; border: 1px solid black; object-fit: cover;">
        </div>
        <div className="col-3">
            <h4 style="padding-top: 2.9vw; font-size: 1.5vw"><b>${event.dateTime}</b> <br>${event.dateTime}</h4>
        </div>
        <div className="col-7" style="padding-top: 2.9vw">
            <h3 style="text-align: center; font-size: 2.5vw;"><b>${event.title}t</b></h3>
        </div>
        </div>
    `)
    document.getElementById("eventRows").innerHTML = sanitizeStringWithTableRows(eventRows)
}


async function handleClick(eventId) {
    console.log(`Række med ID ${eventId} blev klikket på!`);
    try {
        const event = await fetch(API_URL+"/events/" + eventId).then(handleHttpErrors)
        makeList(events)
    } catch (error) {
        console.log(error)
    }
}