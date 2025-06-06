const db = require('../db/connection');

function fetchCommentsByArticleId(article_id) {
  return db.query(
    `SELECT comment_id, votes, created_at, author, body, article_id
     FROM comments
     WHERE article_id = $1
     ORDER BY created_at DESC;`,
    [article_id]
  )
  .then(({ rows }) => rows);
}

function insertComment(article_id, username, body) {
  return db.query(
    `INSERT INTO comments (body, author, article_id)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [body, username, article_id]
  )
  .then(({ rows }) => rows[0]);
}

module.exports = { fetchCommentsByArticleId, insertComment };

// const db = require('../db/connection');

// function fetchCommentsByArticleId(article_id) {
//   // Checa se o artigo existe
//   return db.query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
//     .then(({ rows }) => {
//       if (rows.length === 0) {
//         return Promise.reject({ status: 404, msg: 'Article not found' });
//       }
//       // Busca os comentários do artigo
//       return db.query(
//         `SELECT comment_id, votes, created_at, author, body, article_id
//          FROM comments
//          WHERE article_id = $1
//          ORDER BY created_at DESC;`,
//          [article_id]
//       );
//     })
//     .then(({ rows }) => rows);
// }

// module.exports = { fetchCommentsByArticleId };
