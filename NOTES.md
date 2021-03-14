## Keystone Multi quering:

```gql
query {
  allProducts(where:{name_contains_i:"yeti"}) {
    name
    price
  }
}
```

## Keystone Count data:

```gql
query {
  _allProductsMeta {
    count
  }
}
```

## [Keystone Inline Fragments:](https://graphql.org/learn/queries/#inline-fragments)

```gql
query {
    authenticatedItem {
        ... on Clients {
          id
          email
        }
        ... on User {
          id
          email
        }
    }
}
```

## GraphQl renaming fields

```gql
query {
  products: _allProductsMeta{
    total: count
  }
}
```

## useEffect
Helps to monitor pieces of states or variables and when they change, we run some code. More like Subscriptions / Observables in rxjs

## Context
Helps to define data (local state) and functionalities at a very high level which is then accessible to all lower level of our application without having to pass it down via props to wherever datas are needed