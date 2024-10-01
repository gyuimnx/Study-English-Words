import React, { useState } from 'react';

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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {chapters.map((chapter, index) => (
            <div key={index} style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0' }}>{chapter.name}</h3>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>{chapter.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ flex: 1, height: '10px', backgroundColor: '#eee', borderRadius: '5px' }}>
                    <div
                        style={{
                        width: `${chapter.progress}%`,
                        height: '100%',
                        backgroundColor: '#28a745',
                        borderRadius: '5px'
                        }}
                    />
                    </div>
                    <span style={{ marginLeft: '10px', fontSize: '14px' }}>{chapter.progress}%</span>
                </div>
                <div>
                    <button
                        onClick={() => handleEditChapter(index)}
                        style={{
                            backgroundColor: '#ffc107',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            marginRight: '5px'
                        }}
                    >
                    수정
                    </button>
                    <button
                        onClick={() => handleDeleteChapter(index)}
                        style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '3px',
                        cursor: 'pointer'
                    }}
                    >
                    삭제
                    </button>
                </div>
            </div>
        ))}
        </div>

        {isDialogOpen && (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '300px' }}>
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
                style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
            />
            <textarea
                placeholder="챕터 설명"
                value={editingChapter ? editingChapter.description : newChapter.description}
                onChange={(e) =>
                editingChapter
                    ? setEditingChapter({ ...editingChapter, description: e.target.value })
                    : setNewChapter({ ...newChapter, description: e.target.value })
                }
                style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
            />
            <button
                onClick={editingChapter ? handleUpdateChapter : handleCreateChapter}
                style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px'
                }}
            >
                {editingChapter ? '수정' : '생성'}
            </button>
            <button
                onClick={() => {
                setIsDialogOpen(false);
                setEditingChapter(null);
                }}
                style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer'
                }}
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