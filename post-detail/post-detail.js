/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { createComment, getComment, getPost, onMessage } from '../fetch-utils.js';
import { renderComment } from '../render-utils.js';

/* Get DOM Elements */
const postTitle = document.getElementById('post-title');
const postDescription = document.getElementById('post-description');

const commentForm = document.getElementById('add-comment-form');

const errorDisplay = document.getElementById('error-display');
const commentList = document.getElementById('comment-list');

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
        displayComments();
    }

    onMessage(post.id, async (payload) => {
        const commentId = payload.new.id;
        const commentResponse = await getComment(commentId);
        error = commentResponse.error;
        if (error) {
            displayError();
        } else {
            const comment = commentResponse.data;
            post.comments.unshift(comment);
            displayComments();
        }
    });
});

commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(commentForm);

    if (formData.get('text') === '') {
        return;
    }

    const commentInsert = {
        post_id: post.id,
        text: formData.get('text'),
    };

    const response = await createComment(commentInsert);
    error = response.error;
    // const comment = response.data;

    if (error) {
        displayError();
    } else {
        commentForm.reset();
        // post.comments.unshift(comment);
        // displayComments();
    }
});

/* Display Functions */
function displayPost() {
    postTitle.textContent = post.title;
    postDescription.textContent = post.description;
}

function displayComments() {
    commentList.innerHTML = '';

    for (const comment of post.comments) {
        const commentEl = renderComment(comment);
        commentList.append(commentEl);
    }
}

function displayError() {
    errorDisplay.classList.toggle('hidden');
    errorDisplay.textContent = error.message;
}
