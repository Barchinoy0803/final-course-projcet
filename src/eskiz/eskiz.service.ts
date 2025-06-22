import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from "dotenv"
dotenv.config()

@Injectable()
export class EskizService {
    private url = "https://notify.eskiz.uz/api"
    private token
    private secret = process.env.ESKIZ_SECRET
    private email = process.env.ESKIZ_EMAIL

    constructor() {
        this.auth()
    }



    async auth() {
        try {
            let { data: response } = await axios.post(`${this.url}/auth/login`, {
                email: this.email,
                password: this.secret
            })
            this.token = response?.data?.token
        } catch (error) {
            // console.log(error);
            throw new InternalServerErrorException(error)
        }
    }

    async sendSms(message: string, phone: string) {
        try {
            let { data: response } = await axios.post(`${this.url}/message/sms/send`, {
                mobile_phone: phone,
                message: message,
                from: "4546"
            },
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log(response);

            return response
        } catch (error) {
            console.log(error);
            await this.auth()
            await this.sendSms(message, phone)
            throw new InternalServerErrorException(error)
        }
    }
}
