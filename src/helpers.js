
function timeConvert(minutes) {
    const hours = minutes / 60 > 2 ? " hours " : " hour "
    const mins = minutes % 60 !== 0 ? minutes % 60 + " mins" : ""
    if (minutes > 59) {
        return Math.floor(minutes / 60) + hours + mins
    } else {
        return minutes + " minutes"
    }
}

function shortener(text, length) {
    return text.length > length ? text.slice(0, length - 3) + "..." : text
}

export { timeConvert, shortener }