import IMask from 'imask';

// mask
IMask(document.getElementById('phone'), {
  mask: '+{38} (000) 000-00-00',
});

// form
const form = document.getElementById('form');

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById('form-status');
  const data = new FormData(event.target);

  try {
    const response = await fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      status.innerHTML = 'Заявка відправлена!';
      form.reset();
    } else {
      const errorData = await response.json();
      if (errorData.errors) {
        const errorMessage = errorData.errors
          .map((error) => error.message)
          .join(', ');
        status.innerHTML =
          errorMessage === 'should be an email'
            ? 'Невірний формат пошти'
            : errorMessage;
        console.log(errorData);
      } else {
        status.innerHTML = 'Виникла проблема з відправкою форми';
      }
    }
  } catch (error) {
    status.innerHTML = 'Виникла проблема з відправкою форми';
  } finally {
    status.classList.add('show');
    setTimeout(() => {
      status.classList.remove('show');
    }, 5000);
  }
}

form.addEventListener('submit', handleSubmit);

// count
const textarea = document.getElementById('textarea');
const charCount = document.getElementById('count');

textarea.addEventListener('input', function () {
  const maxLength = parseInt(textarea.getAttribute('maxlength'));
  const currentLength = textarea.value.length;

  charCount.textContent = currentLength + '/' + maxLength;

  if (currentLength >= maxLength) {
    textarea.value = textarea.value.substring(0, maxLength);
    charCount.textContent = maxLength + '/' + maxLength;
  }
});
