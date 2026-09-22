'use strict';

document.addEventListener('DOMContentLoaded', () => {
   console.log('DOMContentLoaded is loaded and ready to use');

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
   const contactForm = document.getElementById('contact-form');

   if (!toastContainer) {
      console.error('Toast container not found!');
      return;
   }

   const icons = {
      success: 'fa-circle-check',
      error: 'fa-circle-xmark',
      warn: 'fa-triangle-exclamation',
      inform: 'fa-circle-info'
   };

   /*************************** effect 07 scripts ***************************/
   const inputs = document.querySelectorAll('.js-effect-07 .utils-effect-07');

   function updateInputState(input) {
      input.classList.toggle('has-content', input.value.trim() !== '');
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
      const prompt = document.getElementById(elementId);
      prompt.textContent = message;
      prompt.style.color = color;
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

   function showToast(type, messages) {
      const toast = document.createElement('div');
      const icon = document.createElement('i');
      const content = document.createElement('div');

      toast.className = `toast ${type}`;
      toast.setAttribute('role', type === 'error' ? 'alert' : 'status');

      icon.className = `fa-solid ${icons[type]}`;
      icon.setAttribute('aria-hidden', 'true');

      if (Array.isArray(messages)) {
         const list = document.createElement('ul');

         messages.forEach((message) => {
            const item = document.createElement('li');
            item.textContent = message;
            list.appendChild(item);
         });

         content.appendChild(list);
      } else {
         content.textContent = messages;
      }

      toast.append(icon, content);
      toastContainer.appendChild(toast);

      window.setTimeout(() => {
         toast.classList.add('move-back-to-right');
      }, 5000);

      toast.addEventListener('animationend', (event) => {
         if (event.animationName === 'move-back-to-right') {
            toast.remove();
         }
      });
   }

   function performInvalidForm(errors) {
      showToast('error', errors);
   }

   function performValidForm() {
      showToast('success', 'Your message has been validated!');

      // No email is sent. Reset only after a successful validation.
      document.getElementById('contact-form').reset();

      // Return labels to their original positions.
      inputs.forEach((input) => {
         updateInputState(input);
      });

      // Clear inline prompts.
      namePrompt.textContent = '\u00A0';
      emailPrompt.textContent = '\u00A0';
      messagePrompt.textContent = '\u00A0';
   }

   function validateForm(event) {
      event.preventDefault();

      const errors = [];

      if (!validateName()) {
         errors.push('Enter a valid first and last name.');
      }

      if (!validateEmail()) {
         errors.push('Enter a valid email address.');
      }

      if (!validateMessage()) {
         errors.push(
            `Enter a message between ${requiredMinLength} and ${requiredMaxLength} characters.`
         );
      }

      if (errors.length > 0) {
         performInvalidForm(errors);
         return;
      }

      performValidForm();
   }


   nameInput.addEventListener('keyup', validateName);
   emailInput.addEventListener('keyup', validateEmail);
   messageInput.addEventListener('keyup', validateMessage);
   contactForm.addEventListener('submit', validateForm);
});