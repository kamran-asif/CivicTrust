'use client';
import { useState, useEffect } from 'react';
import { Search, Plus, Save, X, Clock, Trash2, FileText, ChevronLeft, Shield, Moon, Bookmark, CheckSquare } from 'lucide-react';

const CopNotes = () => {
  // Initial sample notes
  const initialNotes = [
    {
      id: 1,
      title: "Case #4872 Interview Notes",
      content: "Suspect claims to have been at the movie theater during incident. Need to verify alibi with theater staff.",
      color: "#3B82F6",
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      title: "Patrol Observations",
      content: "Suspicious activity near 42nd & Main around 11pm. Multiple reports of vandalism in the area.",
      color: "#8B5CF6",
      timestamp: new Date(new Date().getTime() - 86400000).toISOString()
    },
    {
      id: 3,
      title: "Evidence Checklist",
      content: "- Collect surveillance footage\n- Document witness statements\n- Photograph crime scene\n- Request forensics team",
      color: "#EC4899",
      timestamp: new Date(new Date().getTime() - 172800000).toISOString()
    }
  ];

  const [notes, setNotes] = useState(initialNotes);
  const [selectedNote, setSelectedNote] = useState(initialNotes[0]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const noteColors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'];

  const handleSelectNote = (note) => setSelectedNote(note);

  const handleNoteContentChange = (e) => {
    const updatedNote = {
      ...selectedNote,
      content: e.target.value,
      timestamp: new Date().toISOString(),
    };
    setSelectedNote(updatedNote);
    setNotes(notes.map(n => (n.id === selectedNote.id ? updatedNote : n)));
  };

  const handleAddNewNote = () => {
    setIsAddingNote(true);
    setSelectedColor(noteColors[Math.floor(Math.random() * noteColors.length)]);
  };

  const createNewNote = () => {
    if (!newNoteTitle.trim()) return;

    const newNote = {
      id: Date.now(),
      title: newNoteTitle,
      content: '',
      color: selectedColor,
      timestamp: new Date().toISOString(),
    };

    setNotes(prev => [newNote, ...prev]);
    setSelectedNote(newNote);
    setNewNoteTitle('');
    setIsAddingNote(false);
  };

  const cancelNewNote = () => {
    setNewNoteTitle('');
    setIsAddingNote(false);
  };

  const deleteNote = (id) => {
    const filtered = notes.filter(note => note.id !== id);
    setNotes(filtered);
    if (selectedNote?.id === id) setSelectedNote(filtered[0] || null);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getGradientStyle = (color) => ({
    background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
    borderLeft: `3px solid ${color}`,
  });

  const categories = [
    { id: 'all', name: 'All Notes', icon: FileText },
    { id: 'cases', name: 'Case Notes', icon: Shield },
    { id: 'patrols', name: 'Patrol Notes', icon: Moon },
    { id: 'important', name: 'Important', icon: Bookmark },
    { id: 'tasks', name: 'Tasks', icon: CheckSquare },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Toggle sidebar button for mobile */}
      <button 
        className={`md:hidden fixed z-10 top-4 ${sidebarCollapsed ? 'left-4' : 'left-64'} bg-blue-600 p-2 rounded-full transition-all duration-300`}
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
      >
        <ChevronLeft className={`h-5 w-5 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? '-translate-x-full md:translate-x-0 md:w-20' : 'translate-x-0 w-72'} fixed md:relative z-10 md:z-0 h-full bg-slate-800 border-r border-slate-700 flex flex-col transition-all duration-300 shadow-xl`}>
        <div className="p-5 border-b border-slate-700">
          <h2 className={`text-xl font-bold mb-3 flex items-center ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <span className="text-2xl">📝</span> 
            {!sidebarCollapsed && <span className="ml-2">Police Notes</span>}
          </h2>
          {!sidebarCollapsed && (
            <div className="relative">
              <input
                className="w-full p-2 pl-9 rounded-lg bg-slate-700 text-gray-200 focus:ring-blue-500 focus:outline-none focus:ring-2"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
            </div>
          )}
        </div>

        {/* Categories */}
        <div className={`p-3 border-b border-slate-700 ${sidebarCollapsed ? 'flex flex-col items-center' : ''}`}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex items-center p-2 rounded-lg cursor-pointer mb-1 transition-colors
                ${activeCategory === category.id ? 'bg-blue-600' : 'hover:bg-slate-700'} 
                ${sidebarCollapsed ? 'justify-center' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <category.icon className={`${sidebarCollapsed ? 'h-5 w-5' : 'h-4 w-4 mr-3'}`} />
              {!sidebarCollapsed && <span>{category.name}</span>}
            </div>
          ))}
        </div>

        {/* Notes list */}
        <div className="flex-1 overflow-auto p-3">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              style={getGradientStyle(note.color)}
              className={`mb-2 p-3 rounded-lg cursor-pointer hover:bg-slate-700 transition-all ${
                selectedNote?.id === note.id ? 'bg-blue-900/20 ring-1 ring-blue-500/30' : ''
              }`}
              onClick={() => handleSelectNote(note)}
            >
              {!sidebarCollapsed && (
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{note.title}</div>
                    <div className="text-xs text-gray-400 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" /> {formatDate(note.timestamp)}
                    </div>
                  </div>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}>
                    <Trash2 size={14} className="text-gray-400 hover:text-red-400" />
                  </button>
                </div>
              )}
              {sidebarCollapsed && (
                <div className="h-12 w-10 flex items-center justify-center" title={note.title}>
                  <div 
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: note.color }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add new note button */}
        <div className="p-4 border-t border-slate-700">
          {isAddingNote && !sidebarCollapsed ? (
            <div>
              <input
                placeholder="Note title"
                className="w-full p-2 mb-2 border rounded bg-slate-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
              />
              <div className="flex gap-2 mb-2">
                {noteColors.map(color => (
                  <div
                    key={color}
                    className={`h-5 w-5 rounded-full cursor-pointer ${selectedColor === color ? 'ring-2 ring-white' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded transition-colors" onClick={createNewNote}>
                  <Save size={16} className="inline mr-1" /> Save
                </button>
                <button className="px-3 py-2 rounded bg-slate-600 hover:bg-slate-700 transition-colors" onClick={cancelNewNote}>
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <button 
              className={`${sidebarCollapsed ? 'p-3' : 'w-full px-3 py-2'} bg-green-600 hover:bg-green-700 rounded text-white flex items-center justify-center transition-colors`} 
              onClick={handleAddNewNote}
            >
              <Plus size={16} className={sidebarCollapsed ? '' : 'mr-1'} />
              {!sidebarCollapsed && <span>New Note</span>}
            </button>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-0 md:ml-20' : 'ml-72'}`}>
        {selectedNote ? (
          <div className="h-full flex flex-col p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full mr-3" style={{ backgroundColor: selectedNote.color }}></div>
                  <h2 className="text-2xl font-bold">{selectedNote.title}</h2>
                </div>
                <div className="text-xs text-gray-400 mt-1">Last updated: {formatDate(selectedNote.timestamp)}</div>
              </div>
              <button 
                onClick={() => deleteNote(selectedNote.id)} 
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <textarea
              value={selectedNote.content}
              onChange={handleNoteContentChange}
              className="w-full flex-1 bg-slate-800 text-gray-200 p-4 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Write your note here..."
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-lg">
            <div className="text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p>No note selected</p>
              <button 
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition-colors"
                onClick={handleAddNewNote}
              >
                Create a new note
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CopNotes;