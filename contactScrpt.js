// --------This is the script used to sets up the google spreadsheet used to collect form data----

var sheetName = "Sheet1"
var scriptProp = PropertiesService.getScriptProperties()

function intialSetup() {
	var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
	scriptProp.setProperty("key", activeSpreadsheet.getId())
}

function doPost(e) {
	var lock = LockService.getScriptLock()
	lock.tryLock(10000)

	try {
		var doc = SpreadsheetApp.openById(scriptProp.getProperty("key"))
		var sheet = doc.getSheetByName(sheetName)

		var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
		var nextRow = sheet.getLastRow() + 1

		var newRow = headers.map(function (header) {
			return header === "timestamp" ? new Date() : e.parameter[header]
		})

		sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

		return ContentService.createTextOutput(
			JSON.stringify({ result: "success", row: nextRow })
		).setMimeType(ContentService.MimeType.JSON)
	} catch (e) {
		return ContentService.createTextOutput(
			JSON.stringify({ result: "error", error: e })
		).setMimeType(ContentService.MimeType.JSON)
	} finally {
		lock.releaseLock()
	}
}

// the ScriptUrl------- Saving it here just for fun

const contactDeploy_link =
	"https://script.google.com/macros/s/AKfycbwa5HMYUiq-5LWSplOU6pSOKKRf8ef0O_YY5J1GAl0sQFGkJxMJC2UC9eOEKMrDG1p1eQ/exec"

export { contactDeploy_link }
