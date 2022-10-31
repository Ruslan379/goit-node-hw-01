require('colors');
const fs = require('fs').promises;
const path = require('path');


//* Раскомментируй и запиши значение
const contactsPath = path.resolve('contacts.js');
// console.log(`contactsPath:  ${contactsPath}`.red); //!
console.log("contactsPath:".red, contactsPath.green); //!


// TODO: задокументировать каждую функцию
function listContacts() {
    // ...твой код
}

function getContactById(contactId) {
    // ...твой код
}

function removeContact(contactId) {
    // ...твой код
}

function addContact(name, email, phone) {
    // ...твой код
}