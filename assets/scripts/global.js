/**
 * Set active navigation based on location
 */
document.addEventListener(
  'DOMContentLoaded',
  () => {
    var activeNavlink = document.querySelectorAll(
      'nav ul a[href^="/' + location.pathname.split('/')[1] + '"]'
    );
    console.log('Common', `Active nav link ${activeNavlink[0]}`);
    activeNavlink[0].classList.add('active');
  },
  false
);
