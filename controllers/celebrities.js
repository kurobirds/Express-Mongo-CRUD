"use strict";

var model = require("../models/db");

exports.create = (req, res) => {
	console.log(req.body);

	var celebrities = new model({
		title: req.body.title || "Untitled Celebrities",
		description: req.body.description || "null description",
		images: req.body.images || "",
	});

	celebrities.save().then(doc => {
		res.send(doc);
	}).catch(err => {
		res.status(500).send({ message: "Error when creating celebrities" });
	});
};

exports.findAll = (req, res) => {
	model.find().then(docs => {
		res.send(docs);
	}).catch(err => {
		res.status(500).send({ message: "Error when finding celebrities" });
	})
};

exports.findOne = (req, res) => {
	model.findById(req.params.id).then(doc => {
		if (!doc) {
			return res.status(404).send({
				message: `Celebrities not found with id ${req.params.id}`
			});
		}
		res.send(doc)
	}).catch(err => {
		if (err.kind === "ObjectId") {
			return res.status(404).send({
				message: `Celebrities not found with id ${req.params.id}`
			});
		}
		return res.status(500).send({ message: "Error when finding celebrities" });
	});
};

exports.update = (req, res) => {
	model.findByIdAndUpdate(req.params.id, {
		title: req.body.title || "Untitled Celebrities",
		description: req.body.description || "Null",
		images: req.body.images
	}, {new: true})
	.then(doc => {
		if (!doc) {
			return res.status(404).send({
				message: `Celebrities not found with id ${req.params.id}`
			});
		}
		res.send(doc)
	}).catch(err => {
		if (err.kind === "ObjectId") {
			return res.status(404).send({
				message: `Celebrities not found with id ${req.params.id}`
			});
		}
		return res.status(500).send({
			message: "Error when finding celebrities"
		});
	})
}

exports.delete = (req, res) => {
	model.findByIdAndRemove(req.params.id).then(doc => {
		if (!doc) {
			return res.status(404).send({
				message: `Celebrities not found with id ${req.params.id}`
			});
		}
		res.send({ message: "Celebrities deleted successfully!" });
	}).catch(err => {
		if (err.kind === "ObjectId") {
			return res.status(404).send({
				message: `Celebrities not found with id ${req.params.id}`
			});
		}
		return res.status(500).send({
			message: `Error when delete celebrities with id ${req.params.id}`,
		});
	});
};

exports.home = (req, res, next) => {
	model.find((err, docs) => {
		if (err) return next(err);
		res.render("index", { title: "Akino Page", docs });
	});
};
