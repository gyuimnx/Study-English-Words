import React, { useState, useEffect } from 'react';
import './Word.css';

const Word = () => {
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [words, setWords] = useState([]);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
    if (message.text) {
        const timer = setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        return () => clearTimeout(timer);
        }
    }, [message]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!word.trim() || !meaning.trim()) {
            setMessage({ text: '단어와 뜻을 모두 입력해주세요.', type: 'error' });
            return;
        }
        if (words.some(item => item.word.toLowerCase() === word.toLowerCase())) {
            setMessage({ text: '이미 저장된 단어입니다.', type: 'error' });
            return;
        }
        setWords([...words, { word, meaning }]);
        setWord('');
        setMeaning('');
        setMessage({ text: '단어가 추가되었습니다!', type: 'success' });
    };

    const removeWord = (index) => {
        setWords(words.filter((_, i) => i !== index));
    };

    return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">나만의 영단어장</div>
                <h1 className="block mt-1 text-lg leading-tight font-medium text-black">새로운 단어 추가하기</h1>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="flex space-x-4">
                        <input
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="단어"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        />
                        <input
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="뜻"
                        value={meaning}
                        onChange={(e) => setMeaning(e.target.value)}
                        />
                        <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                        추가
                        </button>
                    </div>
                </form>
                {message.text && (
                <div
                    className={`mt-4 p-4 rounded-md ${
                    message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    } transition-opacity duration-300 ${message.text ? 'opacity-100' : 'opacity-0'}`}
                >
                    <svg
                    className="inline-block mr-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d={
                            message.type === 'error'
                                ? "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                : "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            }
                            clipRule="evenodd"
                        />
                    </svg>
                    {message.text}
                </div>
                )}
                <div className="mt-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">저장된 단어 목록</h2>
                    <ul className="divide-y divide-gray-200">
                        {words.map((item, index) => (
                            <li
                                key={index}
                                className="py-4 flex justify-between items-center hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{item.word}</p>
                                    <p className="text-sm text-gray-500 truncate">{item.meaning}</p>
                                </div>
                                <button
                                onClick={() => removeWord(index)}
                                className="ml-4 text-red-600 hover:text-red-800 transition-colors duration-200"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Word;