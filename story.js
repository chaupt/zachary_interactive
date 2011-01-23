$(document).ready(function() {

  var story = [
    { page: 1,
      title: "So it begins...", 
      plot: "You are in a maze of twisty-turny passages all a like. There is a fork ahead",
      choice_1: "I go left, into the dark",
      choice_2: "I go right, towards the light",
      score_1: 10, score_2: 1,
      next_1: 2, next_2: 4 },

    { page: 2,
      title: "Darkness...", 
      plot: "Wow, it is really dark. You stub your toe. You are in a maze of twisty-turny passages all a like. There is a fork ahead",
      choice_1: "I rub my toe and head towards the light",
      choice_2: "I kick that darn rock, and head towards the light",
      score_1: 1, score_2: 5,
      next_1: 5, next_2: 3 },
    
    { page: 3,
      title: "Darkness in pain...", 
      plot: "Your toe really hurts, you are limping, and you come across an underground lake.",
      choice_1: "I dive into the water and swim towards an sparkling light",
      choice_2: "I walk around the lake and take a path leading up",
      score_1: 10, score_2: 1,
      next_1: 4, next_2: 5 },
    
    { page: 4,
      title: "Glimmers...", 
      plot: "You enter a room that sparkles with shiny crystals.",
      choice_1: "I walk to the exit",
      choice_2: "I pick up some crystals, put them in my pocket, and head out",
      score_1: 1, score_2: 10,
      next_1: 5, next_2: 5 },
      
    { page: 5,
      title: "So it ends...", 
      plot: "Somehow, you got out",
      end: true }
      
  ]

  var score = 0;
  var choices = [];
  
  var print_report_results = function() {
    var name = $("#name").val();
    $("#story-results").show().text("Thanks " + name + ", your score was: "+ score);
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
    if (current_page.end != true) {
      var page_markup = "<h3>" + current_page.title + "</h3><p>" + current_page.plot + "</p><ol>" +
      "<li><a id='choice_1'>" + current_page.choice_1 + "</a></li>" +
      "<li><a id='choice_2'>" + current_page.choice_2 + "</a></li>" +
      "</ol>";
      
      $("#story-container").html(page_markup);
      $("#choice_1").click(function(){score = score + current_page.score_1; story_engine(current_page.next_1)});
      $("#choice_2").click(function(){score = score + current_page.score_2; story_engine(current_page.next_2)});
      
    } else {
      var page_markup = "<h3>" + current_page.title + "</h3><p>" + current_page.plot + "</p>";      
      $("#story-container").html(page_markup);
      print_report_results();
    }
  };
 
  $('form').submit(function(){$(this).hide(); $("#story-container").show(); story_engine(1); return false;});
}
)