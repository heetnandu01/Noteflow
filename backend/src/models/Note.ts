    import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>({
  title: {
    type: String,
    required: [true, 'Note title is required'],
    trim: true,
    maxlength: [100, 'Title must be less than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Note content is required'],
    maxlength: [5000, 'Content must be less than 5000 characters']
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

noteSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<INote>('Note', noteSchema);