import { Product, Cart, User, Message } from '../DAO/factory.js'

import ProductRepository from './products.repository.js'
import UserRepository from './users.repository.js'
import MessageRepository from './messages.repository.js'
import CartRepository from './carts.repository.js'

export const UserService = new UserRepository(new User())
export const CartService = new CartRepository(new Cart())
export const MessageService = new MessageRepository(new Message())
export const ProductService = new ProductRepository(new Product())