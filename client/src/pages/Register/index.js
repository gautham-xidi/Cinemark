import React, {useEffect} from 'react'
import { Form, message } from 'antd'
import Button from "../../components/Button"
import { Link } from 'react-router-dom'
import { RegisterUser } from '../../apicalls/users'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await RegisterUser(values)
            if (response.success) {
                message.success(response.message);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
          navigate("/");
        }
      }, []);

    return (
        <div className='flex justify-center h-screen items-center bg-primary'>
            <div className='card p-3 w-400'>
                <h1 className='text-xl mb-1'>CINEMARK - REGISTER</h1>
                <hr />
                <Form
                    layout="vertical"
                    className='mt-1'
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "please input your name!" }]}
                    >
                        <input type='text' />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "please input your email!" }]}
                    >
                        <input type='email' />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "please input your password!" }]}
                    >
                        <input type='password' />
                    </Form.Item>

                    <div className='flex flex-col gap-1 mt-2'>
                        <Button fullWidth title='Register' type="submit" />
                        <Link to='/login'
                            className='text-primary'
                        >Already have an account?</Link>
                    </div>

                </Form>
            </div>
        </div>
    )
}

export default Register