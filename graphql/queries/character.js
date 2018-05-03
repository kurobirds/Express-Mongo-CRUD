const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull
} = require('graphql');
var model = require('../../models/db');
var CharacterType = require('../types/character');

// Query
module.exports = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		character: {
			type: CharacterType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: (parentValue, args) => {
				var result = new Promise((resolve, reject) => {
					model.findById(args.id, (err, docs) => {
						if (err) {
							if (err.kind === 'ObjectId') {
								reject("Celebrities not found with id" + args.id);
							}
							reject("Error when finding celebrities");
						}

						if (!docs) {
							return reject("Celebrities not found with id" + args.id);
						}

						resolve(docs);
					});
				})

				return result;
			}
		},
		characters: {
			type: new GraphQLList(CharacterType),
			resolve: (parentValue, args) => {
				var result = new Promise((resolve, reject) => {
					model.find((err, docs) => {
						(err) ? reject(err) : resolve(docs);
					});
				});
				return result;
			}
		}
	}
});