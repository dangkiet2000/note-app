export const typeDefs = `#graphql 
scalar Date

type Query {
  folders: [Folder],
  folder(folderId: String!): Folder,
  note(noteId: String): Note
}

type Folder {
  id: String!
  name: String
  createdAt: String
  author: Author
  notes: [Note]
}

type Note {
  id: String!
  content: String
  updatedAt: Date
}

type Author {
  name: String!
  uid: String!
}

type Mutation {
  addFolder (name: String!) : Folder,
  register (uid: String!, name: String!): Author,
  addNote (content: String!, folderId: ID!) : Note,
  updateNote (id: String!, content: String) : Note,
}
`;
