import React, {useEffect, useState} from 'react';
import './App.css';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {API} from "aws-amplify";
import {listBlogs} from "./graphql/queries";
import AddBlog from "./AddBlog";

function App() {

  const [blogs, setBlogs] = useState();

  async function fetchBlogs() {
    const apiData = await API.graphql({ query: listBlogs });
    setBlogs(apiData.data.listBlogs.items);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
          <div>
            {
              blogs && blogs.map(item => <div>{item?.name}</div>)
            }
          </div>
          <AddBlog onSubmit={() => fetchBlogs()} />
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
