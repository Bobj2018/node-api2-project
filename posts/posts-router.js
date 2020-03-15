const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.post('/', (req, res) => {
	const post = req.body;
	db.insert(post)
		.then(data => {
			if (post.title && post.contents) {
				res.status(201).json(data);
			} else {
				res.status(400).json({
					errorMessage: 'Please provide title and contents for the post.'
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				error: 'There was an error while saving the post to the database'
			});
		});
});

router.post('/:id/comments', (req, res) => {
	const comment = req.body;

	db.insertComment(comment)
		.then(data => {
			if (data) {
				if (comment.text) {
					res.status(201).json(data);
				} else {
					res.status(400).json({
						errorMessage: 'Please provide title and contents for the post.'
					});
				}
			} else {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch(err => {
			res.status(500).json({
				error: 'There was an error while saving the comment to the database'
			});
		});
});

router.get('/', (req, res) => {
	db.find()
		.then(data => {
			res.status(200).json(data);
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The posts information could not be retrieved.' });
		});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;

	db.findById(id)
		.then(data => {
			if (data) {
				res.status(200).json(data);
			} else {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch(err => {
			res.status(500).json({
				error: '{ error: "The post information could not be retrieved." }'
			});
		});
});

router.get('/:id/comments', (req, res) => {
	const { id } = req.params;
	db.findPostComments(id)
		.then(data => {
			if (data) {
				res.status(201).json(data);
			} else {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch(err => {
			res.status(500).json({
				error: '{ error: "The comments information could not be retrieved." }'
			});
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	db.remove(id)
		.then(data => {
			if (data) {
				res.status(204).end();
			} else {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch(err => {
			res.status(500).json({ error: 'The post could not be removed' });
		});
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const updated_post = req.body;
	db.update(id, updated_post)
		.then(data => {
			if (data) {
				if (updated_post.title && updated_post.contents) {
					res.status(209).end();
				} else {
					res.status(400).json({
						errorMessage: 'Please provide title and contents for the post.'
					});
				}
			} else {
				res
					.status(404)
					.json({ message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The post information could not be modified.' });
		});
});

module.exports = router;
