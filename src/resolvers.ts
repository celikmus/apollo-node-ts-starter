import { CreateUserInput, MutationResolvers, QueryResolvers } from './generated/types'
import datasource from './datasource'

const createUser: MutationResolvers['registerUser'] = (parent, args) => {
  const { email, firstName, lastName, password }: CreateUserInput = args.input

  const user = {
    email,
    firstName,
    id: `${datasource.length + 1}`,
    lastName,
    password,
  }

  datasource.push(user)

  return user
}

const findAllUsers: QueryResolvers['users'] = () => {
  return datasource
}

const resolvers: Record<string, MutationResolvers | QueryResolvers> = {
  Mutation: {
    registerUser: createUser,
  },
  Query: {
    users: findAllUsers,
  },
}

export default resolvers
