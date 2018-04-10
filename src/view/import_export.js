(function(){
  LifeGamification.importExport = {};
  LifeGamification.importExport.name = "Import-Export";

  LifeGamification.importExport.render = function () {
  $('#content').append(`<div id="import-export"> </div>`)
	$('#import-export').html(`
    <button class="import-export__button" id="import">Import</button>
    <button class="import-export__button" id="export">Export</button>
    <textarea id="import-export__json" placeholder="Place JSON here"></textarea>
  `);
    handleImportExportButtons();
  }

  const handleImportExportButtons = function () {
    $('#export').click(function() {
      LifeGamification.repository.getSkills()
        .then(function(skills){
          $('#import-export__json').html(JSON.stringify(skills));
        })
    });
    $('#import').click(function() {
      const storage = $("#import-export__json").val();
      if (storage === "") {
        return;
      }
      const skills = JSON.parse(storage);

      LifeGamification.models.clearCollection();
      LifeGamification.repository.updateSkills(skills)
        .then(function () {
          LifeGamification.models.createSkillsCollection(skills);
          LifeGamification.view.main.render();
        });
    });
  }
})();
