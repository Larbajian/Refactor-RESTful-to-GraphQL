import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email:String!, $password:String!) {
    login(email:$email, $password:$password) {
        token
        user {
            _id
            username
            bookCount
            savedBooks {
                _id
                title
            }

        }
  
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        bookCount
        savedBooks {
          _id
          title
        }
      }
    }
  }
`;
export const SAVE_BOOK = gql`
  mutation saveBook($bookId: ID!, $authors:[String]!, $description:String!, $title:String!, $image:String!) {
    saveBook(bookId: $bookId, authors:$authors, description:$description, title:$title, image:$image) {
        user{
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

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
        user{
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
