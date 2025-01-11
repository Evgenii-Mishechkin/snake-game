document.addEventListener('DOMContentLoaded', () => {
  fetch('./data/posts.json')
    .then(response => response.json())
    .then(posts => {
      const blogContainer = document.getElementById('blog-container');
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post-card');

        const postImage = document.createElement('img');
        postImage.src = post.image;
        postImage.alt = post.title;
        postImage.classList.add('post-image');

        const postTitle = document.createElement('h2');
        postTitle.textContent = post.title;
        postTitle.classList.add('post-title');

        const postContent = document.createElement('p');
        postContent.textContent = post.content;
        postContent.classList.add('post-content');

        postElement.appendChild(postImage);
        postElement.appendChild(postTitle);
        postElement.appendChild(postContent);

        blogContainer.appendChild(postElement);
      });
    })
    .catch(error => console.error('Error loading posts:', error));
});