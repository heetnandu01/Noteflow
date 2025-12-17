import { Response } from "express";
import Note from "../models/Note.js";
import { AuthRequest } from "../middleware/auth.js";



export const createNote = async (req: AuthRequest, res: Response): Promise<void> => {


    try {
        const { title, content } = req.body;
        const userId = req.user!.id;
        if (!title || !content) {
            res.status(400).json({ error: 'Title and content are required' });
            return;
        }

        const note = new Note({
            title,
            content,
            userId: userId
        });

        await note.save();
        res.status(201).json({
            Message: 'Note created successfully', note: {
                id: note.id,
                title: note.title,
                content: note.content,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt
            }
        });



    } catch (error) {
        console.error('Error creating note: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const getNotes = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!._id; // Assuming req.user is set by the auth middleware
        const notes = await Note.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            notes: notes.map(note => ({
                id: note.id,
                title: note.title,
                content: note.content,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt
            }))
        })

        
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteNote = async (req:AuthRequest,res:Response): Promise<void> => {
    try{
        const {id} = req.params;// Assuming the note ID is passes as a url parameter
        const userId = req.user!.id; // get the user ID from the authenticated user

        const note = await Note.findOneAndDelete({_id:id,userId});

        if(!note){
            res.status(404).json({error: 'Note not found or you do not have permission to delete this note'});
            return
        }

        res.status(200).json({Message : 'Note deleted successfully'});



    }catch(error){
        console.error('Error deleting note: ',error);
        res.status(500).json({error:'Internal server error'});
    }
}

export const updateNote = async(req:AuthRequest,res:Response): Promise<void> => {

    try {
       const {id} = req.params; // Assuming the note ID is passed as a url parameter
       const userId = req.user!.id; // Get the user ID from the authenticated user
       const{title,content} = req.body; // Get the Updated title and content from the request body

       if(!title || !content){
        res.status(400).json({error: 'Title and content are required'});
        return;
       }

       const note = await Note.findOneAndUpdate(
        {_id:id,userId},
        {title,content},
        {new:true} // Return the updated note 
       );

       if(!note){
        res.status(404).json({error:'Note not found or you do not have permission to update this note'});
        return;
       }
       res.status(200).json({
        message:'Note updated successfully',
        note:{
            id:note.id,
            title:note.title,
            content:note.content,
            createdAt:note.createdAt,
            updatedAt:note.updatedAt
        }
       });



    } catch (error) {
        console.error('Error updating note:',error);
        res.status(500).json({error:'Internal server error'});
    }
}

