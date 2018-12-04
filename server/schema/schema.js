const axios = require('Axios');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = require('graphql');

const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: {
            type: GraphQLInt
        },
        mission_name: {
            type: GraphQLString
        },
        launch_year: {
            type: GraphQLInt
        },
        launch_date_local: {
            type: GraphQLInt
        },
        launch_success: {
            type: GraphQLBoolean
        },
        rocket: {
            type: RocketType
        }
    })
})

const RocketType = new GraphQLObjectType({
    name: "Rocket",
    fields: () => ({
        rocket_id: {
            type: GraphQLString
        },
        rocket_name: {
            type: GraphQLString
        },
        rocket_type: {
            type: GraphQLString
        }
    })
})

//Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v2/launches')
                    .then(response => response.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});