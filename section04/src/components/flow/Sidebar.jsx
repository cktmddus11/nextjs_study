"use client"

import React from 'react';
import { useDnD } from './DnDContext';
import '@/app/flow/flow2/index.css';
 
export default () => {
  const [_, setType] = useDnD();
 
  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
 
  return (
      <aside>
          <div className="description">You can drag these nodes to the pane on the right.</div>
          <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
              START
          </div>
          <div className="dndnode" onDragStart={(event) => onDragStart(event, 'api spec')} draggable>
              API 스펙
          </div>
          <div className="dndnode" onDragStart={(event) => onDragStart(event, 'sql')} draggable>
              SQL
          </div>
          <div className="dndnode" onDragStart={(event) => onDragStart(event, 'chat gpt')} draggable>
              CHAT GPT
          </div>
          <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
             END
          </div>
      </aside>
  );
};