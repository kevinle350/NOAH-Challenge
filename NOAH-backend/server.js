const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')
const cors = require("cors");

const PORT = 5000;
const USER_DATA = require("./USER_DATA.json")
const UserType = require("./TypeDefs/UserType")
const app = express()
app.use(cors());
app.use(express.json());


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            description: 'A list of all users',
            resolve: () => USER_DATA
        },
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))
app.listen(PORT, () => console.log('Server Running'))
