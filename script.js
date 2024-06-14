let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];


let currentPlayer = 'circle';


let winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
];


function init() {
    render();
}


function render() {
    let container = document.getElementById('container');
    let tableHTML = '<table>';
    
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            let fieldIndex = i * 3 + j;
            let fieldClass = fields[fieldIndex];
            let fieldContent = '';
            
            if (fieldClass === 'circle') {
                fieldContent = generateAnimatedCircleSVG();
            } else if (fieldClass === 'cross') {
                fieldContent = generateAnimatedCrossSVG();
            }
            
            tableHTML += `<td class="${fieldClass || ''}" onclick="handleClick(${fieldIndex}, this)">${fieldContent}</td>`;        }
        tableHTML += '</tr>';
    }
    
    tableHTML += '</table>';
    container.innerHTML = tableHTML;
}


function handleClick(index, element) {
    if (fields[index] !== null) {
        return;
    }

    fields[index] = currentPlayer;

    if (currentPlayer === 'circle') {
        element.innerHTML = generateAnimatedCircleSVG();
        currentPlayer = 'cross';
    } else {
        element.innerHTML = generateAnimatedCrossSVG();
        currentPlayer = 'circle';
    }

    element.onclick = null;

    if (checkGameOver()) {
        setTimeout(() => drawWinningLine(), 500); // Warte, bis die Animation abgeschlossen ist
    }
}


function generateAnimatedCircleSVG() {
    return `
    <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" fill="none" stroke="cyan" stroke-width="8" 
                stroke-dasharray="283" stroke-dashoffset="283">
            <animate attributeName="stroke-dashoffset" from="283" to="0" dur="0.5s" fill="freeze" />
        </circle>
    </svg>`;
}


function generateAnimatedCrossSVG() {
    return `
    <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="20" x2="80" y2="80" stroke="yellow" stroke-width="8">
            <animate attributeName="stroke-dasharray" from="0, 100" to="100, 100" dur="0.5s" fill="freeze" />
        </line>
        <line x1="80" y1="20" x2="20" y2="80" stroke="yellow" stroke-width="8">
            <animate attributeName="stroke-dasharray" from="0, 100" to="100, 100" dur="0.5s" fill="freeze" />
        </line>
    </svg>`;
}


function checkGameOver() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return combination; // Return the winning combination
        }
    }

    return null;
}

function drawWinningLine() {
    const winningCombination = checkGameOver();
    if (!winningCombination) return;

    const container = document.getElementById('container');
    const table = container.querySelector('table');
    const svgNS = "http://www.w3.org/2000/svg";

    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('stroke', 'white');
    line.setAttribute('stroke-width', '5');
    line.setAttribute('x1', getPositionX(winningCombination[0]));
    line.setAttribute('y1', getPositionY(winningCombination[0]));
    line.setAttribute('x2', getPositionX(winningCombination[2]));
    line.setAttribute('y2', getPositionY(winningCombination[2]));
    
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '300');
    svg.setAttribute('height', '300');
    svg.setAttribute('style', 'position: absolute; pointer-events: none;');
    svg.appendChild(line);

    container.appendChild(svg);
}

function getPositionX(index) {
    const column = index % 3;
    return 50 + column * 100; // Adjust the positions as needed
}

function getPositionY(index) {
    const row = Math.floor(index / 3);
    return 50 + row * 100; // Adjust the positions as needed
}