import SignupForm from "../components/SignupForm";
import {json, redirect} from 'react-router-dom';

function SignupPage(){
    return <SignupForm />
}

export default SignupPage;

export async function action ({request})
{
    debugger;
    const data = await request.formData();

    let weNumber = data.get('weLength');
    let eduNumber = data.get('eduLength');

    let weArr= [];
      if (weNumber > 0) {
        for (let i = 0; i < weNumber; i++) {
          let weObj = {};
          for (const [key, value] of data) {
            
            let keyArr = key.split("-")
            if (keyArr[0] === "we" && keyArr[2] == i) {
              weObj[keyArr[1]] = value;
            }
          }
          weArr.push(weObj);
        }
      }

      let eduArr= [];
      if (eduNumber > 0) {
        for (let i = 0; i < eduNumber; i++) {
          let eduObj = {};
          for (const [key, value] of data) {
            
            let keyArr = key.split("-")
            if (keyArr[0] === "edu" && keyArr[2] == i) {
              eduObj[keyArr[1]] = value;
            }
          }
          eduArr.push(eduObj);
        }
      }
    const registrationModel = {
        userDetails : {
            UserName : data.get('username'),
            EmailAddress: data.get('email'),
            Password : data.get('password'),
            PhoneNumber: data.get('phone'),
            CurrentTechnology: data.get('currentTech'),
            UserRole: 'User'
        },
        educationDetails : [...eduArr],
        workExperienceDetails:[...weArr]
    }
    
    const response = await fetch('https://localhost:44344/api/Registration/RegisterUser', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registrationModel)
    });


    const responseData = await response.json();
    
    if(!response.ok)
    {
        throw json({message: 'Could not register user'}, {status: 500});
    }
    else{

        if(responseData.statusCode != '200')
        {
            return responseData;
        }
        else{
            return responseData;
        }
    }
}
