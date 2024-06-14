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
                fieldContent = 'O';
            } else if (fieldClass === 'cross') {
                fieldContent = 'X';
            }
            
            tableHTML += `<td class="${fieldClass || ''}">${fieldContent}</td>`;
        }
        tableHTML += '</tr>';
    }
    
    tableHTML += '</table>';
    container.innerHTML = tableHTML;
}

