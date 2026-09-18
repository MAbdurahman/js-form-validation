'use strict';

document.addEventListener('DOMContentLoaded', () => {
   console.log('DOMContentLoaded is loaded and ready to use');



   /****************** effect 07 scripts ******************/

   /*let utilsEffect07 = document.querySelector('.utils-effect-07');
   const utilsEffect07List = document.querySelectorAll('.js-effect-07 .utils-effect-07');*/

   /*console.log(utilsEffect07)*/
   /*console.log(utilsEffect07List)*/


   /*document.querySelector('.utils-effect-07').value = '';*/

   /*document.querySelectorAll('.js-effect-07 .utils-effect-07').forEach(function(element) {
      element.addEventListener('focusout', function() {
         if (this.value !== '') {
            this.classList.add('has-content');


         } else {
            this.classList.remove('has-content');

         }
      });
   });*/
   /*utilsEffect07.value = '';

   utilsEffect07List.forEach(function(element) {
      element.addEventListener('focusout', function() {
         if (this.value !== '') {
            this.classList.add('has-content');
            console.log(this)

         } else {
            this.classList.remove('has-content');
            console.log(this)

         }
      });
   });*/
   const fullnamePattern = /^([a-zA-Z-]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;
   const emailPattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;

   const nameInput = document.getElementById('input-01');
   const emailInput = document.getElementById('input-02');
   const messageInput = document.getElementById('textarea-input');

   const requireMinLength = 10;
   const requireMaxLength = 2000;

   let isNameValid = false;
   let isEmailValid = false;
   let isMessageValid = false;

   let namePrompt = document.getElementById('contact-form-name-prompt');
   let emailPrompt = document.getElementById('contact-form-email-prompt');
   let messagePrompt = document.getElementById('contact-form-message-prompt');
   let message = '';

   const successColor = '#166534';
   const alertColor = '#991B1B';

   /*************************** effect 07 scripts ***************************/
   const inputs = document.querySelectorAll('.js-effect-07 .utils-effect-07');

   function updateInputState(input) {
      input.classList.toggle('has-content', input.value.trim() !== '');
   }

   function removeHasContentClassFromElements() {
      document.querySelector('.utils-effect-07').value = '';
      document.querySelectorAll('.js-effect-07 .utils-effect-07').forEach(function(element) {
         element.classList.remove('has-content');
      });
   }

   inputs.forEach((input) => {
      updateInputState(input); // Handles values already present on load.

      input.addEventListener('input', () => {
         updateInputState(input);
      });

      input.addEventListener('blur', () => {
         updateInputState(input);
      });
   });

   function getMessagePrompt(message, elementId, color) {
      document.getElementById(elementId).innerHTML = message;
      document.getElementById(elementId).style.color = color;
   }

   function validateName() {
      let name = nameInput.value.trim();
      message = '';

      if (name.length === 0) {
         message = 'Your first and last name are required!';
         isNameValid = false;
         getMessagePrompt(message, `${namePrompt.id}`, alertColor);
         return false;
      }
      if (!name.match(fullnamePattern)) {
         message = 'Enter your first and last name!';
         isNameValid = false;
         getMessagePrompt(message, `${namePrompt.id}`, alertColor);
         return false;
      }
      message = 'Welcome ' + name;
      isNameValid = true;
      getMessagePrompt(message, `${namePrompt.id}`, successColor);
      return true;
   }



   nameInput.addEventListener('keyup', validateName);
});