function showShortcuts(){
  let modal = createModal();

  let modalContent = createModalContent(modal);

  createCloseButton(modalContent, modal);
  let shortcuts = createShortcutsList();
  createShortcutsTable(modalContent, shortcuts);
}

function createModal() {
  let modal = createDiv();
  modal.id('shortcutsModal');
  modal.class('modal');
  modal.style('display', 'block');
  modal.style('position', 'fixed');
  modal.style('z-index', 1);
  modal.style('left', 0);
  modal.style('top', 0);
  modal.style('width', '100%');
  modal.style('height', '100%');
  modal.style('overflow', 'auto');
  modal.style('background-color', '#00000088');
  return modal;
}

function createModalContent(modal) {
  let modalContent = createDiv();
  modalContent.id('shortcutsModalContent');
  modalContent.class('modal-content');
  modalContent.parent(modal);
  modalContent.style('background-color', Colors.container);
  modalContent.style('margin', '15% auto');
  modalContent.style('padding', '20px');
  modalContent.style('border', '1px solid ' + Colors.states);
  modalContent.style('width', '30%');
  modalContent.style('color', Colors.ticks);
  modalContent.style('font-family', Dimensions.nameFont);
  return modalContent;
}

function createCloseButton(modalContent, modal) {
  let close = createSpan('&times;');
  close.parent(modalContent);
  close.class('close');
  close.style('float', 'right');
  close.style('font-size', '28');
  close.style('font-weight', 'bold');
  close.mouseReleased(
    function () {
      modal.remove();
    }
  );
}

function createShortcutsList() {
  const noPadding = '0px';
  const smallPadding = '5px';
  const bigPadding = '20px';

  let shortcuts = [
    { keyCombination: "W", description: 'Increase the length of selected high states by 1', paddingBottom: smallPadding },
    { keyCombination: "SHIFT + W", description: 'Increase the length of selected high states by 5', paddingBottom: bigPadding },
    { keyCombination: "S", description: 'Decrease the length of selected high states by 1', paddingBottom: smallPadding },
    { keyCombination: "SHIFT + S", description: 'Decrease the length of selected high states by 5', paddingBottom: bigPadding },
    { keyCombination: "A", description: 'Move selected high states to the left by 1', paddingBottom: smallPadding },
    { keyCombination: "SHIFT + A", description: 'Move selected high states to the left by 5', paddingBottom: bigPadding },
    { keyCombination: "D", description: 'Move selected high states to the right by 1', paddingBottom: smallPadding },
    { keyCombination: "SHIFT + D", description: 'Move selected high states to the right by 5', paddingBottom: bigPadding },
    { keyCombination: "X", description: 'Delete selected high states', paddingBottom: smallPadding },
    { keyCombination: "CTRL + CLICK", description: 'Select multiple high states', paddingBottom: noPadding }
  ];
  return shortcuts;
}

function createShortcutsTable(modalContent, shortcuts) {
  const shortcutsTableId = 'shortcutsTable';
  let table = createElement('table');
  table.parent(modalContent);
  table.id(shortcutsTableId);

  table = document.getElementById(shortcutsTableId);

  for (let shortcut of shortcuts) {
    let row = table.insertRow();

    let leftCell = row.insertCell();
    leftCell.style.color = Colors.ticks;
    leftCell.style.textAlign = 'right';
    leftCell.style.paddingRight = '20px';
    leftCell.style.paddingBottom = shortcut['paddingBottom'];
    let leftText = document.createTextNode(shortcut['keyCombination']);
    leftCell.appendChild(leftText);

    let rightCell = row.insertCell();
    rightCell.style.color = Colors.states;
    rightCell.style.paddingBottom = shortcut['paddingBottom'];
    let rightText = document.createTextNode(shortcut['description']);
    rightCell.appendChild(rightText);
  }
}
