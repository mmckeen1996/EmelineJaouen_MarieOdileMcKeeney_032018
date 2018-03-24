// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

var bar1 = new ProgressBar.Circle(Round1, {
  strokeWidth: 6,
  easing: 'easeInOut',
  duration: 1400,
  color: '#0F7173',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: null
});

var bar2 = new ProgressBar.Circle(Round2, {
  strokeWidth: 6,
  easing: 'easeInOut',
  duration: 1400,
  color: '#92BFB1',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: null
});

var bar3 = new ProgressBar.Circle(Round3, {
  strokeWidth: 6,
  easing: 'easeInOut',
  duration: 1400,
  color: '#26FFE6',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: null
});

var bar4 = new ProgressBar.Circle(Round4, {
  strokeWidth: 6,
  easing: 'easeInOut',
  duration: 1400,
  color: '#B5FFE1',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: null
});

var bar5 = new ProgressBar.Circle(Round5, {
  strokeWidth: 6,
  easing: 'easeInOut',
  duration: 1400,
  color: '#EB5E55',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: null
});

var bar6 = new ProgressBar.Circle(Round6, {
  strokeWidth: 6,
  easing: 'easeInOut',
  duration: 1400,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: null
});


bar1.animate(0.7);  // Number from 0.0 to 1.0

bar2.animate(0.55);  // Number from 0.0 to 1.0

bar3.animate(0.52);  // Number fr

bar4.animate(0.55);  // Number from 0.0 to 1.0

bar5.animate(0.6);  // Number from 0.0 to 1.0

bar6.animate(0.4);  // Number fr
