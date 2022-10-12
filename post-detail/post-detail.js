/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { getPost } from '../fetch-utils.js';

/* Get DOM Elements */
const postTitle = document.getElementById('post-title');
const postDescription = document.getElementById('post-description');

const commentForm = document.getElementById('add-comment-form');
const commentInput = document.getElementById('add-comment-input');

const errorDisplay = document.getElementById('error-display');
const commentList = document.getElementById('comment-list');

console.log(errorDisplay, commentInput, commentForm, postDescription, postTitle, commentList);

/* State */
let error = null;
let post = null;
// let comment = null;

/* Events */
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    if (!id) {
        location.replace('/');
        return;
    }

    const response = await getPost(id);
    error = response.error;
    post = response.data;

    if (error) {
        displayError();
    }

    if (!post) {
        location.assign('/');
    } else {
        displayPost();
        // displayComments();
    }
});

/* Display Functions */
function displayPost() {
    console.log(postTitle);
    postTitle.textContent = post.title;
    postDescription.textContent = post.description;
}

/* 
function displayComments() {
    commentList.innerHTML = '';

    for (const comment of post.comments) {
        const commentEl = renderComment(comment);
        commentList.append(commentEl);
    }
}
*/

function displayError() {
    errorDisplay.textContent = error.message;
}
