$(document).ready(function() {
   $("#btn").click(function(event){
       // Clear any existing table content
       $('table').empty();
       
       // Create table structure
       $('table').append('<caption id="tablecaption"></caption>');
       $('table').append('<thead><tr id="showheading"></tr></thead>');
       $('table').append('<tbody><tr id="showcalories"></tr><tr id="showfat"></tr></tbody>');
       $('table').append('<tfoot><tr id="showven"></tr></tfoot>');
       
       // Load data from JSON file and populate the table
       $.getJSON('data.json', function(data) {
           // Set table caption
           $('#tablecaption').text(data.title);
           
           // Create header row
           $('#showheading').append('<th>' + data.heading + '</th>');
           $('#showheading').append('<th>' + data.head1 + '</th>');
           $('#showheading').append('<th>' + data.head2 + '</th>');
           $('#showheading').append('<th>' + data.head3 + '</th>');
           $('#showheading').append('<th>' + data.head4 + '</th>');
           
           // Create calories row
           $('#showcalories').append('<td>' + data.subheadcal + '</td>');
           $('#showcalories').append('<td>' + data.cal1 + '</td>');
           $('#showcalories').append('<td>' + data.cal2 + '</td>');
           $('#showcalories').append('<td>' + data.cal3 + '</td>');
           $('#showcalories').append('<td>' + data.cal4 + '</td>');
           
           // Create fat row
           $('#showfat').append('<td>' + data.subheadfat + '</td>');
           $('#showfat').append('<td>' + data.fat1 + '</td>');
           $('#showfat').append('<td>' + data.fat2 + '</td>');
           $('#showfat').append('<td>' + data.fat3 + '</td>');
           $('#showfat').append('<td>' + data.fat4 + '</td>');
           
           // Create vendor row
           $('#showven').append('<td>' + data.subheadven + '</td>');
           $('#showven').append('<td>' + data.ven1 + '</td>');
           $('#showven').append('<td>' + data.ven2 + '</td>');
           $('#showven').append('<td>' + data.ven3 + '</td>');
           $('#showven').append('<td>' + data.ven4 + '</td>');
       });
   });
});