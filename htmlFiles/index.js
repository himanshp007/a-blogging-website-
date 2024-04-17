function handleFormSubmit(event) {
  event.preventDefault();

  const blogDetails = {
      'title': event.target.title.value,
      'author': event.target.author.value,
      'content': event.target.content.value
  };

  axios.post('http://localhost:3000/blog/add-blog', blogDetails)
      .then((response) => {
          displayBlog();
          resetForm();
      })
      .catch((err) => console.log(err));
}

async function displayBlog() {
  try {
      const response = await axios.get('http://localhost:3000/blog/get-blog');
      const container = document.querySelector('.container');
      container.innerHTML = '';

      const data = response.data.blogs;

      for (const item of data) {
          const commentsResponse = await axios.get(`http://localhost:3000/comment/get-comment/${item.id}`);
          const comments = commentsResponse.data.comments;

          const card = createBlogCard(item);
          card.appendChild(createCommentForm(item.id));
          container.appendChild(card);

          comments.forEach(commentItem => {
              card.appendChild(createCommentElement(commentItem));
          });
      }
  } catch (err) {
      console.log(err);
  }
}

function createBlogCard(blog) {
  const card = document.createElement('div');
  card.classList.add('card');

  const header = document.createElement('div');
  header.classList.add('card__header');
  header.innerHTML = `<h1>${blog.title}</h1><h3>Author - ${blog.author}</h3>`;
  card.appendChild(header);

  const body = document.createElement('div');
  body.classList.add('card__body');
  body.innerHTML = `<p>${blog.content}</p>`;
  card.appendChild(body);

  return card;
}

function createCommentForm(blogId) {
  const form = document.createElement('form');
  form.classList.add('comment-form');
  form.onsubmit = (event) => handleComment(event, blogId);

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'comment-input';
  input.name = 'comment';
  input.placeholder = 'Write your comment here...';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';

  form.appendChild(input);
  form.appendChild(submitButton);

  return form;
}

function createCommentElement(comment) {
  const element = document.createElement('p');
  element.innerHTML = `${comment.comment}`;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete');
  deleteBtn.addEventListener('click', async () => {
      try {
          await axios.delete(`http://localhost:3000/comment/delete-comment/${comment.id}`);
          displayBlog();
      } catch (err) {
          console.log(err);
      }
  });

  element.appendChild(deleteBtn);
  return element;
}

function handleComment(event, blogId) {
  event.preventDefault();

  const commentDetails = {
      'comment': event.target.comment.value,
  };

  axios.post(`http://localhost:3000/comment/add-comment/${blogId}`, commentDetails)
      .then((response) => displayBlog())
      .catch((err) => console.log(err));

  document.getElementById('comment-input').value = '';
}

function resetForm() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('content').value = '';
}

displayBlog();
