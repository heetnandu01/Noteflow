import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit3, LogOut, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { notesAPI } from '../services/api';
import type { Note } from '../types';
import Button from '../components/Button';
import Input from '../components/Input';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  
  const [newNote, setNewNote] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await notesAPI.getNotes();
      setNotes(response.data.notes);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        (error as any).response?.status === 401
      ) {
        toast.error('Session expired. Please login again.');
        logout();
        navigate('/signin');
      } else {
        toast.error('Failed to load notes');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsCreating(true);
    try {
      const response = await notesAPI.createNote(newNote);
      setNotes(prev => [response.data.note, ...prev]);
      setNewNote({ title: '', content: '' });
      toast.success('Note created successfully!');
    } catch (error) {
      toast.error('Failed to create note');
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingNote || !editingNote.title.trim() || !editingNote.content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await notesAPI.updateNote(editingNote.id, {
        title: editingNote.title,
        content: editingNote.content
      });
      
      setNotes(prev => prev.map(note => 
        note.id === editingNote.id ? response.data.note : note
      ));
      
      setEditingNote(null);
      toast.success('Note updated successfully!');
    } catch (error) {
      toast.error('Failed to update note');
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await notesAPI.deleteNote(noteId);
      setNotes(prev => prev.filter(note => note.id !== noteId));
      toast.success('Note deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete note');
    }
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await logout();
      navigate('/signin');
      toast.success('Logged out successfully!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className=" items-center justify-center mr-3">
                <svg
            width="79"
            height="32"
            viewBox="0 0 79 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.1424 0.843087L16.9853 0L14.3248 9.89565L11.9228 0.961791L8.76555 1.80488L11.3608 11.4573L4.8967 5.01518L2.58549 7.31854L9.67576 14.3848L0.845959 12.0269L0 15.1733L9.64767 17.7496C9.53721 17.2748 9.47877 16.7801 9.47877 16.2717C9.47877 12.6737 12.4055 9.75685 16.0159 9.75685C19.6262 9.75685 22.5529 12.6737 22.5529 16.2717C22.5529 16.7768 22.4952 17.2685 22.3861 17.7405L31.1541 20.0818L32 16.9354L22.314 14.3489L31.1444 11.9908L30.2984 8.84437L20.6128 11.4308L27.0768 4.98873L24.7656 2.68538L17.7737 9.65357L20.1424 0.843087Z"
              fill="#367AFF"
            />
            <path
              d="M22.3776 17.7771C22.1069 18.9176 21.5354 19.9421 20.7513 20.763L27.1033 27.0935L29.4145 24.7901L22.3776 17.7771Z"
              fill="#367AFF"
            />
            <path
              d="M20.6872 20.8292C19.8936 21.637 18.8907 22.2398 17.7661 22.5504L20.0775 31.1472L23.2346 30.3041L20.6872 20.8292Z"
              fill="#367AFF"
            />
            <path
              d="M17.6482 22.5819C17.1264 22.7156 16.5795 22.7866 16.0159 22.7866C15.4121 22.7866 14.8274 22.705 14.2723 22.5523L11.9589 31.1569L15.116 32L17.6482 22.5819Z"
              fill="#367AFF"
            />
            <path
              d="M14.1607 22.5205C13.0532 22.1945 12.0682 21.584 11.2908 20.7739L4.92322 27.1199L7.23442 29.4233L14.1607 22.5205Z"
              fill="#367AFF"
            />
            <path
              d="M11.2377 20.7178C10.4737 19.9026 9.91718 18.8917 9.65228 17.7688L0.855713 20.1179L1.70167 23.2643L11.2377 20.7178Z"
              fill="#367AFF"
            />
           
          
        </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">Welcome, {user?.fullName}!</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section - Mobile */}
        <div className="sm:hidden bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Welcome, {user?.fullName}!</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Create New Note Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Note</h2>
          <form onSubmit={handleCreateNote} className="space-y-4">
            <Input
              placeholder="Note title..."
              value={newNote.title}
              onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
            />
            <textarea
              placeholder="Write your note here..."
              value={newNote.content}
              onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
              className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            />
            <Button
              type="submit"
              isLoading={isCreating}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Note</span>
            </Button>
          </form>
        </div>

        {/* Notes Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
            <span className="text-sm text-gray-500">{notes.length} notes</span>
          </div>

          {notes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit3 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
              <p className="text-gray-500">Create your first note to get started!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <div key={note.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                  {editingNote?.id === note.id ? (
                    <form onSubmit={handleUpdateNote} className="space-y-4">
                      <Input
                        value={editingNote.title}
                        onChange={(e) => setEditingNote(prev => prev ? { ...prev, title: e.target.value } : null)}
                      />
                      <textarea
                        value={editingNote.content}
                        onChange={(e) => setEditingNote(prev => prev ? { ...prev, content: e.target.value } : null)}
                        rows={4}
                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      />
                      <div className="flex space-x-2">
                        <Button type="submit" size="sm">Save</Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingNote(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {note.title}
                        </h3>
                        <div className="flex space-x-1 ml-2">
                          <button
                            onClick={() => setEditingNote(note)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 line-clamp-4 mb-4">
                        {note.content}
                      </p>
                      <div className="text-xs text-gray-400">
                        {new Date(note.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;