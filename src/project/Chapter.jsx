import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import './Chapter.css';

const Chapter = () => {
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
        const confirmDelete = window.confirm("삭제하시겠습니까?");
        if (confirmDelete) {
            setChapters(chapters.filter((_, i) => i !== index));
        }
    };
    

    return (
        <div className="chapter-management-container">
            <div className='chapter-header'>
                <h1 className="title">VOCA</h1>
                <button
                    onClick={() => setIsDialogOpen(true)}
                    className="create-button"
                >
                    새로운 챕터 만들기
                </button>
            </div>
            <div className='voca-container'>
                <div className='VOCA'>VOCA</div>
            </div>

            <div className="chapter-list">
                {chapters.map((chapter, index) => (
                    <div key={index} className="chapter-card">
                        <h3 className='chapter-name'>{chapter.name}</h3>
                        <div className='buttons'>
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

export default Chapter;
