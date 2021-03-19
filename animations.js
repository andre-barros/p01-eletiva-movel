let buttons = document.querySelectorAll('.button');
let spans = document.querySelectorAll('.span');

buttons.forEach(button => {
  spans.forEach(span => {
      button.addEventListener('mouseenter', (e) => {
        let Y = e.pageY - button.offsetTop;
        let X = e.pageX - button.offsetLeft;
        span.style.top = Y+"px";
        span.style.left = X+"px";
      });
      button.addEventListener('mouseout', (e) => {
        let Y = e.pageY - button.offsetTop;
        let X = e.pageX - button.offsetLeft;
        span.style.top = Y+"px";
        span.style.left = X+"px";
      });
  });
});