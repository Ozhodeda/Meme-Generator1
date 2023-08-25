"use strict"

let STORAGE_KEY = "memsDB"

function onSaveMeme() {
    let memes = loadFromStorage(STORAGE_KEY)
    if (!memes) memes = []
    let meme = getMeme()
    meme.id = makeId()
    memes.push(meme)
    saveToStorage(STORAGE_KEY, memes)
}

function getMemes() {
    return loadFromStorage(STORAGE_KEY)
}