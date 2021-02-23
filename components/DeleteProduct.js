import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  console.log(payload);
  /**
   * In most cases, apollo takes payload.__typename and payload.id to make a string like
   * Product:87sg6d876fsagasdf876f7t6alol
   *
   * To identify a unique object and modify or evict it.
   */
  const identify = cache.identify(payload.data.deleteProduct);
  console.log("IDentify cache:obj", { identify, payload });
  cache.evict(identify);
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });
  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to delete this item?")) {
          const res = await deleteProduct().catch((err) => alert(err.message));
          console.log("Delete response", res);
        }
      }}
    >
      {children}
    </button>
  );
}
