const { fetchCommentsByArticleId, insertComment } = require('../models/comments.model');

function getCommentsByArticleId(request, response, next) {
  const { article_id } = request.params;
  fetchCommentsByArticleId(article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch(next);
}

// FUNÇÃO DE POST
function postCommentByArticleId(request, response, next) {
  const { article_id } = request.params;
  const { username, body } = request.body;
  insertComment(article_id, username, body)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch(next);
}

module.exports = { getCommentsByArticleId, postCommentByArticleId };
