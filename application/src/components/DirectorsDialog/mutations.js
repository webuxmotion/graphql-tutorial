import { gql } from 'apollo-boost';

export const deleteDirectorMutation = gql`
  mutation deleteDirector($id: ID) {
    deleteMovie(id: $id) {
      id
    }
  }
`;