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
export const SAVE_USER_BOOK = gql`
  mutation saveUserBook($bookId: ID!, $authors:[String]!, $description:String!, $title:String!, $image:String!) {
    saveUserBook(bookId: $bookId, authors:$authors, description:$description, title:$title, image:$image) {
        user{
            _id
            username
            email
            savedBooks {
                _id
                authors
                image
                title
                description
                link
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

