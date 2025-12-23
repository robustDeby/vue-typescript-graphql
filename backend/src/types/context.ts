import {UserDocument}from '../models/user.js'

export interface GraphQLContext {
  user: UserDocument | null
}
