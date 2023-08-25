'use strict'

const gTrans={
    'logo':{
        en:'Meme-Generator',
        he:'מחולל ממים'
    },
    'a-gallery':{
        en:'gallery',
        he:'גלריה'
    },
    'a-meme':{
        en:'My-Memes',
        he:'הממים שלי'
    },
    'a-about':{
        en:'About',
        he:'אודות'
    },
    'h3-gallery':{
        en:'My-Gallery',
        he:'הגלריה שלי'
    },
    'search-checkbox':{
        en:'Search',
        he:'חיפוש',
    },
    'span-keywords':{
        en:'funny serious man baby cute caleb',
        he:'מצחיק רציני גבר תינוק חמוד סלב'
    },
    'h3-memes':{
        en:'My-Memes',
        he:'המם שלי'
    },
    'h3-tools':{
        en:'My-Tools',
        he:`הכלים שלי`
    },
    'input-checkbox':{
        en:'write something',
        he:'כתוב משהו..'
    },
    'btn-f':{
        en:'Share on Facebook',
        he:'שתף בפייסבוק'
    },
    'btn-s':{
        en:'Save to my Meme',
        he:'שמור לממים שלי'
    }
}

var gCurrLang = 'en'

function getTrans(transKey) {
    // console.log('transKey:', transKey) // 'sure'
    // get from gTrans
    const transMap = gTrans[transKey] // {'en':,'es:','he':}
    // if key is unknown return 'UNKNOWN'
    if (!transMap) return 'UNKNOWN'
    let transTxt = transMap[gCurrLang]
    // If translation not found - use english
    if (!transTxt) transTxt = transMap.en
    return transTxt
}

function doTrans() {
    // get the data-trans and use getTrans to replace the innerText
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        // console.log('el:', el)
        const transKey = el.dataset.trans
        console.log('transKey:', transKey)
        const transTxt = getTrans(transKey)
        console.log('transTxt:', transTxt)
        // support placeholder 
        if (el.placeholder) el.placeholder = transTxt
        else el.innerText = transTxt
    })
}

function setLang(lang) {
    gCurrLang = lang
}
