import classes from "./SignupForm.module.css";

export default function SignupEducationForm({ setKey }) {
  return (
    <div className={classes.accordionContent} key = {setKey}>
      <hr />
      <div className={classes.formrow} >
        <label htmlFor="qualification">Qualification/Degree Name </label>
        <input id="qualification" type="text" name = {`edu-Qualification-${setKey}`} required />

        <label htmlFor="uni">University/Board </label>
        <input id="uni" type="text" name = {`edu-University-${setKey}`} required />
      </div>

      <div className={classes.formrow}>
        <label htmlFor="percentage">Percentage</label>
        <input id="percentage" type="number" name = {`edu-Percentage-${setKey}`} required />

        <label htmlFor="passingYear">Passing Month/Year</label>
        <input id="passingYear" type="month" name = {`edu-PassingYear-${setKey}`} className = {classes.datetime} required />
      </div>
      <div className={classes.formrow}>
        <label htmlFor="stream">Stream </label>
        <input id="stream" type="text" name = {`edu-Stream-${setKey}`} required />

        <label htmlFor="address">Address</label>
        <input id="address" type="text" name = {`edu-Address-${setKey}`} required />
      </div>

    </div>
  );
}
