const eventsMap = {};
const eventQueueMap = {};

let eventId = 1;

function on(eventName, callback) {

    if (!eventQueueMap[eventName]) {
        eventQueueMap[eventName] = [];
    }

    const queue = eventQueueMap[eventName];

    eventId += 1;
    queue.push(eventId);

    eventsMap['e' + eventId] = callback;

    return eventId;
}

function off(eventId) {
    delete eventsMap['e' + eventId];
}

function post(eventName, eventArgs) {
    const queue = eventQueueMap[eventName];
    if (!queue) {
        return;
    }

    queue.map((eventId, idx) => {
        const callback = eventsMap['e' + eventId];
        if (callback) {
            callback(eventArgs);
        }
    });
}

export default {
    on,
    off,
    post,
};
