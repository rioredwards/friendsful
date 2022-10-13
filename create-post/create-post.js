import '../auth/user.js';
import { createPost } from '../fetch-utils.js';

const errorDisplay = document.getElementById('error-display');
const postForm = document.getElementById('create-post-form');

let error = null;

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(postForm);

    const post = { title: formData.get('title'), description: formData.get('description') };

    const response = await createPost(post);
    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('/');
    }
});

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
