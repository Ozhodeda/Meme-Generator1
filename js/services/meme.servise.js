


var gMeme;

function createMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [{
            txt: 'I work on it',
            align: 'center',
            color: 'white',
            font: 'Impact',
             size: 20,
           
        },{
            txt: 'second line',
            align: 'center',
            color: 'white',
            font: 'Impact',
            size: 20,
        }
    ], stickers:[]
        
    }
}

function addLine() {
    gMeme.lines.push({
        txt: '',
        size: 20,
        align: 'center',
        color: 'black',
        strokeColor: 'white',
        font: 'Impact',
    })
    if (gMeme.selectedLineIdx <= 1) gMeme.selectedLineIdx = 2
    else gMeme.selectedLineIdx++
}

function deleteLine(lineIdx) {
    gMeme.lines.splice(lineIdx, 1)
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setSelectedLine(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx
}
function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0  
    else  gMeme.selectedLineIdx++ 
}

function changeText(text, lineIdx) {
    gMeme.lines[lineIdx].txt = text
}

function changeAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
  }

function changeFont(font) {
    const line = getSelectedLine()
    line.font = font
}


function changeFontColor(color, lineIdx) {
    gMeme.lines[lineIdx].color = color;
}

function changeStrokeColor(color, lineIdx) {
    gMeme.lines[lineIdx].strokeColor = color;
}

function changeFontColor(color, lineIdx) {
    gMeme.lines[lineIdx].color = color
}


function getMeme() {
    return gMeme
}