var PAGE_LOAD_KEY = "totalTime";
var orderOfEvents = [{
  'key':'prerequestTime',
  'label': 'Pre-request',
  'calculation': 'performance.timing.requestStart - performance.timing.navigationStart'
}, {
  'key':'latencyTime',
  'label': 'Latency',
  'calculation': 'performance.timing.responseStart - performance.timing.requestStart'
}, {
  'key':'serverTime',
  'label': 'Server',
  'calculation': 'performance.timing.responseEnd - performance.timing.responseStart'
}, {
  'key':'domLoadingTime',
  'label': 'DOM Loading',
  'calculation': 'performance.timing.domInteractive - performance.timing.responseEnd'
}, {
  'key':'domCompleteTime',
  'label': 'DOM Complete',
  'calculation': 'performance.timing.domComplete - performance.timing.domInteractive'
}, {
  'key':'loadTime',
  'label': 'Load',
  'calculation': 'performance.timing.loadEventEnd - performance.timing.domComplete'
}];


chromeExtension = {

  /**
   * Query the dom for the count of divs
   *
   * @private
   */
   generate: function () {
    var runningMsTotal = pageLoad = counter = 0;

    chrome.tabs.executeScript(
      {file: 'performance.js'},
      function(result, isException) {
        if (isException) {
          //console.log("There was an error with counting elements on this page.");
        } else {
          pageLoad = result[0][PAGE_LOAD_KEY];
          var node = chromeExtension.createRow(PAGE_LOAD_KEY, pageLoad, 0, pageLoad, counter);
          document.body.appendChild(node);

          counter = counter + 1;

          for (var i in orderOfEvents) {
            var key = orderOfEvents[i].key;
            var time = result[0][key];
            var name = orderOfEvents[i].label;
            var node = chromeExtension.createRow(name, time, runningMsTotal, pageLoad, counter);
            runningMsTotal = runningMsTotal + time;
            document.body.appendChild(node);
            counter = counter + 1;
          }
          chromeExtension.addFooter();
          chromeExtension.createRowMouseOverEvent();
        }
      }
    );
   },


  /**
   * Create a new row with the data passed through
   *
   * @param {String} key for performance api metric
   * @param {Number} value for performance api metric
   * @param {Number} current tally of milliseconds passed
   * @param {Number} total milliseconds
   * @private
   */
   createRow: function (key, value, runningMsTotal, total, counter) {
    var d = document.createElement('div');
    d.className = 'performance-row performance-row-' + counter + ' key-' + counter;

    var label = document.createElement('span');
    label.className = 'performance-label';
    label.textContent = key;

    var time = document.createElement('span');
    time.className = 'performance-time';
    time.textContent = value + " ms";

    var clearfix = this.createClearfixDOMElement();

    if (key === PAGE_LOAD_KEY) {
      var graphDom = this.createGraphTotal(key, value, runningMsTotal, total, counter);
    } else {
      var graphDom = this.createGraph(key, value, runningMsTotal, total, counter);
    }

    if (document.getElementsByClassName('performance-graph-total')[0]) {
    var copy = this.createChartData(value, total, counter);
    document.getElementsByClassName('performance-graph-total')[0].appendChild(copy);
  }
    d.appendChild(label);
    d.appendChild(graphDom);
    d.appendChild(time);
    d.appendChild(clearfix);
    return d;
   },

  /**
   * Create a new graph wrapper with the totals passed through
   *
   * @param {String} DOM element name
   * @param {Number} current tally of milliseconds passed
   * @param {Number} total milliseconds
   * @private
   */
   createGraphTotal: function(key, value, runningMsTotal, total, counter) {
    var g = document.createElement('div');
    g.className = 'performance-graph-total';
    return g;
   },

  /**
   * Create a new graph with the data passed through
   *
   * @param {String} DOM element name
   * @param {Number} current tally of milliseconds passed
   * @param {Number} total milliseconds
   * @private
   */
   createGraph: function(key, value, runningMsTotal, total, counter) {
    var g = document.createElement('span');
    g.className = 'performance-graph ' + key;

    var dataPre = this.createPreChartSpacing(value, runningMsTotal, total, counter);
    var dataKey = this.createChartData(value, total, counter);
    var clearfix = this.createClearfixDOMElement();

    g.appendChild(dataPre);
    g.appendChild(dataKey);
    g.appendChild(clearfix);

    return g;
   },

  /**
   * Create a pre DOM element and assign it to be a percentage
   * equal to everything that has been allocated so far.
   *
   * @param {Number} value of the data point
   * @param {Number} total milliseconds
   * @param {String} the key
   *
   * @private
   */
   createChartData: function(value, total, counter) {
    var d = document.createElement('span');
    d.className = 'performance-graph-key key-' + counter;
    d.style.width = (value / total * 100) + '%';
    return d;
   },

  /**
   * Create a pre DOM element and assign it to be a percentage
   * equal to everything that has been allocated so far.
   *
   * @param {Number} value of the data point
   * @param {Number} current tally of milliseconds passed
   * @param {Number} total milliseconds
   *
   * @private
   */
   createPreChartSpacing: function(value, runningMsTotal, total, counter) {
    var d = document.createElement('span');
    d.className = 'performance-graph-pre key-' + counter;
    d.style.width = (runningMsTotal / total * 100) + '%';
    return d;
   },

  /**
   * Create a clearfix DOM element
   *
   * @private
   */
   createClearfixDOMElement: function() {
    var c = document.createElement('span');
    c.className = 'clearfix';
    return c;
   },

  /**
   * Create a footer and append it to the Body tag
   *
   * @private
   */
   addFooter: function () {
    var explanation = document.createElement('div');
    explanation.className = 'explanation';
    document.body.appendChild(explanation);

    var f = document.createElement('div');
    f.className = 'footer';
    f.innerHTML = '<a target="blank" href="https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/NavigationTiming/Overview.html">Navigation Timing API Spec</a>';
    document.body.appendChild(f);

    var a = document.createElement('div');
    a.className = 'footer';
    a.innerHTML = '<a target="blank" href="http://www.gregorymazurek.com">Help/Contact/About</a>';
    document.body.appendChild(a);
   },

  /**
   * Create an onmouseover event on each row
   *
   * @private
   */
   createRowMouseOverEvent: function() {
      document.getElementsByClassName('performance-row-1')[0].onmouseover = function() {
        var explanation = document.getElementsByClassName('explanation')[0];
        explanation.innerHTML = "Calc: " + orderOfEvents[0].calculation;
      };
      document.getElementsByClassName('performance-row-1')[0].onmouseout= function() {
        var explanation = document.getElementsByClassName('explanation')[0];
        explanation.innerHTML = ' ';
      };
      document.getElementsByClassName('performance-row-2')[0].onmouseover = function() {
        var explanation = document.getElementsByClassName('explanation')[0];
        explanation.innerHTML = "Calc: " + orderOfEvents[1].calculation;
      };
      document.getElementsByClassName('performance-row-2')[0].onmouseout= function() {
        var explanation = document.getElementsByClassName('explanation')[0];
        explanation.innerHTML = ' ';
      };
      document.getElementsByClassName('performance-row-3')[0].onmouseover = function() {
        var explanation = document.getElementsByClassName('explanation')[0];
        explanation.innerHTML = "Calc: " + orderOfEvents[2].calculation;
      };
      document.getElementsByClassName('performance-row-3')[0].onmouseout= function() {
        var explanation = document.getElementsByClassName('explanation')[0];
        explanation.innerHTML = ' ';
      };
      document.getElementsByClassName('performance-row-4')[0].onmouseover = function() {
        var explanation = document.getElementsByClassName('explanation')[0];
        explanation.innerHTML = "Calc: " + orderOfEvents[3].calculation;
      };
      document.getElementsByClassName('performance-row-4')[0].onmouseout= function() {
        var explanation = document.getElementsByClassName('explanation')[0];
        explanation.innerHTML = ' ';
      };
      document.getElementsByClassName('performance-row-5')[0].onmouseover = function() {
        var explanation = document.getElementsByClassName('explanation')[0];
        explanation.innerHTML = "Calc: " + orderOfEvents[4].calculation;
      };
      document.getElementsByClassName('performance-row-5')[0].onmouseout= function() {
        var explanation = document.getElementsByClassName('explanation')[0];
        explanation.innerHTML = ' ';
      };
      document.getElementsByClassName('performance-row-6')[0].onmouseover = function() {
        var explanation = document.getElementsByClassName('explanation')[0];
        explanation.innerHTML = "Calc: " + orderOfEvents[5].calculation;
      };
      document.getElementsByClassName('performance-row-6')[0].onmouseout= function() {
        var explanation = document.getElementsByClassName('explanation')[0];
        explanation.innerHTML = ' ';
      };
   },

   /**
    * Execute
    *
    */
   init: function () {
    chrome.tabs.executeScript(
      {file: 'onload-execute.js'},
      function(result, isException) {
        if (result) {
          chromeExtension.generate();
        } else {
          //console.log("There was an error retrieving Web Performing API Timing information");
        }
      });
   }

}

window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    chromeExtension.init();
},false);