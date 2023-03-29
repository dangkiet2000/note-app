import { GraphQLRequest } from "./request";

export const foldersLoader = async () => {
  const query = `query example {
    folders {
      id
      name
      createdAt
    }
  }`;

  const data = await GraphQLRequest({ query });

  return data;
};

export const addNewFolder = async (newFolder) => {
  const query = `mutation Mutation($name: String!){
    addFolder(name: $name) {
      name
      author{
        name
      }
    }
  }`;

  const data = await GraphQLRequest({
    query,
    variables: { name: newFolder.name },
  });

  return data;
};
