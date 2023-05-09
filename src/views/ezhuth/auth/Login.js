import React, { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import { Button, Card, CardBody, CardGroup, CardSubtitle, CardTitle, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap'
import { userRegister } from 'utilities/apiService'
import { userLogin } from 'utilities/apiService'

export default function Login() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [photo, setPhoto] = useState('')
    const [otp, setOtp] = useState('')
    // errors
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [otpError, setOtpError] = useState('')

    const [isRegister, setIsRegister] = useState(false)
    const[isForgotPassword, setIsForgotPassword] = useState(false)
    // const [isverify, setIsverify] = useState(false)
    const [isOtp, setIsOtp] = useState(false)
    const [isResetPassword, setIsResetPassword] = useState(false)

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
                    setTimeout(() => {
                    navigation.push('/ezhuth/home')
                    window.location.reload()
                    }, 1000);
                }else{
                    toast.error(response.data.message)
                }
        }
    }

    const handleRegister = async(e) => {
        e.preventDefault()
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
            const regResponse=await userRegister({
                name:name,
                email:email,
                password:password
            })
            if(regResponse.ok){
                toast.success('Welcome to Ezhuth')
                setTimeout(() => {
                    setIsRegister(false)
                }, 1000);
            }else{
                toast.error(regResponse.data.message)
            }
        }

    }

    const photoUpload = (e) => {
        e.preventDefault()
        const reader = new FileReader()
        const file = e.target.files[0]
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPhoto({
                file: file,
                previewURL: reader.result
            })
        }
        reader.readAsDataURL(file)
    }
  return (
    <div className='bg-light min-vh-100 d-flex flex-row align-items-center'>
        <Container>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <CardGroup>
                        <Card className='p-4'>
                            <CardBody>
                                {
                                isResetPassword ? (
                                    <>
                                    <CardTitle tag='h1'>Reset Password</CardTitle>
                                    <CardSubtitle tag='h6' className='mb-2 text-muted'>Reset your password</CardSubtitle>
                                    <FormGroup>
                                    <Label for='newPassword'>New Password</Label>
                                    <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    {passwordError && <p className='text-danger'>{passwordError}</p>}
                                    <Label for='confirmPassword'>Confirm Password</Label>
                                    <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    {confirmPasswordError && <p  className='text-danger'>{confirmPasswordError}</p>}
                                    {/* <a href='#'>
                                    Forgot Password?</a> */}
                                    <br />
                                    <Button color='primary' className='mt-3' block onClick={handleLogin}>Reset Password</Button>
                                    {/* <p className='text-center mt-3'>Don't have an account? <a href='#' onClick={()=>setIsRegister(true)}>Sign Up</a></p> */}
                                    </FormGroup>
                                    </>
                                ):isOtp ? (
                                    <>
                                    <CardTitle tag='h1'>Verify OTP</CardTitle>
                                    <CardSubtitle tag='h6' className='mb-2 text-muted'>Verify your OTP</CardSubtitle>
                                    <FormGroup>
                                    <Label for='otp'>OTP</Label>
                                    <Input placeholder="OTP" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                    {otpError && <p className='text-danger'>{otpError}</p>}
                                    {/* <a href='#'>
                                    Forgot Password?</a> */}
                                    <br />
                                    <Button color='primary' className='mt-3' block onClick={handleLogin}>Verify OTP</Button>
                                    {/* <p className='text-center mt-3'>Don't have an account? <a href='#' onClick={()=>setIsRegister(true)}>Sign Up</a></p> */}
                                    </FormGroup>
                                    </>
                                ):isForgotPassword ? (
                                    <>
                                    <CardTitle tag='h1'>Verify Email</CardTitle>
                                    <CardSubtitle tag='h6' className='mb-2 text-muted'>Verify your email</CardSubtitle>
                                    <FormGroup>
                                    <Label for='email'>Email</Label>
                                    <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {emailError && <p className='text-danger'>{emailError}</p>}
                                    <a href='#' onClick={()=>setIsForgotPassword(false)}>
                                    Back to Login
                                    </a>
                                    <br />
                                    <Button color='primary' className='mt-3' block onClick={handleLogin}>Verify Email</Button>
                                    {/* <p className='text-center mt-3'>Don't have an account? <a href='#' onClick={()=>setIsRegister(true)}>Sign Up</a></p> */}
                                    </FormGroup>
                                    </>
                                ):isRegister ? (
                                    <>
                                <CardTitle tag='h1'>REGISTER</CardTitle>
                                <CardSubtitle tag='h6' className='mb-2 text-muted'>Create your account</CardSubtitle>
                                <FormGroup>
                                    <Label for='photo-upload' className='text-center w-100' style={{cursor:'pointer'}}>
                                        <span className='text-primary' onClick={photoUpload}>
                                            <img

                                                src='https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'
                                                className='rounded-circle img-thumbnail'
                                                alt='profile'
                                                width='100'
                                                height='100'
                                            />
                                            <br />
                                        </span>
                                    </Label>                                    
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
                                ):(
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
                                    <a href='#' onClick={()=>setIsForgotPassword(true)}>
                                    Forgot Password?</a>
                                    <br />
                                    <Button color='primary' className='mt-3' block onClick={handleLogin}>Login</Button>
                                    <p className='text-center mt-3'>Don't have an account? <a href='#' onClick={()=>setIsRegister(true)}>Sign Up</a></p>
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
