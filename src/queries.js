import gql from 'graphql-tag';

export const GET_NOTES_QUERY = gql`
  query GetNotesQuery {
    notes {
      id
      createdAt
      text
    }
  }
`;
