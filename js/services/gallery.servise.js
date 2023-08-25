'use strict'

let gCounterImages = 1
var gImgs = [
    { id: 1, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['funny', 'celeb'] },
    { id: 2, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['cute', 'dog', 'animal'] },
    { id: 3, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['cute', 'dog', 'baby', 'animal'] },
    { id: 4, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['lazy', 'cat', 'animal'] },
    { id: 5, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['funny', 'baby'] },
    { id: 6, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['funny', 'awkward'] },
    { id: 7, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['funny', 'baby'] },
    { id: 8, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['funny', 'celeb', 'happy'] },
    { id: 9, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['baby', 'funny', 'cute'] },
    { id: 10, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['funny', 'caleb'] },
    { id: 11, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['player', 'kiss', 'happy'] },
    { id: 12, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['caleb', 'old man'] },
    { id: 13, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['caleb', 'actor'] },
    { id: 14, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['actor', 'serious'] },
    { id: 15, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['actor', 'famous'] },
    { id: 16, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['funny', 'old man', 'happy'] },
    { id: 17, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: ['serious', 'famous'] },
    { id: 18, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: [] },
    { id: 19, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: [] },
    { id: 20, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: [] },
    { id: 21, url: `meme-imgs/${gCounterImages++}.jpg`, keywords: [] },
]

let gKeywords = { 'happy': 12, 'funny puk': 1 }

function getImgs() {
    return gImgs;
  }
  