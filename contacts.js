require('colors');
const fs = require('fs').promises;
const path = require('path');


//* Раскомментируй и запиши значение
const contactsPath = path.resolve('./db/contacts.json');
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

//! Экспорт функций
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}