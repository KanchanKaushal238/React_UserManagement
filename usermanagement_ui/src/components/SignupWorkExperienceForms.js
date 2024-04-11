import classes from "./SignupForm.module.css";


export default function SignupWorkExperienceForm({ setKey }) {
  return (
    <div className={classes.accordionContent} key = {`accordianContent-${setKey}`}>
      <hr key = {`hr-${setKey}`}/>
      <div className={classes.formrow} key = {`divFormRow1-${setKey}`}>
        
        <label htmlFor="companyName" key = {`labelCompanyName-${setKey}`}>Company Name </label>
        <input id="companyName" type="text" key = {`inputCompanyName-${setKey}`} name = {`we-CompanyName-${setKey}`} required />

        <label htmlFor="designation" key = {`labeldesignation-${setKey}`}>Designation </label>
        <input id="designation" type="text" key = {`inputdesignation-${setKey}`} name = {`we-Designation-${setKey}`}  required />
      </div>

      <div className={classes.formrow} key = {`divFormRow2-${setKey}`}>
        <label htmlFor="duration" key = {`labelduration-${setKey}`}>Duration</label>
        <input id="duration" type="number" key = {`inputDuration-${setKey}`} name = {`we-Duration-${setKey}`} className = {classes.datetime} required />

        <label htmlFor="tech" key = {`labelTech-${setKey}`}>Technology</label>
        <input id="tech" type="text" key = {`inputTech-${setKey}`} name = {`we-Technology-${setKey}`}  required />
      </div>
    </div>
  );
}
