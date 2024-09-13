import React, {useState, useRef} from "react";
import "./App.css";
import Header from "./Header";
import SubjectEditor from "./SubjectEditor";
import SubjectList from "./SubjectList";
import SubjectDetail from "./SubjectDetail";

function App() {
    const [subject, setSubject] = useState([]); 
    const idRef = useRef(0);
    const [selectedSubject, setSelectedSubject] = useState(null);

    function onCreate(content){
        const newItem = {
            id: idRef.current,
            isDone: false,
            content,
            createdDate: new Date().getTime(),
        };
        setSubject([newItem, ...subject]);
        idRef.current += 1;
    };

    function onUpdate(targetId) {
        setSubject(subject.map((item)=>
        item.id === targetId ? {...item, isDone: !item.isDone} : item)
        )
    };

    function onDelete(targetId) {
        setSubject(subject.filter((item)=>item.id !== targetId))
    };

    function onSelectSubject(id) {
        const selected = subject.find(item => item.id === id);
        setSelectedSubject(selected);
    };

    function closeSubjectDetail() {
        setSelectedSubject(null);
    }

    return(
        <div className="App">
            <Header></Header>
            <SubjectEditor onCreate={onCreate}></SubjectEditor>
            <SubjectList 
                subject={subject} 
                onUpdate={onUpdate} 
                onDelete={onDelete} 
                onSelectSubject={onSelectSubject}>
            </SubjectList>
            {selectedSubject && (
                <SubjectDetail 
                    subject={selectedSubject}
                    onClose={closeSubjectDetail}>
                </SubjectDetail>)}
        </div>
    )
};

export default App;