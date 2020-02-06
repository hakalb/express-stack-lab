/**
 * Set active navigation based on location
 */
document.addEventListener(
  'DOMContentLoaded',
  () => {
    scrollToTop();
    const activeNavlink = document.querySelectorAll(
      'nav ul a[href^="/' + location.pathname.split('/')[1] + '"]'
    );
    console.log('Common', `Active nav link ${activeNavlink[0]}`);
    activeNavlink[0].classList.add('active');

    document.getElementById('backToTop').onclick = event => {
      event.preventDefault();
      scrollToTop();
      return false;
    };
  },
  false
);

/**
 * Listen to scroll events and fade in/out back to top button
 */
$(window).scroll(() => {
  const height = $(window).scrollTop();
  if (height > 100) {
    $('#backToTop').fadeIn();
  } else {
    $('#backToTop').fadeOut();
  }
});

/**
 * Scroll to top of page
 */
function scrollToTop() {
  window.scrollTo({ top: 0 });
}
