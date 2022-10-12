export function renderPost(post) {
    const li = document.createElement('li');
    li.classList.add('post-container');
    const a = document.createElement('a');
    a.href = `/post-detail/?id=${post.id}`;
    const h2 = document.createElement('h2');
    h2.classList.add('post-title');
    h2.textContent = post.title;

    const p = document.createElement('p');
    p.classList.add('post-description');
    p.textContent = post.description;
    a.append(h2, p);
    li.append(a);
    return li;
}
