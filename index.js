const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    #teste de novo tipo
    scalar Date

    type Usuario {
        id: ID!
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    type Query {
        ola: String
        horaAtual: String
        horaAtualDate: Date
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
    }
`

const resolvers = {
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },
    Produto: {
        precoComDesconto(produto) {
            return produto.preco_com_desconto
        }
    },
    Query: {
        ola() {
            return 'Olá! Você tá conseguindo!'
        },
        horaAtual() {
            const date = new Date();
            const horaAtual = date.getHours();
            const minutoAtual = date.getMinutes();
            const segundosAtual = date.getSeconds();

            const horaAtualToString = horaAtual.toString() + ':' + minutoAtual.toString() + ':' + segundosAtual.toString();
            return horaAtualToString;
        },
        horaAtualDate() {
            return new Date;
        },
        usuarioLogado() {
            return {
                id: 1,
                nome: 'Malu',
                email: 'maluupereiraa@gmail.com',
                idade: 28,
                salario_real: 7700.00,
                vip: true
            }
        },
        produtoEmDestaque() {
            return {
                nome: 'Computador',
                preco: 10000.50,
                desconto: 1000,
                preco_com_desconto: 9000.50
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})