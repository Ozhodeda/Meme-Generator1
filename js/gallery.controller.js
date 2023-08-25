
'use strict'
function onInitGallery(){
    renderImages()
}

function renderGallery(){
    renderImages()
}
function renderImages(){
    let strHtml = ''
    gImgs.forEach(img => strHtml += `
        <div class="gallery-item">
        <img src="${img.url}" onclick="onClickImg(${img.id})">
        </div>`
    )
    setElHtml('gallery', strHtml)
}

function onSetLang(lang) {
    setLang(lang)
    // if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans()
}

function onSetFilterBy(value, ev) {
    let imgs = getImgs()
    let filteredImgs = imgs.filter(function (img) {
      return img.keywords.some((keyword) => keyword.includes(value))
    })
    let strHtmls = filteredImgs.map(function (img) {
      return `<img src="${img.url}" onclick="onClickImg(${img.id})">`
    })
    document.querySelector(".gallery").innerHTML = strHtmls.join("")
    const clicks = parseInt(ev.dataset.clicks)
    ev.dataset.clicks = clicks + 1
    const fontSize = 1 + clicks * 0.05 + "rem"
  ev.style.fontSize = fontSize
  }
  