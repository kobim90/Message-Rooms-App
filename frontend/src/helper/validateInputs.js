import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return <small className="text-danger">This field is required!</small>;
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return <small className="text-danger">This is not a valid email.</small>;
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <small className="text-danger">
        The username must be between 3 and 20 characters.
      </small>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <small className="text-danger">
        The password must be between 6 and 40 characters.
      </small>
    );
  }
};

export { required, validEmail, vusername, vpassword };
