var pageperformance =
{
    getPerformanceStats: function  ()
    {
        var data =
        {                                
            "navigationtimings": this.get_navigationtimings(),
            "resourcetimings": this.get_resourcetimings(),
            "rendertimings": this.get_rendertimings(),
            "connectioninfo": this.get_connectioninfo(),
            "js": this.get_javascriptinfo(),
            "diagnostics": this.get_diagnostics()            
        }

        return JSON.stringify(data);
    },



    get_resourcetimings: function  ()
    {
        var data = window.performance.timing;
        var dcl = (data.domContentLoadedEventEnd - data.navigationStart);

        var pe = performance.getEntriesByType('resource');
        var resourcetimings = '';
        var hightimeresource = '';
        var hightime_of_resource = 0;

        for (var i = 0; i < pe.length; i++) 
        {
          resourcetimings = resourcetimings + 'Name: ' + pe[i].name + ' Duration: ' + pe[i].duration + '\n';
          if ( (pe[i].duration > hightime_of_resource) && (pe[i].startTime < dcl) )
          {
             hightime_of_resource = pe[i].duration.toFixed();
             hightimeresource = pe[i].name;
             hightimetype = pe[i].initiatorType;
          }
        }
        
        var htr_name = hightimeresource.split('?',2)[0].split('/');
        htr_name = htr_name[htr_name.length-1]
        htr_name = "..." + htr_name.substring(htr_name.length-12, htr_name.length)
        var htr_time = hightime_of_resource;
        var htr_type = hightimetype;
        var resources = pe.length;

        var resourcetimings =
        {
            'htr_name': htr_name,
            'htr_time': htr_time,
            'htr_type': htr_type
            //'resources': resources,
        };

        return resourcetimings;
        //return htr_name[htr_name.length-1] + ':' + hightime_of_resource.toFixed();
    },


    get_javascriptinfo: function ()
    {
        var scripts = document.getElementsByTagName('script');
        var js_3rdpartydomains = '';
        var js_3rdpartycounter = 0;
        var js_inlinecounter = 0;
        var js_externalcounter = 0;

        var htmlHostRegex = /(href|src)[ =htps:"']+\/\/([^\/ "]+)\//i; // regex to get hostname in script element

        for (var i=0; i<scripts.length; i++)
        {
            if ( (scripts[i].src != '') && (scripts[i].async == false) && (scripts[i].src.indexOf(window.location.host) < 0) ) //match 3rd party non async scripts
            {
                js_3rdpartycounter++;
                //js_3rdpartydomains = scripts[i].match(htmlHostRegex)[2];
            }
            if (scripts[i].src == '')
            {
                js_inlinecounter++;
            }
            else
            {
                js_externalcounter++;   
            }
        }

        var js =
        {
            'js_externalcounter': js_externalcounter,
            //'js_inlinecounter': js_inlinecounter,
            'js_3rdpartycounter': js_3rdpartycounter
            //'js_3rdpartydomains': js_3rdpartydomains
        };

        return js;
    },


    get_navigationtimings: function ()
    {
        var data = window.performance.timing;

        var blocking            = (data.domainLookupStart - data.navigationStart);
        var dns_lookup          = (data.domainLookupEnd - data.domainLookupStart);
        var tcp_connection      = (data.connectEnd - data.connectStart);
        var tls_connection      = 0;
        var sending             = (data.requestStart - data.connectEnd);
        var waiting             = (data.responseStart - data.requestStart);
        var receiving           = (data.responseEnd - data.responseStart);
        var dcl                 = (data.domContentLoadedEventEnd - data.responseEnd);
        var loading             = (data.loadEventEnd - data.domContentLoadedEventEnd);
        

        if (data.secureConnectionStart != 0)
        {
            tcp_connection      = (data.secureConnectionStart - data.connectStart);
            tls_connection      = (data.connectEnd - data.secureConnectionStart);
        }

        var navigationtimings =
        {
            'blocking': blocking,
            'dns_lookup': dns_lookup,
            'tcp_connection': tcp_connection,
            'tls_connection': tls_connection,
            'sending': sending,
            'waiting': waiting,
            'receiving': receiving,
            'dcl': dcl,
            'loading': loading
        };

        return navigationtimings;
    },


    get_rendertimings: function ()
    {
        var data = window.performance.timing;

        var onloadtime = (data.loadEventEnd - data.navigationStart);
        var domtree = (data.domInteractive - data.navigationStart);
        var cssom = (data.domContentLoadedEventEnd - data.navigationStart);
        var fpt = ((window.chrome.loadTimes().firstPaintTime * 1000) - (window.chrome.loadTimes().startLoadTime * 1000)).toFixed();
        //var fpt = ((window.chrome.loadTimes().firstPaintTime * 1000) - (data.navigationStart)).toFixed();
        var fpt_after_load = ((window.chrome.loadTimes().firstPaintAfterLoadTime * 1000) - (window.chrome.loadTimes().finishLoadTime * 1000)).toFixed();
        var onload2 = (window.chrome.loadTimes().finishLoadTime * 1000);
        

        var onload =
        {
            'domtree': domtree,
            'cssom': cssom,
            'fpt': fpt,
            'onloadtime': onloadtime
            //'fpt_after_load': fpt_after_load
        };

        return onload;
    },


    get_connectioninfo: function ()
    {
        //var protocol = window.location.protocol;
        //var pathname = window.location.pathname;
        var origin = window.location.origin;
        var spdy = window.chrome.loadTimes().wasFetchedViaSpdy;
        var info = window.chrome.loadTimes().connectionInfo;

        var connectioninfo =
        {
            //'protocol': protocol,                        
            //'spdy': spdy,
            'info': info,
            'origin': origin
        };

        return connectioninfo;
    },


    get_diagnostics: function ()
    {
        var href = window.location.href;
        var wpt = '<a target="_blank" href="http://www.webpagetest.org/?video=1&fvonly=1&runs=3&url=' + href + '">Run on WebPageTest</a>';
        var spof = '<a target="_blank" href="https://chrome.google.com/webstore/detail/spof-o-matic/plikhggfbplemddobondkeogomgoodeg">Assess SPOF</a>';
        var pagespeed = '<a target="_blank" href="https://developers.google.com/speed/pagespeed/insights/?url=' + href + '&tab=desktop">Run Page Speed</a>';

        var diagnostics =
        {
            'wpt': wpt,
            'spof': spof,
            'pagespeed': pagespeed            
        };

        return diagnostics;
    }

};