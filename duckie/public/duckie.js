/*---------------------------------------------------------------------------*\
 |   script.js                                                               |
 |                                                                           |
 |   Copyright (c) 2012, Rajiv Bakulesh Shah, original author.               |
 |                                                                           |
 |       This file is free software; you can redistribute it and/or modify   |
 |       it under the terms of the GNU General Public License as published   |
 |       by the Free Software Foundation, either version 3 of the License,   |
 |       or (at your option) any later version.                              |
 |                                                                           |
 |       This file is distributed in the hope that it will be useful, but    |
 |       WITHOUT ANY WARRANTY; without even the implied warranty of          |
 |       MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU   |
 |       General Public License for more details.                            |
 |                                                                           |
 |       You should have received a copy of the GNU General Public License   |
 |       along with this file.  If not, see:                                 |
 |           <http://www.gnu.org/licenses/>.                                 |
\*---------------------------------------------------------------------------*/


Duckie = {
  template: null,
  jqXHR: null,

  init: function() {
    this.template = $('#result').remove().html();
    $('#search').submit(this.search);
    $("[name='query']").focus();
  },

  search: function() {
    if (Duckie.jqXHR !== null) {
      Duckie.jqXHR.abort();
      console.log('aborted previous query');
    }

    var query = $("[name='query']").val().toLowerCase();
    document.title = 'rubber duckie: ' + query;
    $('.query').html(query);
    $("[name='query']").val('');

    $('.loading').show();
    $('#results').empty();
    $('.no-results').hide();

    Duckie.jqXHR = $.getJSON('/search', {query: query}, function(data) {
        Duckie.jqXHR = null;
        $('.loading').hide();
        $.each(data, Duckie.showResult);
        if (data.length == 0) {
          $('.no-results').show();
        }
      }
    );
    return false;
  },

  showResult: function(index, value) {
    var result = $(Duckie.template);
    result.find('a.photo').attr('href', value.full_size);
    result.find('a.photo').facebox();
    result.find('a.photo img.photo').attr('src', value.thumbnail);
    result.appendTo('#results');
  }
};


$(function() {
  Duckie.init();
});