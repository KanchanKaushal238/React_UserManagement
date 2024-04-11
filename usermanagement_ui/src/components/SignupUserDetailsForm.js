import { Fragment, useRef, useState } from "react";
import classes from "./SignupForm.module.css";
import {PatternFormat} from 'react-number-format';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


export default function SignupUserDetailsForm() 
{
  const pattern = new RegExp(/^\+91\s[6-9]\d{4}-\d{5}$/);
  const emailPattern = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
  const passwordPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/);

  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const phoneField = <PatternFormat type="tel"
  name="phone" onBlur={(event) => checkValidPhoneNumber(event)}
 id="phone" 
 format="+91 #####-#####" 
 mast="_"></PatternFormat>;

  const [phoneFormValue, setPhoneFormValues] = useState(['phoneField']);


  const emailRef = useRef();
  const pwdRef = useRef();

  function checkValidPhoneNumber(event)
  {
    if(!pattern.test(event.target.value))
    {
        setPhoneNumberValid(false);
        event.target.value = '';
    }
    else{
        setPhoneNumberValid(true);
    }
  }

  function checkEmailValidation()
  {
    if(!emailPattern.test(emailRef.current.value))
    {
        setEmailValid(false);
        emailRef.current.value = '';
    }
    else{
        setEmailValid(true);
    }
  }

  function checkPwdValidation()
  {
    if(!passwordPattern.test(pwdRef.current.value))
    {
        setPasswordValid(false);
        pwdRef.current.value = '';
    }
    else{
        setPasswordValid(true);
    }
  }

  function addPhoneField(event){
    event.preventDefault();

    setPhoneFormValues((prevValues) => {
      const updatedForm = [...prevValues];
      updatedForm.push("newPhoneField");
      return updatedForm;
    });
  }

  function removePhoneForm(index){

    setPhoneFormValues((prevValues) => {
        const phoneField =[...prevValues];
        phoneField.splice(index, 1);

        return phoneField;
      });
  }



  return (
    <>
      <div className={classes.formrow}>
        <label htmlFor="username">User Name </label>
        <input id="username" type="text" name="username" required />

        <label htmlFor="email">Email Address </label>
        <input
          ref={emailRef}
          id="email"
          type="text"
          name="email"
          onBlur={checkEmailValidation}
          required
        />
      </div>

      {!emailValid && (
        <div className={classes.validationError}>Enter valid email</div>
      )}

      <div className={classes.formrow}>
        <label htmlFor="password">Password</label>
        <input
          ref={pwdRef}
          id="password"
          type="password"
          name="password"
          onBlur={checkPwdValidation}
          required
        />

        <label htmlFor="currentTech">Current Tech </label>
        <input id="currentTech" type="text" name="currentTech" required />
        {/* <input ref = {phoneRef} id="phone" type="number" name="phone" onBlur={checkValidPhoneNumber} required /> */}

      </div>

      
      {!passwordValid && (
        <div className={classes.validationError}>
          Enter valid password, password should have
          <ul>
            <li># at least one lowercase letter</li>
            <li># at least one uppercase letter</li>
            <li># at least one digit</li>
            <li># at least one special character "!@#$%^&*()_+"</li>
            <li>
              # at least 8 characters, consisting of letters (uppercase and
              lowercase) and digits.
            </li>
          </ul>
        </div>
      )}

      <div className={classes.singlerow}>

      {phoneFormValue.length > 0 && phoneFormValue.map((element, index) => (
          <>
          <label htmlFor = {`phone-${index}`}>Phone Number</label>
              <PatternFormat
                type="tel"
                name={`phone-${index}`}
                onBlur={(event) => checkValidPhoneNumber(event)}
                id={`phone-${index}`}
                format="+91 #####-#####"
                mast="_"
              required />

              <div className={classes.trash}>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => removePhoneForm(index)}
                />
              </div>
          </>
        ))}

        <input name="phoneLength" id ="phoneLength" value = {phoneFormValue.length} type = "hidden"></input>

        

        {/* <label htmlFor="userRole">User Role </label>
      <input id="userRole" type="hidden" name="userRole" required /> */}
      </div>

      
      {!phoneNumberValid && (
        <div className={classes.validationError}>Enter valid phone number</div>
      )}

      <button type="button" className={classes.actions} onClick={(event) => addPhoneField(event)}>
          + Add Phone Number
        </button>
    </>
  );
}
