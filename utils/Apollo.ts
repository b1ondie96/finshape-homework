import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
} from "@apollo/client";

export const apolloClient = () => {
  let client: ApolloClient<NormalizedCacheObject> | null = null;
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_BACKEND_URL,
      cache: new InMemoryCache(),
    });
  }

  return client;
};

export const GET_SCORES = gql`
  {
    allScores(sortBy: score_DESC, first: 10, where: { score_gte: 0 }) {
      score
      player {
        id
        name
      }
      id
    }
  }
`;
export const CREATE_USER = gql`
  mutation createUser($username: String, $email: String, $password: String) {
    createUser(data: { name: $username, email: $email, password: $password }) {
      id
      name
    }
  }
`;
export const AUTH_USER = gql`
  mutation authenticateUserWithPassword($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      token
      item {
        id
        name
      }
    }
  }
`;
export const NEW_GAME = gql`
  {
    newGame {
      state
      score
      finished
    }
  }
`;
export const PROCESS_GAME = gql`
  mutation processGame(
    $state: [[Int!]!]!
    $score: Int!
    $direction: Direction!
  ) {
    processGame(game: { state: $state, score: $score, direction: $direction }) {
      state
      score
      finished
    }
  }
`;
export const CREATE_SCORE = gql`
  mutation createScore($score: Int) {
    createScore(data: { score: $score }) {
      player {
        id
        name
      }
      score
    }
  }
`;
