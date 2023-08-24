'use strict'
let gElCanvas
let gCtx
var gCurrLine = null
var gIsLineClick = false
var gTouchEvents = ["touchstart", "touchmove", "touchend"]

function onInit() {
  gElCanvas = getEl('canvas')
  gCtx = gElCanvas.getContext('2d')
  toggleView()
  addListeners()
  resizeCanvas()
}

function toggleView() {
  removeClass("hide", "main-gallery")
  addClass("hide","canvas-container")
  addClass("hide","tools-container")
}

function onClickGallery() {
  removeClass("hide", "main-gallery")
  addClass("hide", "canvas-container")
  addClass("hide","tools-container")
}


function addListeners() {
  addMouseListeners()
  addTouchListeners()
  window.addEventListener("resize", () => {
    resizeCanvas()
    renderMeme()
   })
   gElCanvas.addEventListener('click', (event) => {
    isLineClick(event)
  })
  document.querySelector('.font-family').addEventListener('change', (event) => {
    onFontChange(event.target)
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      moveLine(event.key === 'ArrowUp' ? -1 : 1) // Move line up or down
    }
  })
}

function addMouseListeners() {
  gElCanvas.addEventListener("mousemove", onMove)
  gElCanvas.addEventListener("mousedown", onDown)
  gElCanvas.addEventListener("mouseup", onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener("touchmove", onMove)
  gElCanvas.addEventListener("touchstart", onDown)
  gElCanvas.addEventListener("touchend", onUp)
}

function onDown(ev) {
  const pos = getEvPos(ev)
  if (isLineClick(pos)) {
    gIsLineClick = true
    gCurrLine = getSelectedLine()
    document.querySelector("#txt-input").value = gCurrLine.txt
  } else if (isStickerClick(pos)) {
  } else if (isCanvasClick(pos)) {
    console.log("canvas clicked")
    setSelectedLine(-1)
  }
}

function onMove(ev) {
  const pos = getEvPos(ev)
  if (gIsLineClick) {
    moveLine(pos)
    renderMeme()
  }
}
function onUp() {
  gIsLineClick = true
}

function getEvPos(ev) {
  var pos = {
    posX: ev.offsetX,
    posY: ev.offsetY,
  }
  if (gTouchEvents.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      posX: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      posY: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}

function renderMeme() {
  const meme = getMeme()
  const elImg = new Image()
  elImg.src = `meme-imgs/${meme.selectedImgId}.jpg`
  elImg.onload = () => {
    coverCanvasWithImg(elImg)
    meme.lines.forEach((line, i) => {
      if (!line.x || !line.y) {
        line.x = gElCanvas.width / 2
        line.y =
          (gElCanvas.height / (meme.lines.length + 1)) * (i + 1) + line.size / 2
      }
      const isSelected = i === meme.selectedLineIdx

      drawText(line, isSelected)
    })
  }

  const elTextInput = document.querySelector('#txt-input')
  if (meme.lines.length && meme.lines[meme.selectedLineIdx])
    elTextInput.value = meme.lines[meme.selectedLineIdx].txt || ''
}


function coverCanvasWithImg(elImg) {
  gElCanvas.height =
    (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}


function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}

function isLineClick({ offsetX, offsetY }) {
  const meme = getMeme()

  meme.lines.forEach((line, i) => {
    const textWidth = gCtx.measureText(line.txt).width
    const textHeight = line.size

    if (
      offsetX >= line.x - textWidth / 2 &&
      offsetX <= line.x + textWidth / 2 &&
      offsetY >= line.y - textHeight / 2 &&
      offsetY <= line.y + textHeight / 2
    ) {
      meme.selectedLineIdx = i
      renderMeme()
    }
  })
}

function isStickerClick(clickedPos) {
  var meme = getMeme()
  var sticker = meme.stickers.find((sticker) => {
    return (
      clickedPos.x >= sticker.posX &&
      clickedPos.x <= sticker.posX + sticker.size &&
      clickedPos.y >= sticker.posY &&
      clickedPos.y <= sticker.posY + sticker.size
    )
  })
  if (sticker) {
    setSelectedSticker(meme.stickers.indexOf(sticker))
    console.log("sticker", sticker)
    return true
  }
  return false
}

function isCanvasClick(clickedPos) {
  var canvas = {
    posX: 0,
    posY: 0,
    size: gElCanvas.width,
  }
  if (
    clickedPos.x >= canvas.posX &&
    clickedPos.x <= canvas.posX + canvas.size &&
    clickedPos.y >= canvas.posY &&
    clickedPos.y <= canvas.posY + canvas.size
  ) {
    renderMeme()
    return true
  }
  return false
}


function drawText(line, isSelected) {
  gCtx.lineWidth = 3
  gCtx.strokeStyle = 'black'
  gCtx.textAlign = line.align
  gCtx.textBaseline = 'middle'
  const textHeight = 30
  const padding = 5

  let textWidth = gCtx.measureText(line.txt).width
  if (gMeme.selectedLineIdx === 0) textWidth *= 2.7

  if (isSelected) {
    let x = line.x
    if (line.align === 'center') {
      x = gElCanvas.width / 2 - textWidth / 2
    } else if (line.align === 'right') {
      x = gElCanvas.width / 2 - textWidth
    }
    gCtx.beginPath()
    gCtx.rect(
      x - padding,
      line.y - textHeight + padding,
      textWidth + 2 * padding,
      textHeight + 2 * padding + 10
    )
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 1
    gCtx.stroke()
    gCtx.strokeStyle = 'black'
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.fillStyle = line.color
    drawUnderline(line)
  } else {
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.fillStyle = line.color
    drawUnderline(line)
  }

  gCtx.strokeText(line.txt, line.x, line.y)
  gCtx.fillText(line.txt, line.x, line.y)
}

function drawUnderline(line) {
  const padding = 5
  let textWidth = gCtx.measureText(line.txt).width
  if (line.underline) {
    gCtx.beginPath()
    gCtx.moveTo(line.x - textWidth / 2, line.y + padding * 4)
    gCtx.lineTo(line.x + textWidth / 2, line.y + padding * 4)
    gCtx.lineWidth = 2
    gCtx.stroke()
  }
}


function onClickImg(imgId) {
  createMeme(imgId)
  renderMeme()
  addClass('hide', 'main-gallery')
  removeClass('hide', 'canvas-container')
  removeClass("hide","tools-container")
}

function moveLine(pos) {
  const selectedLine = getSelectedLine()
  selectedLine.y += pos * 10
  renderMeme()
}

function onChangeText(text) {
  var line = getSelectedLine()
  if (!line) return alert('please choose a line')
  changeText(text, getSelectedLineIdx())
  renderMeme()
}

function onAddLine() {
  addLine()
  renderMeme()
  const elTextInput =getEl('#txt-input')
 elTextInput.focus()
  elTextInput.value = ''
}

function onDeleteLine() {
  var lineIdx = getSelectedLineIdx()
  deleteLine(lineIdx)
  renderMeme()
}

function onSwitchLine() {
  switchLine()
 renderMeme()
}

function onChangeSize(diff) {
  changeFontSize(diff)
  renderMeme()
}

function onAlign(align) {
  changeAlign(align)
  renderMeme()
}

function onFontChange({ value }) {
  changeFont(value)
  renderMeme()
}

function onFontColor(color) {
  var line = getSelectedLine()
  if (!line) return alert('please choose a line')
  changeFontColor(color, getSelectedLineIdx())
  renderMeme()
}




function onDownloadCanvas(elLink) {
  const dataUrl = gElCanvas.toDataURL()
  elLink.href = dataUrl
  elLink.download = 'my-img'
}