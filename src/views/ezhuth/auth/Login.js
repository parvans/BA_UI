import React, { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import { Button, Card, CardBody, CardGroup, CardSubtitle, CardTitle, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap'
import { userLogin } from 'utilities/apiService'

export default function Login() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    // errors
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    // const[isForgotPassword, setIsForgotPassword] = useState(false)

    const navigation=useHistory()
    const handleLogin = async(e) => {
        e.preventDefault()
        if (email === '') {
            setEmailError('Email is required')
        } else if (email.includes('@') === false) {
            setEmailError('Email is invalid')
        }else{
            setEmailError('')
        }
         if (password === '') {
            setPasswordError('Password is required')
        } else {
            setPasswordError('')
            // console.log('Email: ', email, password);
            // navigation.push('/ezhuth/home')

                const response=await userLogin(email, password)
                if(response.ok){
                    toast.success('Login Success')
                    localStorage.setItem('ezuth-token', response.data.token)
                    navigation.push('/ezhuth/home')
                }else{
                    toast.error(response.data.message)
                }
        }
    }

    const handleRegister = () => {
        if(name === ''){
            setNameError('Name is required')
        }else{
            setNameError('')
        }
        if (email === '') {
            setEmailError('Email is required')
        }else if(email.includes('@') === false){
            setEmailError('Email is invalid')
        }else{
            setEmailError('')
        }
        if (password === '') {
            setPasswordError('Password is required')
        } else {
            setPasswordError('')
        }
        if (confirmPassword === '') {
            setConfirmPasswordError('Confirm Password is required')
        } else if (confirmPassword !== password) {
            setConfirmPasswordError('Password does not match')
        } else {
            setConfirmPasswordError('')
            console.log('Name: ', name);
            console.log('Email: ', email);
        }

    }
  return (
    <div className='bg-light min-vh-100 d-flex flex-row align-items-center'>
        <Container>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <CardGroup>
                        <Card className='p-4'>
                            <CardBody>
                                {!isRegister?(
                                    <>
                                <CardTitle tag='h1'>LOGIN</CardTitle>
                                <CardSubtitle tag='h6' className='mb-2 text-muted'>Sign In to your account</CardSubtitle>
                                <FormGroup>
                                    <Label for='exampleEmail'>Email</Label>
                                    <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {emailError && <p className='text-danger'>{emailError}</p>}
                                    <Label for='examplePassword'>Password</Label>
                                    <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    {passwordError && <p  className='text-danger'>{passwordError}</p>}
                                    <a href='#'>
                                    Forgot Password?</a>
                                    <br />
                                    <Button color='primary' className='mt-3' block onClick={handleLogin}>Login</Button>
                                    <p className='text-center mt-3'>Don't have an account? <a href='#' onClick={()=>setIsRegister(true)}>Sign Up</a></p>
                                </FormGroup>
                                </>
                                )
                                :(
                                    <>
                                <CardTitle tag='h1'>REGISTER</CardTitle>
                                <CardSubtitle tag='h6' className='mb-2 text-muted'>Create your account</CardSubtitle>
                                <FormGroup>
                                    <Label for='exampleName'>Name</Label>
                                    <Input placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                    {nameError && <p className='text-danger' >{nameError}</p>}
                                    <Label for='exampleEmail'>Email</Label>
                                    <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {emailError && <p className='text-danger'>{emailError}</p>}
                                    <Label for='examplePassword'>Password</Label>
                                    <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    {passwordError && <p  className='text-danger'>{passwordError}</p>}
                                    <Label for='examplePassword'>Confirm Password</Label>
                                    <Input placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    {confirmPasswordError && <p  className='text-danger'>{confirmPasswordError}</p>}
                                    <Button color='primary' className='mt-3' block onClick={handleRegister}>Register</Button>
                                    <p className='text-center mt-3'>Already have an account? <a href='#' onClick={()=>setIsRegister(false)}>Login</a></p>
                                </FormGroup>
                                </>
                                )
                                }
                            </CardBody>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
        <Toaster
            position='top-center'
            reverseOrder={false}
        />
    </div>
  )
}
