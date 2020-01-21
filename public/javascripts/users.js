// Test start action
document.addEventListener(
  'DOMContentLoaded',
  () => {
    var color = 'lightblue';

    document.body.style.backgroundColor = color;

    console.log(`DOM content loaded, set body color to ${color}`);
  },
  false
);
