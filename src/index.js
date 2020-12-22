import './style.scss';

(() => {

  const colorPicker = document.querySelector('.color-picker');
  const colorPickerItems = document.querySelectorAll('.color-picker__item');

  let currentItem = -1;

  let isShift = false;
  let isTab = false;

  document.addEventListener('keydown', (evt) => {
    evt.preventDefault();

    if ( evt.code === 'ShiftLeft' ) isShift = true;
    if ( evt.code === 'Tab' && isShift ) {
      isTab = true;
      colorPicker.classList.add('color-picker--active');
      changeItem();
    };
  });

  document.addEventListener('keyup', (evt) => {


    const keyUp = evt.code === 'ShiftLeft';

    if ( !keyUp ) return;

    evt.preventDefault();

    isShift = false;
    isTab = false;

    changeBackground();

    colorPicker.classList.remove('color-picker--active');
  });

  function changeItem() {
    const nextItem = currentItem + 1;

    currentItem = nextItem === colorPickerItems.length ? 0 : nextItem;

    colorPickerItems.forEach((el, index) => {
      el.classList.toggle('color-picker__item--active', index === currentItem);
    });
  };

  const changeBackground = () => {
    const itemBackground = getBackgroundColor(colorPickerItems[currentItem]);
    document.body.style.backgroundColor = itemBackground;
  };

  function getBackgroundColor(el) {
    return el.style.backgroundColor || document.defaultView.getComputedStyle(el, null)['background-color'];
  };

})();
