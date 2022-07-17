function showShortcuts(){
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

  let modalContent = createDiv();
  modalContent.id('shortcutsModalContent');
  modalContent.class('modal-content');
  modalContent.parent(modal);
  modalContent.style('background-color', Colors.container);
  modalContent.style('margin', '15% auto');
  modalContent.style('padding', '20px');
  modalContent.style('border', '1px solid ' + Colors.states);
  modalContent.style('width', '50%');
  modalContent.style('color', Colors.ticks);
  modalContent.style('font-family', Dimensions.nameFont);


  let text = createP('Shortcuts');
  text.parent(modalContent);
}