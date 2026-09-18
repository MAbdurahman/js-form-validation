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

   const requiredMinLength = 10;
   const requiredMaxLength = 280;

   let isNameValid = false;
   let isEmailValid = false;
   let isMessageValid = false;

   let namePrompt = document.getElementById('contact-form-name-prompt');
   let emailPrompt = document.getElementById('contact-form-email-prompt');
   let messagePrompt = document.getElementById('contact-form-message-prompt');
   let message = '';

   const successColor = '#166534';
   const alertColor = '#991B1B';
   const toastContainer = document.querySelector('.toast-container');
   const submitButton = document.getElementById('contact-form-submit');

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

   function validateEmail() {
      let email = emailInput.value.trim();
      message = '';

      if (email.length === 0) {
         message = 'Your email address is required!';
         isEmailValid = false;
         getMessagePrompt(message, `${emailPrompt.id}`, alertColor);
         return false;
      }
      if (!email.match(emailPattern)) {
         message = 'Please enter a valid email address!';
         isEmailValid = false;
         getMessagePrompt(message, `${emailPrompt.id}`, alertColor);
         return false;
      }
      message = 'Valid email address';
      isEmailValid = true;
      getMessagePrompt(message, `${emailPrompt.id}`, successColor);
      return true;
   }

   function validateMessage() {
      let textAreaMessage = messageInput.value.trim();
      message = '';

      if (textAreaMessage.length < requiredMinLength) {
         message = `Minimum ${requiredMinLength} characters required!`;
         isMessageValid = false;
         getMessagePrompt(message, `${messagePrompt.id}`, alertColor);
         return false;
      }
      if (textAreaMessage.length > requiredMaxLength) {
         message = `Maximum ${requiredMaxLength} characters allowed!`;
         isMessageValid = false;
         getMessagePrompt(message, `${messagePrompt.id}`, alertColor);
         return false;
      }
      let maxRequiredCharactersLeft = requiredMaxLength - textAreaMessage.length;
      message = `Maximum ${maxRequiredCharactersLeft} characters left`;
      isMessageValid = true;
      getMessagePrompt(message, `${messagePrompt.id}`, successColor);
      return true;
   }

   function performInvalidForm() {}

   function performValidForm() {}


   function validateForm() {
      if (isNameValid && isEmailValid && isMessageValid) {
         performValidForm();

      } else {
         performInvalidForm();

      }
   }
   nameInput.addEventListener('keyup', validateName);
   emailInput.addEventListener('keyup', validateEmail);
   messageInput.addEventListener('keyup', validateMessage);
   submitButton.addEventListener('click', validateForm);
});