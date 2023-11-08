function createFormFromSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Sheet1"); // Change "Sheet1" to the name of your sheet
  var data = sheet.getDataRange().getValues();
  
  var form = FormApp.create('Your Form Title'); // Change 'Your Form Title' to the desired title
  var formId = form.getId();
  
  for (var i = 1; i < data.length; i++) {
    var question = data[i][1]; // Assuming question text is in the second column (Column B)
    var responseType = data[i][2]; // Assuming response type is in the third column (Column C)
    
    if (responseType === "Multiple Choice") {
      var choices = data[i][3].split(','); // Assuming response options are in the fourth column (Column D)
      var item = form.addMultipleChoiceItem();
      item.setTitle(question);
      item.setChoiceValues(choices);
    } else if (responseType === "Text") {
      form.addTextItem().setTitle(question);
    } else if (responseType === "Yes/No") {
      form.addMultipleChoiceItem()
        .setTitle(question)
        .setChoiceValues(['Yes', 'No']);
    } else if (responseType === "Multiple Select") {
      var choices = data[i][3].split(','); // Assuming response options are in the fourth column (Column D)
      var item = form.addCheckboxItem();
      item.setTitle(question);
      item.setChoiceValues(choices);
    }
  }
  
  Logger.log('Form URL: ' + form.getPublishedUrl());
  Logger.log('Form ID: ' + formId);
}
