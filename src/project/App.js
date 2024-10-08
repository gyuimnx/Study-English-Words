import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Chapter from './Chapter';
import Word from './Word';

const App = () => {
    const [chapters, setChapters] = useState([]);
    const [chapterWords, setChapterWords] = useState({});

    const handleCreateChapter = (newChapter) => {
        setChapters([...chapters, newChapter]);
        setChapterWords({ ...chapterWords, [newChapter.id]: [] });
    };

    const handleAddWord = (chapterId, word) => {
        setChapterWords({
            ...chapterWords,
            [chapterId]: [...chapterWords[chapterId], word],
        });
    };

    return (
    <Router>
        <Switch>
            <Route exact path="/">
                <Chapter chapters={chapters} onCreateChapter={handleCreateChapter} />
            </Route>
            <Route path="/chapter/:id">
                <Word addWord={handleAddWord} getWords={(id) => chapterWords[id] || []} />
            </Route>
        </Switch>
    </Router>
    );
};

export default App;