import React, { useEffect, useState } from 'react';
import Post from './components/post';

function App() {
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        fetch('https://www.reddit.com/r/spaceengineers/.json')
            .then(response => response.json())
            .then(data => setPostData(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
          <Post endpoint='https://www.reddit.com/r/spaceengineers/.json' ></Post>
        </div>
    );
}

export default App;
