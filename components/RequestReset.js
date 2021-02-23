import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";
import { CURRENT_USER_QUERY } from "./User";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
  });

  const [_signUp, { loading, data, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: {
        email: inputs.email,
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  console.log("Data", data);

  function handleSubmit(e) {
    e.preventDefault();

    _signUp().catch(console.error);

    resetForm();
  }

  // const error =
  //   data?.authenticateUserWithPassword.__typename ===
  //   "UserAuthenticationWithPasswordFailure"
  //     ? data?.authenticateUserWithPassword
  //     : undefined;

  return (
    <Form onSubmit={handleSubmit} method="POST">
      <h2>Request a password reset!</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email address"
            value={inputs.email}
            autoComplete="email"
            onChange={handleChange}
          />
        </label>

        <button type="submit">Request reset</button>
      </fieldset>
    </Form>
  );
}
