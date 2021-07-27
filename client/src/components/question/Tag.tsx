import React from 'react';

import '../../css/questions/tag.css';

const Tag = (props: any) => {
  return <div className="tag">{props.tag.title}</div>;
};

export default Tag;
