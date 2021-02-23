import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";
import { CURRENT_USER_QUERY } from "./User";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    name: "",
    password: "",
  });

  const [_signUp, { loading, data, error }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      password: inputs.password,
      email: inputs.email,
      name: inputs.name,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

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
      <h2>Sign up for an account!</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please go ahead and sign in
          </p>
        )}
        <label htmlFor="name">
          Your name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            value={inputs.name}
            autoComplete="name"
            onChange={handleChange}
          />
        </label>
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

        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
}
