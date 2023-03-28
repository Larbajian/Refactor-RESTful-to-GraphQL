import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me($userId:ID!){
    user (usesrId:$userId){
        _id
        username
        bookCount
        savedBooks {
          _id
          title
        }
      }
  }
`;

