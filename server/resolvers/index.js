import { AuthorModel, FolderModel, NoteModel } from "../models/index.js";
import { GraphQLScalarType } from "graphql";

export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),
  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      }).sort({
        updatedAt: "desc",
      });

      return folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      const foundFolder = await FolderModel.findById(folderId);
      return foundFolder;
    },
    note: async (parent, args) => {
      const noteId = args.noteId;
      const note = NoteModel.findById(noteId);
      return note;
    },
  },

  Folder: {
    author: async (parent, args) => {
      const authorId = parent.authorId;
      const author = await AuthorModel.findOne({
        uid: authorId,
      });
      return author;
    },
    notes: async (parent, args) => {
      const notes = await NoteModel.find({
        folderId: parent.id,
      }).sort({ updatedAt: "desc" });

      return notes;
    },
  },

  Mutation: {
    addNote: async (_, args) => {
      const newNote = new NoteModel(args);
      await newNote.save();

      return newNote;
    },
    updateNote: async (parent, args) => {
      const noteId = args.id;
      const note = await NoteModel.findByIdAndUpdate(noteId, args);

      return note;
    },
    addFolder: async (_, args, context) => {
      const newFolder = new FolderModel({ ...args, authorId: context.uid });

      await newFolder.save();
      return newFolder;
    },
    register: async (_, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid });

      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }

      return foundUser;
    },
  },
};
