import { createYoga, createSchema } from 'graphql-yoga';

let tasks: any[] = [];

export const yoga = createYoga({
  schema: createSchema({
    typeDefs: `
      type Task {
        id: ID!
        title: String!
        completed: Boolean!
      }

      type Query {
        tasks: [Task!]!
      }

      type Mutation {
        addTask(title: String!): Task!
        toggleTask(id: ID!): Task!
        deleteTask(id: ID!): Boolean!
      }
    `,
    resolvers: {
      Query: {
        tasks: () => tasks,
      },
      Mutation: {
        addTask: (_: unknown, { title }: { title: string }) => {
          const task = {
            id: crypto.randomUUID(),
            title,
            completed: false,
          };
          tasks.push(task);
          return task;
        },
        toggleTask: (_: unknown, { id }: { id: string }) => {
          const task = tasks.find(t => t.id === id);
          if (!task) throw new Error('Task not found');
          task.completed = !task.completed;
          return task;
        },
        deleteTask: (_: unknown, { id }: { id: string }) => {
          tasks = tasks.filter(t => t.id !== id);
          return true;
        },
      },
    },
  }),
});
