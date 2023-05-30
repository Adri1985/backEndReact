import chai from "chai"
import supertest from "supertest"

import {faker} from '@faker-js/faker'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing backend project', ()=>{
    describe('Test de productos', ()=>{
        it('En endpoint POST /api/products debe crear un producto', async ()=>{
            const productMock={
                model:'',
                title:''
            }
        
        const response = await requester.post('/api/products').send(productMock)
        const{status, ok, _body}= response
        
        console.log(status)
        console.log(ok)
        console.log(_body)

        chai(_body.payload).to.have.property('_id')//tiene la propiedad ID

        })

    })
})

describe('Registro, login and Current', ()=>{
    let cookie 
    const mockUser = {
        first_name:'Adri',
        last_name:'Camp',
        email:faker.internet.email(),
        password:'123'
    }
    it('Debe registrar un usuario', async()=>{
        const {_body} = await requester.post('/api/sessions/register').send(mockUser)
        expect(_body.payload).to.be.ok
    })
    it('Debe loggear un user y DEVOLVER UNA COOKIE', async ()=>{
        const result =  await requested.post('/api/sessions/login').send({
            email: mockUser.email,
            password: mockUser.password
        })
        //COOKIE_NAME = COOKIE_VALUE
        const cookieResult = result.headers['set-cookie'][0]
        expect(cookieResult).to.be.ok

        cookie = {
            name: cookieResult.split('=')[0],
            value: cookieResult.split('=')[1]
        }
        expect(cookie.name).to.be.ok.and.eql('coderCookie')
        expect(cookie.value.to.be.ok)

        it('Enviar Cookie para ver el contenido del user', async()=>{
            const {_body} = (await requester.get('/api/sessions/current')).set('Cookie',[`${cookie.name}=${cookie.value}`])
        })

    })
})


describe()