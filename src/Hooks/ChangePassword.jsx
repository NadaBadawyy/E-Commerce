import axios from 'axios'
import React from 'react'

export default function ChangePassword() {
    async function sendEmail(email){
        let res=await axios.post( `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,{email})
        return res;
    }
  return {sendEmail}
}
