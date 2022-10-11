import { createPost } from '../fetch-utils.js';
import { '../auth/user.js' }; 


const errorDisplay = document.getElementById('error-display');


const post = {title: formData.get('title'),
description: formData.get('description')}

const response = await createPost(post);
error = response.error

if (error) {
    displayError();
} else {
    location.assign('/');
} 

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

