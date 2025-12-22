import mongoose, { Schema, Document, Model } from 'mongoose';

export interface TaskDocument extends Document {
  title: string;
  completed: boolean;
}

const taskSchema = new Schema<TaskDocument>({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task: Model<TaskDocument> =
  mongoose.models.Task ||
  mongoose.model<TaskDocument>('Task', taskSchema);

export default Task;
