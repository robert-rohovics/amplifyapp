import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {API} from "aws-amplify";
import {createBlog as createBlogMutation} from "../graphql/mutations";

const AddBlog = ({onSubmit}) => {

    const [name, setName] = useState('');

    async function submit() {
        await API.graphql({
            query: createBlogMutation,
            variables: {
                input: {
                    name,
                }
            }
        });
        setName('');
        onSubmit();
    }

    return <div>
        <input onChange={(event) => setName(event.target.value)}/>
        <button onClick={submit}>Add Blog</button>
    </div>
};

AddBlog.propTypes = {
    onSubmit: PropTypes.func,
}

AddBlog.defaultProps = {
    onSubmit: () => undefined,
}

export default AddBlog;
