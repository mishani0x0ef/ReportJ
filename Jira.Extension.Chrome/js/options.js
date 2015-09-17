$(function() {
  ko.applyBindings(new OptionsViewModel());
});

$('#btnAddRepository').click(function(){
    $('#repositoryEditModal').modal('show');
});