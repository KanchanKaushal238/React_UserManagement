import { Form } from "react-router-dom";
import classes from "./LoginForm.module.css";

export default function LoginForm() {
  return (
    <Form method="post" className={classes.form}>
      <h1>Log in</h1>

      <p>
        <label htmlFor="username">UserName</label>
        <input id="username" type="username" name="username" required />
      </p>
      <p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" required />
      </p>

      <div className={classes.actions}>
        <button type="submit">Login User</button>
      </div>
    </Form>
  );
}
