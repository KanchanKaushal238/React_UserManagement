import classes from "./SignupForm.module.css";
import { Form ,useActionData} from "react-router-dom";
import Accordion from "./Accordian";
import SignupUserDetailsForm from "./SignupUserDetailsForm";
import { Fragment, useState } from "react";
import SignupWorkExperienceForm from "./SignupWorkExperienceForms";
import SignupEducationForm from "./SignupEducationForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

let workExperience = {
  CompanyName: "",
  Designation: "",
  Duration: "",
  Technology: "",
};

let educationForm = {
  Qualification: "",
  Percentage: "",
  Stream: "",
  University: "",
  Year: "",
  Address: "",
};

function SignupForm() {
  const [weFormValue, setWeFormValues] = useState([]);
  const [educationFormValue, setEduFormValues] = useState([]);


  const data = useActionData();

  let classContent = classes.error;
  if (data && data.statusCode == "200") {
    classContent = classes.success;
  }

  function addWorkExperienceForm(event) {
    event.preventDefault();
    setWeFormValues((prevValues) => {
      const updatedForm = [...prevValues];
      updatedForm.push(workExperience);
      return updatedForm;
    });
  }

  function addEducationForm(event) {
    event.preventDefault();
    setEduFormValues((prevValues) => {
      const updatedForm = [...prevValues];
      updatedForm.push(educationForm);
      return updatedForm;
    });
  }

  function removeEducationForm(index){

    setEduFormValues((prevValues) => {
        const eduForm =[...prevValues];
        eduForm.splice(index, 1);

        return eduForm;
      });
  }

  function removeWeForm(index){

    setWeFormValues((prevValues) => {
        const weForm =[...prevValues];
        weForm.splice(index, 1);

        return weForm;
      });
  }

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>Registration Form</h1>
        <p>We just need a little bit of data from you to get you started 🚀</p>

        
        
        <hr />

        {data && data.statusCode && (
            <div className={classContent}>{data.statusCode} - {data.responseMessage} </div>
        )} 

        {!data && (
            <>
        <div className={classes.accordion}>
          <Accordion title="Enter User Details">
            <SignupUserDetailsForm />
          </Accordion>
        </div>

        {educationFormValue.map((element, index) => (
            <Fragment key = {`frag-${element}`}>
          <SignupEducationForm key = {`compnent-${element}`} setKey={index} />
          <div className={classes.trash} key = {`trashIcon-${element}`}>
              <FontAwesomeIcon key = {`iconTrash-${element}`} icon={faTrash} onClick={() => removeEducationForm(index)}/>
            </div>
            </Fragment>
        ))}
        {weFormValue.length > 0 && weFormValue.map((element, index) => (
          <>
            <SignupWorkExperienceForm setKey={index} />
            <div className={classes.trash}>
              <FontAwesomeIcon icon={faTrash} onClick={() => removeWeForm(index)}/>
            </div>
          </>
        ))}

        
        <input name="weLength" id ="weLength" value = {weFormValue.length} type = "hidden"></input>
        <input name="eduLength" id ="eduLength" value = {educationFormValue.length} type = "hidden"></input>
       

        <div className={classes.addForm}>
          <button type="button" onClick={(event) => addEducationForm(event)}>
            + Add Education Details
          </button>
          <button
            type="button"
            onClick={(event) => addWorkExperienceForm(event)}
          >
            + Add Work Experience
          </button>
        </div>

        <div className={classes.actions}>
          <button type="submit">Register</button>
          <button type="reset">Reset</button>
        </div>
</>)}
      </Form>
    </>
  );
}

export default SignupForm;
