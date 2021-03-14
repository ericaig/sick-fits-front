import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";
import { CURRENT_USER_QUERY } from "./User";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    token: "",
  });

  const [_signUp, { loading, data }] = useMutation(RESET_MUTATION, {
    variables: {
      email: inputs.email,
      password: inputs.password,
      token: inputs.token,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  console.log("Data", data);

  function handleSubmit(e) {
    e.preventDefault();

    _signUp().catch(console.error);

    resetForm();
  }

  const error =
    data?.redeemUserPasswordResetToken.__typename ===
    "UserAuthenticationWithPasswordFailure"
      ? data?.redeemUserPasswordResetToken
      : undefined;

  return (
    <Form onSubmit={handleSubmit} method="POST">
      <h2>Reset your password!</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in</p>
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
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={inputs.password}
            autoComplete="password"
            onChange={handleChange}
          />
        </label>

        <button type="submit">Reset</button>
      </fieldset>
    </Form>
  );
}
