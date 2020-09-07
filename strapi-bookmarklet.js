javascript:(
    function initOverlay() {
    // set basic variables
    var components = document.querySelectorAll('.component_name');
    var styleTag = document.createElement('style');
    var url = window.location.pathname;
    var overlayCss = `
    .custom-overlay ~ label + div { 
        height: 80px;
        overflow: hidden;
        position: relative
      }
      .custom-overlay ~ label + div::after {
          display: block;
          content: '';
          width: 100%;
          background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
          height: 100%;
          position: absolute;
          top: 0;
          z-index: 1;
        }
    `;
    var observerTarget = document.querySelector('body');
    var observerCfg = {
        childList: true,
        subtree: true
    };

    components.forEach(function(component) {
        // open component labels
        component.style.width = 'auto';
        component.style.paddingLeft = '39px';

        // add class to parent
        var parent = component.parentElement;
        parent.classList.add('custom-overlay');
        
        // add eventlistener to parent
        parent.addEventListener('click', function() {
            parent.classList.toggle('custom-overlay');
        }, false);
    });

    // add stylesheet for components overlay
    styleTag.innerHTML = overlayCss;
    document.body.appendChild(styleTag);

    var reload = true

    // intersection obeserver for mutations
    var observer = new MutationObserver(function (mutations) {
        var newUrl = window.location.pathname;

        if (url !== newUrl && reload) {
            reload = false;
            
            setTimeout(function() {
                initOverlay()
            }, 1500)
        }
    })

    observer.observe(observerTarget, observerCfg);
})();