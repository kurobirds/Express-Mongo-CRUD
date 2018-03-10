'use strict';

var model = require('../models/db');

exports.create = (req, res) => {

	var celebrities = new model({
		title: req.body.title || "Untitled Celebrities",
		description: req.body.description || "null description",
		images: req.body.images || ""
	});

	celebrities.save((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({message: "Error when creating celebrities"});
		}
		else {
			res.send(docs);
		}
	})
};

exports.findAll = (req, res) => {
	model.find((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({message: "Error when finding celebrities"});
		}
		else {
			res.send(docs);
		}
	});
};

exports.findOne = (req, res) => {
	model.findById(req.params.id, (err, docs) => {
		if (err) {
			console.log(err);
			if (err.kind === 'ObejectId') {
				res.status(404).send({message: "Celebrities not found with id" + req.params.id});
			}
			res.status(500).send({message: "Error when finding celebrities"});
		}

		if (!docs) {
			return res.status(404).send({message: "Celebrities not found with id" + req.params.id});
		}

		res.send(docs);
	});
};

exports.update = (req, res, next) => {
	model.findById(req.params.id, (err, docs) => {
		if (err) {
			console.log(err);
			if (err.kind === 'ObejectId') {
				res.status(404).send({message: "Celebrities not found with id" + req.params.id});
			}
			res.status(500).send({message: "Error when finding celebrities"});
		}

		if (!docs) {
			return res.status(404).send({message: "Celebrities not found with id" + req.params.id + req.params.id});
		}

		docs.title = req.body.title;
		docs.description = req.body.description;
		docs.images = req.body.images;

		docs.save((err, docs) => {
			(err) ? res.status(500).send({message: "Could not update celebrities with id" + req.params.id}) : res.send(docs);
		})
	});
};

exports.delete = (req, res, next) => {
	model.findByIdAndRemove(req.params.id, (err, docs) => {
		if (err) {
			console.log(err);
			if (err.kind === 'ObejectId') {
				res.status(404).send({message: "Celebrities not found with id" + req.params.id});
			}
			res.status(500).send({message: "Error when delete celebrities with id" + req.params.id});
		}

		if (!docs) {
			return res.status(404).send({message: "Celebrities not found with id" + req.params.id});
		}

		res.send({message: "Celebrities deleted successfully!"});
	});
};


exports.home = (req, res, next) => {
	model.find((err, docs) => {
		if (err) return next(err);
		res.render('index', {title: 'Akino Page', docs});
	});
};