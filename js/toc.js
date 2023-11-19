document.addEventListener('DOMContentLoaded', function () {
  var toc = document.getElementById('toc');
  var headers = document.querySelectorAll('.e-content h1, .e-content h2');
  if(headers.length == 0){
    var wrap = document.getElementById('toc-wrap');
    wrap.classList.add('hidden');
    return;
  }

  var tocLinks = [];

  var curLevel1, curLevel2, curLevel3;
  var prevLevel = 0;
  var prevItem = toc;

  headers.forEach(function (header) {
    // make link for header
    var link = document.createElement('a');
    link.textContent = header.textContent;
    link.href = '#' + header.id;
    link.classList.add('toc-link');
    link.addEventListener('click', function (event) {
      event.preventDefault();
      var targetId = this.getAttribute('href').substring(1);
      var targetElement = document.getElementById(targetId);
      targetElement.scrollIntoView({ behavior: 'smooth' });
    });
    tocLinks.push(link);

    var subItem = document.createElement('li');
    subItem.appendChild(link);

    var level = parseInt(header.tagName.charAt(1));
    if(level === 1){
      if(prevLevel < 1){
        curLevel1 = document.createElement('ul');
        prevItem.appendChild(curLevel1);
      }
      link.classList.add('level1');
      curLevel1.appendChild(subItem);

      prevLevel = 1;
    }
    else if(level === 2){
      if(prevLevel < 2){
        curLevel2 = document.createElement('ul');
        prevItem.appendChild(curLevel2);
      }
      link.classList.add('level2');
      link.classList.add('hidden');
      curLevel2.appendChild(subItem);

      prevLevel = 2;
    }
    /*
    else if(level === 3){
      if(prevLevel < 3){
        curLevel3 = document.createElement('ul');
        prevItem.appendChild(curLevel3);
      }
      link.classList.add('level3');
      curLevel3.appendChild(subItem);

      prevLevel = 3;
    }
    */
    prevItem = subItem;
  });

  var nav = document.getElementById('nav');

  window.addEventListener('scroll', function () {
    tocLinks.forEach(function (link) {
      if (link.classList.contains('level1')) {
        var linkWrap = link.parentElement;
        var childlist = linkWrap.querySelectorAll('.level2');

        if (link.classList.contains('reach')) {
          childlist.forEach(function (child) {
            child.classList.remove('hidden');
          });
        }
        else {
          childlist.forEach(function (child) {
            child.classList.add('hidden');
          });
        }
      }
    });

    var scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition === 0) {
      tocLinks.forEach(function (link) {
        link.classList.remove('active');

        if (link.classList.contains('level1')) {
          link.classList.remove('reach');
        }
      });
    }
    else if (scrollPosition + window.innerHeight >= document.documentElement.scrollHeight - 5) {
      tocLinks.forEach(function (link) {
        link.classList.remove('active');
      });
      tocLinks[tocLinks.length-1].classList.add('active');
    }
    else {
      headers.forEach(function (header, index) {
        var Top = header.offsetTop + nav.offsetHeight - 10;

        if (scrollPosition > Top) {
          tocLinks.forEach(function (link) {
            link.classList.remove('active');

            if (tocLinks[index].classList.contains('level1')) {
              link.classList.remove('reach');
            }
          });

          tocLinks[index].classList.add('active');

          if (tocLinks[index].classList.contains('level1')) {
            tocLinks[index].classList.add('reach');
          }
        }
      });
    }
  });
});