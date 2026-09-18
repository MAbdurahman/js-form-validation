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



   function removeJSEffect() {
      document.querySelector('.utils-effect-07').value = '';
      document.querySelectorAll('.js-effect-07 .utils-effect-07').forEach(function(element) {
         element.classList.remove('has-content');

      });
   }


});