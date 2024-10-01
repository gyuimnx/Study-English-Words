import React, { useState } from 'react';
import './main.css'; // Import the CSS file

const ChapterManagement = () => {
    const [chapters, setChapters] = useState([]);
    const [newChapter, setNewChapter] = useState({ name: '', description: '' });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingChapter, setEditingChapter] = useState(null);

    const handleCreateChapter = () => {
        if (newChapter.name.trim()) {
            setChapters([...chapters, { ...newChapter, progress: 0 }]);
            setNewChapter({ name: '', description: '' });
            setIsDialogOpen(false);
        }
    };

    const handleEditChapter = (index) => {
        setEditingChapter({ ...chapters[index], index });
        setIsDialogOpen(true);
    };

    const handleUpdateChapter = () => {
        if (editingChapter && editingChapter.name.trim()) {
            const updatedChapters = [...chapters];
            updatedChapters[editingChapter.index] = {
                name: editingChapter.name,
                description: editingChapter.description,
                progress: editingChapter.progress,
            };
            setChapters(updatedChapters);
            setEditingChapter(null);
            setIsDialogOpen(false);
        }
    };

    const handleDeleteChapter = (index) => {
        setChapters(chapters.filter((_, i) => i !== index));
    };

    return (
<<<<<<< HEAD
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>챕터 관리</h1>
        <button
            className='newBtn'
            onClick={() => setIsDialogOpen(true)}
            yle={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginBottom: '20px'
            }}
        >
        새로운 챕터 만들기
        </button>
=======
        <div className="chapter-management-container">
            <h1 className="title">챕터 관리</h1>
            <button
                onClick={() => setIsDialogOpen(true)}
                className="create-button"
            >
                새로운 챕터 만들기
            </button>
>>>>>>> origin/master

            <div className="chapter-list">
                {chapters.map((chapter, index) => (
                    <div key={index} className="chapter-card">
                        <h3>{chapter.name}</h3>
                        <p className="chapter-description">{chapter.description}</p>
                        <div className="progress-container">
                            <div className="progress-bar">
                                <div className="progress" style={{ width: `${chapter.progress}%` }} />
                            </div>
                            <span>{chapter.progress}%</span>
                        </div>
                        <div>
                            <button onClick={() => handleEditChapter(index)} className="edit-button">수정</button>
                            <button onClick={() => handleDeleteChapter(index)} className="delete-button">삭제</button>
                        </div>
                    </div>
                ))}
            </div>

            {isDialogOpen && (
                <div className="dialog-overlay">
                    <div className="dialog">
                        <h2>{editingChapter ? '챕터 수정' : '새로운 챕터 만들기'}</h2>
                        <input
                            type="text"
                            placeholder="챕터 이름"
                            value={editingChapter ? editingChapter.name : newChapter.name}
                            onChange={(e) =>
                                editingChapter
                                    ? setEditingChapter({ ...editingChapter, name: e.target.value })
                                    : setNewChapter({ ...newChapter, name: e.target.value })
                            }
                            className="input-field"
                        />
                        <button
                            onClick={editingChapter ? handleUpdateChapter : handleCreateChapter}
                            className="save-button"
                        >
                            {editingChapter ? '수정' : '생성'}
                        </button>
                        <button
                            onClick={() => {
                                setIsDialogOpen(false);
                                setEditingChapter(null);
                            }}
                            className="cancel-button"
                        >
                            취소
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChapterManagement;
