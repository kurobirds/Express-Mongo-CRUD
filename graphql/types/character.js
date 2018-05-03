const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull
} = require('graphql');

const model = require('../../models/db');

// Character Type
const CharacterType = new GraphQLObjectType({
	name: 'Character',
	fields: () => ({
		_id: {
			type: new GraphQLNonNull(GraphQLString)
		},
		title: {
			type: GraphQLString
		},
		description: {
			type: GraphQLString
		},
		images: {
			type: GraphQLString
		}
	})
});

// Root Query
const RootQuery = new GraphQLObjectType({
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
				});

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

// Mutations
// const mutation = new GraphQLObjectType({
// 	name: 'Mutation',
// 	fields: {
// 		addCharacter: {
// 			type: CharacterType,
// 			args: {
// 				title: GraphQLString,
// 				description: GraphQLString,
// 				images: GraphQLString
// 			},
// 			resolve: (root, args) => {
// 				re
// 			}
// 		}
// 	}
// });

module.exports = new GraphQLSchema({
	query: RootQuery
});