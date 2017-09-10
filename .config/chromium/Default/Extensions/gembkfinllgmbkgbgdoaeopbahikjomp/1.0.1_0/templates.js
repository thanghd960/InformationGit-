var template_w3c = '<div class="pageperformance-box row">';
template_w3c += ' <div class="pageperformance-fl barplot" style="width:{{b_blocking}}px; height:20px; background:pink; text-align:center;" title="Blocking: {{b_blocking%}}">blo</div>';
template_w3c += ' <div class="pageperformance-fl barplot" style="width:{{b_dns_lookup}}px; height:20px; background:lightblue; text-align:center" title="DNS: {{b_dns_lookup%}}">dns</div>';
template_w3c += ' <div class="pageperformance-fl barplot" style="width:{{b_tcp_connection}}px; height:20px; background:orange; text-align:center" title="TCP connection: {{b_tcp_connection%}}">tcp</div>';
template_w3c += ' <div class="pageperformance-fl barplot" style="width:{{b_tls_connection}}px; height:20px; background:yellow; text-align:center" title="TLS connection: {{b_tls_connection%}}">tls</div>';
template_w3c += ' <div class="pageperformance-fl barplot" style="width:{{b_sending}}px; height:20px; background:red; text-align:center" title="Sending: {{b_sending%}}">sen</div>';
template_w3c += ' <div class="pageperformance-fl barplot" style="width:{{b_waiting}}px; height:20px; background:lightgreen; text-align:center" title="Waiting: {{b_waiting%}}">wai</div>';
template_w3c += ' <div class="pageperformance-fl barplot" style="width:{{b_receiving}}px; height:20px; background:green; text-align:center" title="Receiving: {{b_receiving%}}">rec</div>';
template_w3c += ' <div class="pageperformance-fl barplot" style="width:{{b_dcl}}px; height:20px; background:lightblue; text-align:center" title="DOMContentLoaded since last byte received: {{b_dcl%}}">dcl</div>';
template_w3c += ' <div class="pageperformance-fl barplot" style="width:{{b_loading}}px; height:20px; background:cyan; text-align:center" title="Load since DOMContentLoaded: {{b_loading%}}">loa</div>';
template_w3c +=' </div>';

var template_row = '<div class="pageperformance-box row"><div class="pageperformance-fl key">{{key}}: </div><div class="pageperformance-fr value">{{{value}}}</div></div>';

var template_section  =  '<div class="section section-default">';
template_section      += '    <div class="section-heading author">{{{heading}}}</div>';
template_section      += '    <div class="section-body">{{{content}}}</div>';
template_section      += '</div>';