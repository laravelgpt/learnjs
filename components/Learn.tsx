import React, { useState } from 'react';
import { Subject, Topic } from '../types';
import { BookIcon } from './icons/BookIcon';
import { CodeIcon } from './icons/CodeIcon';

interface LearnProps {
  lessons: Subject[];
  onTopicSelect: (topic: Topic) => void;
}

const Learn: React.FC<LearnProps> = ({ lessons, onTopicSelect }) => {
  const [openSubjects, setOpenSubjects] = useState<string[]>(lessons.map(s => s.name));

  const toggleSubject = (name: string) => {
    setOpenSubjects(prev =>
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  };

  return (
    <div className="p-2">
      <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider px-2 mb-2">Subjects</h3>
      {lessons.map(subject => (
        <div key={subject.name}>
          <button
            onClick={() => toggleSubject(subject.name)}
            className="w-full flex items-center gap-2 text-left px-2 py-1.5 text-sm text-slate-300 hover:bg-slate-700 focus:outline-none rounded transition-colors"
          >
            <svg className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform ${openSubjects.includes(subject.name) ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <BookIcon className="w-5 h-5 text-lime-400 flex-shrink-0" />
            <span>{subject.name}</span>
          </button>
          <div className={`transition-all duration-300 ease-in-out overflow-hidden`} style={{maxHeight: openSubjects.includes(subject.name) ? '500px' : '0'}}>
            <div className="pl-5 border-l-2 border-slate-700 ml-4">
              {subject.topics.map(topic => (
                <button
                  key={topic.title}
                  onClick={() => onTopicSelect(topic)}
                  className="w-full flex items-center gap-2 text-left px-2 py-1.5 text-sm text-slate-400 hover:bg-slate-700 hover:text-lime-300 focus:outline-none rounded transition-colors"
                >
                  <CodeIcon className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  <span>{topic.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Learn;