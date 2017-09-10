
var section_translations =
{
    'navigationtimings':  '<a href="http://www.w3.org/wiki/Web_Performance/Publications" target="_blank">W3C Navigation Timings</a> analysis (in order, all times in ms)',
    'resourcetimings':  '<a href="http://www.w3.org/wiki/Web_Performance/Publications" target="_blank">W3C Resource Timings</a> analysis (all times in ms)',
    'rendertimings':  'Render Timings milestones, since navigation start (all times in ms)',
    'connectioninfo': 'Connection Info',
    'js':  'Javascript',
    'memory':  'Javascript Memory Usage',
    'diagnostics':  'Run diagnostic checks'
}

var data_translations =
{
    'dom_elements':         'No. of DOM Elements',
    'js_externalcounter':   'No. of external files',
    'js_inlinecounter':     'No. of inline blocks',
    'js_3rdpartycounter':   'No. of non async, non url host, (3rd party probable) SPOF files',
    'js_3rdpartydomains':   'Non async, non url host, (3rd party probable) domains',
    'resources':            'No. of Resource timing objects',
    'htr_name':             'Highest duration resource, before DomContentLoaded',
    'htr_time':             'Duration of this resource, before DomContentLoaded',
    'htr_type':             'Initiator of this resource, before DomContentLoaded',
    'css_files':            'No. of CSS Files',
    'blocking':             'Blocking Time',
    'dns_lookup':           'DNS Lookup Time',
    'tcp_connection':       'TCP Connection Time',
    'tls_connection':       'TLS Connection Time',
    'sending':              'Sending Time',
    'waiting':              'Waiting (Time to First Byte)',
    'receiving':            'Receiving (Time to Last Byte)',
    'dcl':                  'DomContentLoaded since last byte received',
    'loading':              'Load time since DomContentLoaded',
    'onloadtime':           'OnLoad time',
    'fpt':                  'First paint time',
    'fpt_after_load':       'First paint time after load*',
    'domtree':              'DomInteractive (DOM tree ready)',
    'cssom':                'DomContentLoaded (CSSOM ready)',
    //'protocol':             'Protocol',
    'origin':               'Origin',
    'spdy':                 'SPDY',
    'info':                 'Version',
    'wpt':                  'Waterfall analysis',
    'spof':                 'Single Point of Failure (SPOF) analysis',
    'used_js_heap_size':    'Used Memory',
    'total_js_heap_size':   'Allocated Memory',
    'js_heap_sizelimit':    'Memory Limit',
    'pagespeed':            'PageSpeed analysis'
};

chrome.tabs.executeScript(null, {'code': 'pageperformance.getPerformanceStats()'}, function (result)
{
    if (result != undefined)
    {
        init_extension(JSON.parse(result));
    }
});

function init_extension (data)
{
    var sections = '';

    // 400 is the width of the pane defined in main.css
    var b_total = Number(data['rendertimings']['onloadtime']) / 370;
    var b_blocking = Number(data['navigationtimings']['blocking']) / b_total;
    var b_dns_lookup = Number(data['navigationtimings']['dns_lookup']) / b_total;
    var b_tcp_connection = Number(data['navigationtimings']['tcp_connection']) / b_total;
    var b_tls_connection = Number(data['navigationtimings']['tls_connection']) / b_total;
    var b_sending = Number(data['navigationtimings']['sending']) / b_total;
    var b_waiting = Number(data['navigationtimings']['waiting']) / b_total;
    var b_receiving = Number(data['navigationtimings']['receiving']) / b_total;
    var b_dcl = Number(data['navigationtimings']['dcl']) / b_total;
    var b_loading = Number(data['navigationtimings']['loading']) / b_total;

    for (var topic in data)
    {
        var rows = '';

        for (var key in data[topic])
        {
            if (data[topic].hasOwnProperty(key))
            {
                rows += Mustache.render(template_row, {'key': data_translations[key], 'value': data[topic][key]});                
            }
        }
        if (topic == "navigationtimings") 
            rows += Mustache.render(template_w3c, {'b_blocking': b_blocking, 'b_blocking%': (b_blocking / 3.7).toFixed(2)+'%', 'b_dns_lookup': b_dns_lookup, 'b_dns_lookup%': (b_dns_lookup / 3.7).toFixed(2)+'%', 'b_tcp_connection': b_tcp_connection, 'b_tcp_connection%': (b_tcp_connection / 3.7).toFixed(2)+'%', 'b_tls_connection': b_tls_connection, 'b_tls_connection%': (b_tls_connection / 3.7).toFixed(2)+'%', 'b_sending': b_sending, 'b_sending%': (b_sending / 3.7).toFixed(2)+'%', 'b_waiting': b_waiting, 'b_waiting%': (b_waiting / 3.7).toFixed(2)+'%', 'b_receiving': b_receiving, 'b_receiving%': (b_receiving / 3.7).toFixed(2)+'%', 'b_dcl': b_dcl, 'b_dcl%': (b_dcl / 3.7).toFixed(2)+'%', 'b_loading': b_loading, 'b_loading%': (b_loading / 3.7).toFixed(2)+'%'});

        sections += Mustache.render(template_section, {'heading': section_translations[topic], 'content': rows});

    }
    
    
    document.getElementById('content').innerHTML = sections;

}