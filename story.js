$(document).ready(function() {

  var story = [];
  var score = 0;
  var choices = [];
  
  var after_data_is_loaded = function(data) {
    story = data;
    $("#loading").hide(); 
    $("#story-container").show(); 
    story_engine(1);
  }
  
  var load_data_and_start = function() {
    $.ajax({
      url: "/story_data.json",
      cache: false,
      dataType: 'json',
      error: function(x,s,e) {alert("got error"+s);}, 
      success: function(data){after_data_is_loaded(data);}
    });
  };
  
  var save_report_results = function() {
    var name = $("#test_results_results_name").val();
    if (!name || name.length < 1)
      $("#test_results_results_name").val('Mystery Visitor');
    $("#test_results_dymd_score").val(score);
  };
  
  var get_next_page = function(next_page) {
    var page_index = 0;
    while (page_index < story.length && story[page_index].page != next_page) {
      page_index = page_index + 1;
    }
    if (story[page_index].page = next_page) {
      return story[page_index];
    } else {
      return story[story.length - 1];
    }
  };
  
  var story_engine = function(next_page) {
    var current_page = get_next_page(next_page);
    if (current_page.end) {
      var page_markup = "<p>" + current_page.plot + "</p><button id='end_button'>Finish Test</button>";      
      
      $("#story-container").html(page_markup);
      $("#end_button").click(function(){$('form').submit();}); 
      
      save_report_results();      
        
    } else if (current_page.bridge) {
      var page_markup = "<p>" + current_page.plot + "</p><ol>" +
      "<li><a id='bridge'>Continue...</a></li>" +
      "</ol>";
      
      $("#story-container").html(page_markup);
      $("#bridge").click(function(){story_engine(current_page.bridge)});
      
    } else {
      var page_markup = "<h3>" + (current_page.title || '') + "</h3><p>" + current_page.plot + "</p><ol>" +
      "<li><a id='choice_1'>" + current_page.choice_1 + "</a></li>" +
      "<li><a id='choice_2'>" + current_page.choice_2 + "</a></li>" +
      "</ol>";
      
      $("#story-container").html(page_markup);
      $("#choice_1").click(function(){score = score + parseInt(current_page.score_1); story_engine(current_page.next_1)});
      $("#choice_2").click(function(){score = score + parseInt(current_page.score_2); story_engine(current_page.next_2)});      
    }
  };
 
  $('#start_button').click(function(){$('form').hide(); $('#loading').show(); load_data_and_start(); return false;});
}
)
