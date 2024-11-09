import { participantTemplate, successTemplate } from './Templates.js';
document.addEventListener('DOMContentLoaded', () => {
  let participantCount = 1;
  const addBtn = document.getElementById('add');
  const form = document.querySelector('form');
  const summary = document.getElementById('summary');
  addBtn.addEventListener('click', () => {
    participantCount++;
    const template = participantTemplate(participantCount);
    addBtn.insertAdjacentHTML('beforebegin', template);
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const totalFee = totalFees();
    const adultName = document.getElementById('adult_name').value;
    const message = successTemplate({ name: adultName, participants: participantCount, totalFee: totalFee });

    form.style.display = 'none';
    summary.style.display = 'block';
    summary.innerHTML = message;
  });
});
function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];
  const total = feeElements.reduce((sum, input) => sum + parseFloat(input.value || 0), 0);
  return total;
}